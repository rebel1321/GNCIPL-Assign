import { useState, useEffect } from "react";
import { viewApplicationsPageData, assets } from "../assets/assets";
import { toast } from "react-toastify";

const ViewApplication = () => {
    const [applications, setApplications] = useState([]);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

    useEffect(() => {
        setApplications(viewApplicationsPageData);
    }, []);

    const handleApprove = (applicationId, candidateName) => {
        setApplications(prevApps => 
            prevApps.map(app => 
                app._id === applicationId 
                    ? { ...app, status: 'Approved' }
                    : app
            )
        );
        toast.success(`${candidateName}'s application approved!`);
    };

    const handleReject = (applicationId, candidateName) => {
        setApplications(prevApps => 
            prevApps.map(app => 
                app._id === applicationId 
                    ? { ...app, status: 'Rejected' }
                    : app
            )
        );
        toast.error(`${candidateName}'s application rejected!`);
    };

    const downloadResume = (candidateName) => {
        toast.info(`Downloading ${candidateName}'s resume...`);
    };

    const getFilteredApplications = () => {
        switch(filter) {
            case 'pending':
                return applications.filter(app => !app.status);
            case 'approved':
                return applications.filter(app => app.status === 'Approved');
            case 'rejected':
                return applications.filter(app => app.status === 'Rejected');
            default:
                return applications;
        }
    };

    const filteredApplications = getFilteredApplications();

    const getStatusCounts = () => {
        return {
            total: applications.length,
            pending: applications.filter(app => !app.status).length,
            approved: applications.filter(app => app.status === 'Approved').length,
            rejected: applications.filter(app => app.status === 'Rejected').length
        };
    };

    const counts = getStatusCounts();

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-900 p-6 lg:p-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                            <img src={assets.person_tick_icon} alt="Applications" className="w-6 h-6 filter brightness-0 invert" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold gradient-text">Application Management</h1>
                            <p className="text-slate-400 text-lg">Review and manage candidate applications</p>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 text-center card-hover">
                            <div className="text-3xl font-bold text-blue-400 mb-2">{counts.total}</div>
                            <div className="text-slate-300 text-sm">Total Applications</div>
                        </div>
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 text-center card-hover">
                            <div className="text-3xl font-bold text-yellow-400 mb-2">{counts.pending}</div>
                            <div className="text-slate-300 text-sm">Pending Review</div>
                        </div>
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 text-center card-hover">
                            <div className="text-3xl font-bold text-green-400 mb-2">{counts.approved}</div>
                            <div className="text-slate-300 text-sm">Approved</div>
                        </div>
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 text-center card-hover">
                            <div className="text-3xl font-bold text-red-400 mb-2">{counts.rejected}</div>
                            <div className="text-slate-300 text-sm">Rejected</div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-2 inline-flex gap-2 mb-8">
                        {[
                            { key: 'all', label: 'All Applications', count: counts.total },
                            { key: 'pending', label: 'Pending', count: counts.pending },
                            { key: 'approved', label: 'Approved', count: counts.approved },
                            { key: 'rejected', label: 'Rejected', count: counts.rejected }
                        ].map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                                    filter === tab.key
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                }`}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Applications List */}
                {filteredApplications.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredApplications.map((application, index) => (
                            <div 
                                key={application._id} 
                                className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 card-hover group"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    {/* Candidate Info */}
                                    <div className="flex items-center space-x-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-slate-700/50 group-hover:ring-blue-500/50 transition-all duration-300">
                                                <img 
                                                    src={application.imgSrc} 
                                                    alt={application.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                                <span className="text-xs text-white font-bold">{index + 1}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-2">
                                                {application.name}
                                            </h3>
                                            <p className="text-slate-300 font-medium text-lg mb-2">{application.jobTitle}</p>
                                            <div className="flex items-center text-slate-400 mb-3">
                                                <img src={assets.location_icon} alt="Location" className="h-4 w-4 mr-2 filter brightness-150" />
                                                <span>{application.location}</span>
                                            </div>
                                            {application.status && (
                                                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm ${
                                                    application.status === 'Approved' 
                                                        ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/30'
                                                        : 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border-red-500/30'
                                                }`}>
                                                    <div className={`w-2 h-2 rounded-full mr-2 ${
                                                        application.status === 'Approved' ? 'bg-green-400' : 'bg-red-400'
                                                    }`}></div>
                                                    {application.status}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                                        <button 
                                            onClick={() => downloadResume(application.name)}
                                            className="btn-animated flex items-center justify-center px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-300 font-medium"
                                        >
                                            <img src={assets.resume_download_icon} alt="Download" className="h-4 w-4 mr-2 filter brightness-0 invert" />
                                            Resume
                                        </button>
                                        
                                        {!application.status && (
                                            <>
                                                <button 
                                                    onClick={() => handleApprove(application._id, application.name)}
                                                    className="btn-animated px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium"
                                                >
                                                    ✓ Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleReject(application._id, application.name)}
                                                    className="btn-animated px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium"
                                                >
                                                    ✗ Reject
                                                </button>
                                            </>
                                        )}
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
                                <img src={assets.person_icon} alt="No applications" className="h-10 w-10 filter brightness-150" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {filter === 'all' ? 'No Applications Yet' : `No ${filter.charAt(0).toUpperCase() + filter.slice(1)} Applications`}
                            </h3>
                            <p className="text-slate-400 mb-6">
                                {filter === 'all' 
                                    ? 'Applications will appear here once candidates apply for your jobs.'
                                    : `No applications with ${filter} status found.`
                                }
                            </p>
                            {filter !== 'all' && (
                                <button 
                                    onClick={() => setFilter('all')}
                                    className="btn-animated bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium"
                                >
                                    View All Applications
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewApplication;
