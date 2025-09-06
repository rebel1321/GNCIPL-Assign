import Budget from '../models/Budget.js';

const createBudget = async (req, res) => {
    try {
        // Only admin can create budgets
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to create budgets' });
        }

        const { department, sector, year, allocatedAmount, utilizedAmount, notes } = req.body;

        // Check if budget for the same department and year already exists
        const budgetExists = await Budget.findOne({ department, year });
        if (budgetExists) {
            return res.status(400).json({ 
                message: `Budget for ${department} in year ${year} already exists` 
            });
        }

        const budget = new Budget({
            department,
            sector,
            year,
            allocatedAmount,
            utilizedAmount: utilizedAmount || 0,
            notes
        });

        const createdBudget = await budget.save();
        res.status(201).json(createdBudget);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getBudgets = async (req, res) => {
    try {
        const { department, sector, year } = req.query;
        const filter = {};
        
        if (department) filter.department = department;
        if (sector) filter.sector = sector;
        if (year) filter.year = parseInt(year);

        const budgets = await Budget.find(filter).sort({ year: -1, department: 1 });
        res.json(budgets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getBudgetById = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        
        if (budget) {
            res.json(budget);
        } else {
            res.status(404).json({ message: 'Budget not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const updateBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        const { department, sector, year, allocatedAmount, utilizedAmount, notes } = req.body;
        
        // Only admin can update everything
        if (req.user.role === 'admin') {
            budget.department = department || budget.department;
            budget.sector = sector || budget.sector;
            budget.year = year || budget.year;
            budget.allocatedAmount = allocatedAmount !== undefined ? allocatedAmount : budget.allocatedAmount;
            budget.utilizedAmount = utilizedAmount !== undefined ? utilizedAmount : budget.utilizedAmount;
            budget.notes = notes !== undefined ? notes : budget.notes;
        }
        // Auditor can only update utilizedAmount and notes
        else if (req.user.role === 'auditor') {
            budget.utilizedAmount = utilizedAmount !== undefined ? utilizedAmount : budget.utilizedAmount;
            budget.notes = notes !== undefined ? notes : budget.notes;
        }
        else {
            return res.status(403).json({ message: 'Not authorized to update budgets' });
        }

        const updatedBudget = await budget.save();
        res.json(updatedBudget);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteBudget = async (req, res) => {
    try {
        // Only admin can delete budgets
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete budgets' });
        }

        const budget = await Budget.findById(req.params.id);
        
        if (budget) {
            await Budget.deleteOne({ _id: req.params.id });
            res.json({ message: 'Budget removed' });
        } else {
            res.status(404).json({ message: 'Budget not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getSummaryReport = async (req, res) => {
    try {
        const { year } = req.query;
        const filter = {};
        
        if (year) filter.year = parseInt(year);

        const summary = await Budget.aggregate([
            { $match: filter },
            { $group: {
                _id: { year: '$year' },
                totalAllocated: { $sum: '$allocatedAmount' },
                totalUtilized: { $sum: '$utilizedAmount' },
                count: { $sum: 1 }
            }},
            { $sort: { '_id.year': -1 } }
        ]);

        res.json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getSectorReport = async (req, res) => {
    try {
        const { year } = req.query;
        const filter = {};
        
        if (year) filter.year = parseInt(year);

        const sectorReport = await Budget.aggregate([
            { $match: filter },
            { $group: {
                _id: { sector: '$sector', year: '$year' },
                totalAllocated: { $sum: '$allocatedAmount' },
                totalUtilized: { $sum: '$utilizedAmount' },
                count: { $sum: 1 }
            }},
            { $sort: { '_id.year': -1, '_id.sector': 1 } }
        ]);

        res.json(sectorReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
    getSummaryReport,
    getSectorReport
};
