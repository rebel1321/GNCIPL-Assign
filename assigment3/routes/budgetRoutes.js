import express from 'express';
import {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
    getSummaryReport,
    getSectorReport
} from '../controller/budgetController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public report routes
router.get('/reports/summary', getSummaryReport);
router.get('/reports/sectors', getSectorReport);

// Protected routes
router.route('/')
    .get(protect, getBudgets)
    .post(protect, authorize('admin'), createBudget);

router.route('/:id')
    .get(protect, getBudgetById)
    .put(protect, authorize(['admin', 'auditor']), updateBudget)
    .delete(protect, authorize('admin'), deleteBudget);

export default router;
