import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobsData, assets } from "../assets/assets";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ApplyJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        const foundJob = jobsData.find(job => job._id === id);
        setJob(foundJob);
    }, [id]);

    const handleApply = () => {
        if (isApplied) {
            toast.info('You have already applied for this job!');
            return;
        }
        
        setIsApplied(true);
        toast.success(`Successfully applied for ${job.title}!`);
    };

    const formatSalary = (salary) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(salary);
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!job) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-900">
                <Navbar />
                <div className="pt-20 pb-20">
                    <div className="container mx-auto px-4 text-center">
                        <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-xl p-12 max-w-md mx-auto">
                            <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-3xl">⚠</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Job Not Found</h2>
                            <p className="text-slate-400 mb-6">The job you're looking for doesn't exist or has been removed.</p>
                            <button 
                                onClick={() => navigate('/')}
                                className="btn-animated bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium"
                            >
                                Back to Jobs
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-900">
            <Navbar />
            
            <div className="pt-20 pb-20">
                <div className="container mx-auto px-4 2xl:px-20 max-w-6xl">
                    {/* Back Button */}
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors duration-300 group"
                    >
                        <img src={assets.back_arrow_icon} alt="Back" className="h-5 w-5 mr-3 filter brightness-150 group-hover:brightness-200" />
                        <span className="font-medium">Back to Jobs</span>
                    </button>

                    <div className="glass bg-slate-800/20 border border-slate-700/50 rounded-2xl overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 p-8 lg:p-12 border-b border-slate-700/50">
                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                    <div className="relative">
                                        <div className="w-20 h-20 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl flex items-center justify-center p-3">
                                            <img 
                                                src={job.companyId.image} 
                                                alt={job.companyId.name}
                                                className="w-full h-full object-contain filter brightness-110"
                                            />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                            <span className="text-xs text-white font-bold">★</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h1 className="text-3xl lg:text-4xl font-bold gradient-text mb-3">
                                            {job.title}
                                        </h1>
                                        <p className="text-xl text-slate-300 font-medium mb-3">{job.companyId.name}</p>
                                        <div className="flex items-center text-slate-400">
                                            <img src={assets.location_icon} alt="Location" className="h-5 w-5 mr-2 filter brightness-150" />
                                            <span className="text-lg">{job.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleApply}
                                    disabled={isApplied}
                                    className={`btn-animated px-8 py-4 font-bold rounded-xl text-lg transition-all duration-300 min-w-[160px] ${
                                        isApplied 
                                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-500/25'
                                    }`}
                                >
                                    {isApplied ? '✓ Applied' : 'Apply Now'}
                                </button>
                            </div>
                        </div>

                        {/* Job Stats */}
                        <div className="p-8 lg:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <div className="glass bg-slate-700/20 border border-slate-600/50 p-6 rounded-xl card-hover">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center mr-4">
                                            <img src={assets.money_icon} alt="Salary" className="h-5 w-5 filter brightness-0 invert" />
                                        </div>
                                        <span className="font-bold text-slate-300 text-lg">Salary Range</span>
                                    </div>
                                    <p className="text-2xl text-green-400 font-bold">{formatSalary(job.salary)}</p>
                                    <p className="text-slate-400 text-sm mt-2">Per year</p>
                                </div>
                                <div className="glass bg-slate-700/20 border border-slate-600/50 p-6 rounded-xl card-hover">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-4">
                                            <img src={assets.suitcase_icon} alt="Level" className="h-5 w-5 filter brightness-0 invert" />
                                        </div>
                                        <span className="font-bold text-slate-300 text-lg">Experience</span>
                                    </div>
                                    <p className="text-2xl text-blue-400 font-bold">{job.level}</p>
                                    <p className="text-slate-400 text-sm mt-2">Required level</p>
                                </div>
                                <div className="glass bg-slate-700/20 border border-slate-600/50 p-6 rounded-xl card-hover">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center mr-4">
                                            <img src={assets.person_icon} alt="Applicants" className="h-5 w-5 filter brightness-0 invert" />
                                        </div>
                                        <span className="font-bold text-slate-300 text-lg">Applicants</span>
                                    </div>
                                    <p className="text-2xl text-purple-400 font-bold">{job.applicants}</p>
                                    <p className="text-slate-400 text-sm mt-2">People applied</p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 mb-12">
                                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
                                    {job.category}
                                </span>
                                <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border border-green-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
                                    {job.level}
                                </span>
                                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-400 border border-purple-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
                                    Posted {formatDate(job.date)}
                                </span>
                            </div>

                            {/* Job Description */}
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold gradient-text mb-6">Job Description</h2>
                                <div className="glass bg-slate-700/10 border border-slate-600/30 rounded-xl p-8">
                                    <div 
                                        className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-lg"
                                        dangerouslySetInnerHTML={{ __html: job.description }}
                                        style={{
                                            color: '#cbd5e1',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Company Info */}
                            <div className="pt-8 border-t border-slate-700/50">
                                <h2 className="text-3xl font-bold gradient-text mb-6">About the Company</h2>
                                <div className="glass bg-slate-700/10 border border-slate-600/30 rounded-xl p-8">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl flex items-center justify-center p-3">
                                            <img 
                                                src={job.companyId.image} 
                                                alt={job.companyId.name}
                                                className="w-full h-full object-contain filter brightness-110"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-2">{job.companyId.name}</h3>
                                            <p className="text-slate-400 text-lg">{job.companyId.email}</p>
                                            <div className="flex items-center mt-3">
                                                <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-500/30 rounded-full text-sm font-medium">
                                                    Verified Company
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default ApplyJob;
