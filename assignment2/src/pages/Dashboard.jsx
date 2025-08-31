import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate();
    const [companyData] = useState({
        name: "Tech Solutions Inc.",
        email: "admin@techsolutions.com",
        image: assets.company_icon
    });

    const logout = () => {
        // Clear all recruiter session data
        localStorage.removeItem("user");
        localStorage.removeItem("userType");
        localStorage.removeItem("isLoggedIn");
        
        toast.info('Recruiter logged out successfully');
        navigate('/');
        
        // Force page reload to reset all component states
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-900">
            {/* Header */}
            <header className="glass border-b border-slate-700/50 py-4 sticky top-0 z-40 backdrop-blur-md">
                <div className="px-5 flex justify-between items-center">
                    <div 
                        onClick={() => navigate("/")} 
                        className='cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity duration-300'
                    >
                        <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center'>
                            <span className='text-white font-bold text-sm'>JF</span>
                        </div>
                        <span className='text-white font-bold text-lg tracking-wide max-sm:hidden'>JobFinder</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="max-sm:hidden text-white font-medium">Welcome, {companyData.name}</p>
                        <div className="relative group">
                            <div className="p-1 glass bg-slate-800/40 border border-slate-700/50 rounded-xl">
                                <img
                                    className="w-8 h-8 rounded-lg object-cover filter brightness-150"
                                    src={companyData.image}
                                    alt="Company"
                                />
                            </div>
                            <div className="absolute hidden group-hover:block top-0 right-0 z-20 rounded-xl pt-12">
                                <ul className="list-none m-0 p-2 glass bg-slate-800/90 border border-slate-700/50 rounded-xl text-sm shadow-2xl backdrop-blur-md">
                                    <li 
                                        onClick={logout} 
                                        className="py-2 px-4 cursor-pointer text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all duration-300"
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex items-start">
                {/* Left Sidebar */}
                <aside className="glass bg-slate-800/30 border-r border-slate-700/50 min-h-screen backdrop-blur-md">
                    <nav className="pt-8">
                        <ul className="flex flex-col items-start text-slate-300">
                            <NavLink
                                className={({ isActive }) =>
                                    `flex items-center p-4 sm:px-8 gap-3 w-full hover:bg-slate-700/50 transition-all duration-300 group ${
                                        isActive ? "bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-r-4 border-blue-500 text-white" : ""
                                    }`
                                }
                                to={"/dashboard/add-job"}
                            >
                                <img className="min-w-5 h-5 filter brightness-150 group-hover:brightness-200 transition-all duration-300" src={assets.add_icon} alt="Add" />
                                <p className="max-sm:hidden font-medium">Add Job</p>
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    `flex items-center p-4 sm:px-8 gap-3 w-full hover:bg-slate-700/50 transition-all duration-300 group ${
                                        isActive ? "bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-r-4 border-blue-500 text-white" : ""
                                    }`
                                }
                                to={"/dashboard/manage-job"}
                            >
                                <img className="min-w-5 h-5 filter brightness-150 group-hover:brightness-200 transition-all duration-300" src={assets.home_icon} alt="Manage" />
                                <p className="max-sm:hidden font-medium">Manage Jobs</p>
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    `flex items-center p-4 sm:px-8 gap-3 w-full hover:bg-slate-700/50 transition-all duration-300 group ${
                                        isActive ? "bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-r-4 border-blue-500 text-white" : ""
                                    }`
                                }
                                to={"/dashboard/view-applications"}
                            >
                                <img className="min-w-5 h-5 filter brightness-150 group-hover:brightness-200 transition-all duration-300" src={assets.person_tick_icon} alt="Applications" />
                                <p className="max-sm:hidden font-medium">View Applications</p>
                            </NavLink>
                        </ul>
                    </nav>
                </aside>
                
                {/* Main Content */}
                <main className="flex-1 min-h-screen p-4 sm:p-8">
                    <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-md">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
