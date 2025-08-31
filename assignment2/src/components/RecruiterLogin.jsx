import { useState } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RecruiterLogin = ({ isOpen, onClose, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            onLogin();
            onClose();
            toast.success('Recruiter logged in successfully!');
            navigate('/dashboard/view-applications');
        } else {
            toast.error('Please fill in all fields');
        }
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-8 rounded-lg max-w-md w-full mx-4'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-bold'>Recruiter Login</h2>
                    <img 
                        src={assets.cross_icon} 
                        alt="Close" 
                        className='cursor-pointer h-6 w-6'
                        onClick={onClose}
                    />
                </div>
                
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Email
                        </label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email" 
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Password
                        </label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password" 
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>
                    
                    <div className='flex gap-4 pt-4'>
                        <button 
                            type="submit"
                            className='flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors'
                        >
                            Login
                        </button>
                        <button 
                            type="button"
                            onClick={onClose}
                            className='flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecruiterLogin;
