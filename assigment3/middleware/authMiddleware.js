import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'abc123');
            
            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};


const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Not authorized as ${req.user.role}. Required role: ${roles.join(' or ')}`
            });
        }
        
        next();
    };
};

export { protect, authorize };
