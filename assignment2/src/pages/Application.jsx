import { useState, useEffect } from "react";
import { jobsApplied, assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Application = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        setApplications(jobsApplied);
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'accepted':
                return 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/30';
            case 'rejected':
                return 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border-red-500/30';
            case 'pending':
                return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border-yellow-500/30';
            default:
                return 'bg-gradient-to-r from-slate-500/20 to-slate-600/20 text-slate-400 border-slate-500/30';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-900">
            <Navbar />
            
            {/* Hero Section */}
            <div className="pt-20 pb-16">
                <div className="container mx-auto px-4 2xl:px-20">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                                <img src={assets.suitcase_icon} alt="Applications" className="w-6 h-6 filter brightness-0 invert" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                                My Applications
                            </h1>
                        </div>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Track your job applications and monitor their status. Stay updated with your career journey.
                        </p>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 text-center card-hover">
                            <div className="text-3xl font-bold text-blue-400">
                                {applications.length}
                            </div>
                            <div className="text-slate-300 mt-2">Total Applied</div>
                        </div>
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 text-center card-hover">
                            <div className="text-3xl font-bold text-yellow-400">
                                {applications.filter(app => app.status.toLowerCase() === 'pending').length}
                            </div>
                            <div className="text-slate-300 mt-2">Pending</div>
                        </div>
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 text-center card-hover">
                            <div className="text-3xl font-bold text-green-400">
                                {applications.filter(app => app.status.toLowerCase() === 'accepted').length}
                            </div>
                            <div className="text-slate-300 mt-2">Accepted</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Applications List */}
            <div className="container mx-auto px-4 2xl:px-20 pb-20">
                {applications.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {applications.map((application, index) => (
                            <div 
                                key={index} 
                                className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 card-hover group"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    {/* Company Info */}
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl flex items-center justify-center p-2 group-hover:from-slate-600 group-hover:to-slate-700 transition-all duration-300">
                                                <img 
                                                    src={application.logo} 
                                                    alt={application.company}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                                <span className="text-xs text-white font-bold">{index + 1}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                                                {application.title}
                                            </h3>
                                            <p className="text-slate-300 font-medium">{application.company}</p>
                                            <div className="flex items-center text-slate-400 text-sm mt-2">
                                                <img src={assets.location_icon} alt="Location" className="h-4 w-4 mr-2 filter brightness-150" />
                                                {application.location}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Status and Date */}
                                    <div className="flex flex-col lg:items-end space-y-3">
                                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(application.status)} backdrop-blur-sm`}>
                                            <div className={`w-2 h-2 rounded-full mr-2 ${
                                                application.status.toLowerCase() === 'accepted' ? 'bg-green-400' :
                                                application.status.toLowerCase() === 'rejected' ? 'bg-red-400' :
                                                application.status.toLowerCase() === 'pending' ? 'bg-yellow-400' : 'bg-slate-400'
                                            }`}></div>
                                            {application.status}
                                        </span>
                                        <div className="flex items-center text-slate-400 text-sm">
                                            <img src={assets.clock_icon || assets.suitcase_icon} alt="Date" className="h-4 w-4 mr-2 filter brightness-150" />
                                            Applied on {application.date}
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20">
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-12 max-w-md mx-auto">
                            <div className="w-20 h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                <img src={assets.suitcase_icon} alt="No applications" className="h-10 w-10 filter brightness-150" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">No Applications Yet</h3>
                            <p className="text-slate-400 mb-6">
                                Start your career journey by applying for exciting job opportunities.
                            </p>
                            <button 
                                onClick={() => window.location.href = '/'}
                                className="btn-animated bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium"
                            >
                                Browse Jobs
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            <Footer />
        </div>
    );
};

export default Application;
