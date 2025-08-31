import { useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  
  if (!job) return null;

  const formatSalary = (salary) => {
    if (!salary) return 'Salary not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const handleApply = () => {
    navigate(`/apply-job/${job._id}`);
    scrollTo(0, 0);
  };

  const handleLearnMore = () => {
    navigate(`/apply-job/${job._id}`);
    scrollTo(0, 0);
  };

  return (
    <div className="glass border border-slate-700/50 p-6 shadow-xl rounded-2xl bg-slate-800/40 hover:shadow-2xl card-hover backdrop-blur-md transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-slate-700/50 rounded-xl">
          <img 
            className="h-10 w-10 object-contain filter brightness-150 group-hover:brightness-200 transition-all duration-300" 
            src={job.companyId?.image || assets.company_icon} 
            alt="Company Icon" 
          />
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-300 font-medium">{job.companyId?.name || 'Company'}</p>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <img src={assets.location_icon} alt="Location" className="h-3 w-3 filter brightness-150" />
            {job.location}
          </p>
        </div>
      </div>
      
      <h4 className="font-semibold text-xl mt-6 text-white group-hover:text-blue-300 transition-colors duration-300">{job.title}</h4>
      
      <div className="flex items-center gap-2 mt-4 text-xs flex-wrap">
        <span className="bg-blue-900/50 border border-blue-700/50 text-blue-300 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {job.location}
        </span>
        <span className="bg-emerald-900/50 border border-emerald-700/50 text-emerald-300 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {job.level}
        </span>
        <span className="bg-purple-900/50 border border-purple-700/50 text-purple-300 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {job.category}
        </span>
      </div>

      <div className="flex items-center gap-6 mt-4 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <img src={assets.money_icon} alt="Salary" className="h-4 w-4 filter brightness-150" />
          <span className="font-medium text-green-400">{formatSalary(job.salary)}</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={assets.person_icon} alt="Applicants" className="h-4 w-4 filter brightness-150" />
          <span>{job.applicants || 0} applicants</span>
        </div>
      </div>
      
      <p 
        className="text-slate-400 text-sm mt-4 line-clamp-3 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: job.description ? job.description.replace(/<[^>]*>/g, '').slice(0, 120) + '...' : "No description available",
        }}
      />
      
      <div className="mt-6 flex gap-3 text-sm">
        <button 
          onClick={handleApply}
          className="btn-animated bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl transition-all duration-300 flex-1 font-medium shadow-lg hover:shadow-blue-500/25"
        >
          Apply now
        </button>
        <button 
          onClick={handleLearnMore}
          className="btn-animated text-slate-300 border border-slate-600 hover:border-slate-500 hover:bg-slate-700/50 rounded-xl px-6 py-3 transition-all duration-300"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;
