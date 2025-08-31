import { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
    const [isRecruiterSignup, setIsRecruiterSignup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState('user'); // 'user' or 'recruiter'
    const [user, setUser] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (showRecruiterLogin) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on component unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showRecruiterLogin]);

    const handleLogin = () => {
        // Simulate login
        setUser({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com'
        });
        setIsLoggedIn(true);
        toast.success('Logged in successfully!');
    };

    const handleRecruiterLogin = () => {
        // Simulate recruiter login
        setUser({
            firstName: 'Recruiter',
            lastName: 'Admin',
            email: 'recruiter@company.com'
        });
        setIsLoggedIn(true);
        setUserType('recruiter');
        setShowRecruiterLogin(false);
        setIsRecruiterSignup(false);
        toast.success('Recruiter logged in successfully!');
        navigate('/dashboard/view-applications');
    };

    const handleRecruiterSignup = () => {
        // Simulate recruiter signup
        setUser({
            firstName: 'New Recruiter',
            lastName: 'User',
            email: 'newrecruiter@company.com'
        });
        setIsLoggedIn(true);
        setUserType('recruiter');
        setShowRecruiterLogin(false);
        setIsRecruiterSignup(false);
        toast.success('Recruiter account created successfully!');
        navigate('/dashboard/add-job');
    };

    const handleLogout = () => {
        setUser(null);
        setIsLoggedIn(false);
        setUserType('user');
        toast.info('Logged out successfully');
        navigate('/');
    };

    const closeModal = () => {
        setShowRecruiterLogin(false);
        setIsRecruiterSignup(false);
    };

    return (
        <nav className='glass border-b border-slate-700/50 py-4 sticky top-0 z-50 backdrop-blur-md'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <div 
                    onClick={() => navigate('/')} 
                    className='cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity duration-300'
                >
                    <div className='w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center'>
                        <span className='text-white font-bold text-lg'>JF</span>
                    </div>
                    <span className='text-white font-bold text-xl tracking-wide'>JobFinder</span>
                </div>

                {isLoggedIn && user ? (
                    <div className='flex items-center gap-3'>
                        {userType === 'user' && (
                            <>
                                <Link to={'/applications'} className='text-blue-400 hover:text-blue-300 transition-colors duration-300'>
                                    Applied Jobs
                                </Link>
                                <p className='text-slate-500'>|</p>
                            </>
                        )}
                        {userType === 'recruiter' && (
                            <>
                                <Link to={'/dashboard'} className='text-blue-400 hover:text-blue-300 transition-colors duration-300'>
                                    Dashboard
                                </Link>
                                <Link to={'/dashboard/add-job'} className='text-blue-400 hover:text-blue-300 transition-colors duration-300'>
                                    Add Job
                                </Link>
                                <Link to={'/dashboard/manage-job'} className='text-blue-400 hover:text-blue-300 transition-colors duration-300'>
                                    Manage Jobs
                                </Link>
                                <p className='text-slate-500'>|</p>
                            </>
                        )}
                        <p className='max-sm:hidden text-white font-medium'>
                            Hi, {user.firstName + " " + user.lastName}
                        </p>
                        <button 
                            onClick={handleLogout}
                            className='btn-animated bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm hover:from-red-700 hover:to-red-800 transition-all duration-300'
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className='flex gap-4 max-sm:text-xs'>
                        <button 
                            onClick={() => setShowRecruiterLogin(true)} 
                            className='text-blue-400 hover:text-blue-300 transition-colors duration-300 px-4 py-2'
                        >
                            Recruiter Login 
                        </button>
                        <button 
                            onClick={handleLogin} 
                            className='btn-animated bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-9 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300'
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>

            {/* Recruiter Login/Signup Modal */}
            {showRecruiterLogin && (
                <div 
                    className='fixed inset-0 bg-black/80 backdrop-blur-sm fade-in flex items-center justify-center p-4' 
                    style={{ 
                        zIndex: 999999,
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={closeModal}
                >
                    <div 
                        className='glass bg-slate-800/95 border border-slate-700 p-8 rounded-xl max-w-md w-full mx-4 slide-in'
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxHeight: '90vh',
                            overflowY: 'auto'
                        }}
                    >
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className='text-2xl font-bold text-white gradient-text'>
                                {isRecruiterSignup ? 'Recruiter Signup' : 'Recruiter Login'}
                            </h2>
                            <button 
                                onClick={closeModal}
                                className='text-slate-400 hover:text-white transition-colors duration-300 p-1 hover:bg-slate-700/50 rounded-lg'
                            >
                                <img 
                                    src={assets.cross_icon} 
                                    alt="Close" 
                                    className='w-6 h-6 filter brightness-150 hover:brightness-200'
                                />
                            </button>
                        </div>
                        
                        <div className='space-y-4'>
                            {isRecruiterSignup && (
                                <>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <input 
                                            type="text" 
                                            placeholder="First Name" 
                                            className='w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="Last Name" 
                                            className='w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                                        />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Company Name" 
                                        className='w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                                    />
                                    <input 
                                        type="tel" 
                                        placeholder="Phone Number" 
                                        className='w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                                    />
                                </>
                            )}
                            <input 
                                type="email" 
                                placeholder="Email" 
                                className='w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className='w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                            />
                            {isRecruiterSignup && (
                                <input 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    className='w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                                />
                            )}
                            
                            <div className='flex gap-4 pt-4'>
                                <button 
                                    onClick={isRecruiterSignup ? handleRecruiterSignup : handleRecruiterLogin}
                                    className='btn-animated flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium'
                                >
                                    {isRecruiterSignup ? 'Create Account' : 'Login'}
                                </button>
                                <button 
                                    onClick={closeModal}
                                    className='btn-animated flex-1 bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-300'
                                >
                                    Cancel
                                </button>
                            </div>
                            
                            <div className='text-center pt-4 border-t border-slate-600'>
                                <p className='text-slate-400 text-sm'>
                                    {isRecruiterSignup ? 'Already have an account?' : "Don't have an account?"}
                                </p>
                                <button 
                                    onClick={() => setIsRecruiterSignup(!isRecruiterSignup)}
                                    className='text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium mt-1'
                                >
                                    {isRecruiterSignup ? 'Login here' : 'Sign up here'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
