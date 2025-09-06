import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getUserProfile,
    getUsers 
} from '../controller/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.get('/', protect, authorize('admin'), getUsers);

export default router;
