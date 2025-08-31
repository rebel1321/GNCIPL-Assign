import { useState, useEffect } from "react";
import { manageJobsData, assets } from "../assets/assets";
import { toast } from "react-toastify";

const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filter, setFilter] = useState('all'); // all, recent, popular

    useEffect(() => {
        setJobs(manageJobsData);
    }, []);

    const deleteJob = (jobId, jobTitle) => {
        setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
        toast.success(`"${jobTitle}" deleted successfully!`);
    };

    const editJob = (jobId, jobTitle) => {
        toast.info(`Editing "${jobTitle}" functionality coming soon!`);
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getFilteredJobs = () => {
        switch(filter) {
            case 'recent':
                return jobs.sort((a, b) => b.date - a.date).slice(0, 5);
            case 'popular':
                return jobs.sort((a, b) => b.applicants - a.applicants);
            default:
                return jobs;
        }
    };

    const filteredJobs = getFilteredJobs();

    const getJobStats = () => {
        return {
            total: jobs.length,
            totalApplicants: jobs.reduce((sum, job) => sum + job.applicants, 0),
            avgApplicants: jobs.length > 0 ? Math.round(jobs.reduce((sum, job) => sum + job.applicants, 0) / jobs.length) : 0,
            recentJobs: jobs.filter(job => (Date.now() - job.date) <= 7 * 24 * 60 * 60 * 1000).length
        };
    };

    const stats = getJobStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-900 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                            <img src={assets.suitcase_icon} alt="Manage Jobs" className="w-6 h-6 filter brightness-0 invert" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold gradient-text">Manage Jobs</h1>
                            <p className="text-slate-400 text-lg">Track and manage your job postings</p>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 text-center card-hover">
                            <div className="text-3xl font-bold text-blue-400 mb-2">{stats.total}</div>
                            <div className="text-slate-300 text-sm">Total Jobs</div>
                        </div>
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 text-center card-hover">
                            <div className="text-3xl font-bold text-green-400 mb-2">{stats.totalApplicants}</div>
                            <div className="text-slate-300 text-sm">Total Applicants</div>
                        </div>
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 text-center card-hover">
                            <div className="text-3xl font-bold text-purple-400 mb-2">{stats.avgApplicants}</div>
                            <div className="text-slate-300 text-sm">Avg per Job</div>
                        </div>
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-6 text-center card-hover">
                            <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.recentJobs}</div>
                            <div className="text-slate-300 text-sm">Recent Posts</div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-2 inline-flex gap-2">
                        {[
                            { key: 'all', label: 'All Jobs' },
                            { key: 'recent', label: 'Recent' },
                            { key: 'popular', label: 'Popular' }
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
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Jobs Table */}
                {filteredJobs.length > 0 ? (
                    <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gradient-to-r from-slate-800/40 to-slate-700/40">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">
                                            Job Title
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">
                                            Date Posted
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">
                                            Applicants
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {filteredJobs.map((job, index) => (
                                        <tr key={job._id} className="hover:bg-slate-700/20 transition-colors duration-300 group">
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                                                            {job.title}
                                                        </div>
                                                        <div className="text-slate-400 text-sm">{job.category || 'General'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center text-slate-300">
                                                    <img src={assets.location_icon} alt="Location" className="h-4 w-4 mr-2 filter brightness-150" />
                                                    {job.location}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="text-slate-300">
                                                    {formatDate(job.date)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-500/30 backdrop-blur-sm">
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                                                    {job.applicants} applicants
                                                </span>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex gap-3">
                                                    <button 
                                                        onClick={() => editJob(job._id, job.title)}
                                                        className="btn-animated p-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-lg transition-all duration-300 group"
                                                        title="Edit Job"
                                                    >
                                                        <img src={assets.edit_icon} alt="Edit" className="h-5 w-5 filter brightness-150 group-hover:brightness-200" />
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteJob(job._id, job.title)}
                                                        className="btn-animated p-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-300 group"
                                                        title="Delete Job"
                                                    >
                                                        <img src={assets.delete_icon} alt="Delete" className="h-5 w-5 filter brightness-0 invert group-hover:brightness-200" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20">
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-12 max-w-md mx-auto">
                            <div className="w-20 h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                <img src={assets.suitcase_icon} alt="No jobs" className="h-10 w-10 filter brightness-150" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">No Jobs Posted Yet</h3>
                            <p className="text-slate-400 mb-6">Start by adding your first job posting to attract talent.</p>
                            <button 
                                onClick={() => window.location.href = '/dashboard/add-job'}
                                className="btn-animated bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium"
                            >
                                Add Your First Job
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageJobs;
