import { useEffect, useState } from 'react';
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = ({ searchFilter: externalSearchFilter }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
    const [filteredJobs, setFilteredJobs] = useState(jobsData);

    // Update internal search filter when external one changes
    useEffect(() => {
        if (externalSearchFilter) {
            setSearchFilter(externalSearchFilter);
        }
    }, [externalSearchFilter]);

    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category]
        );
    };

    const handleLocationChange = (location) => {
        setSelectedLocations(
            prev => prev.includes(location) ? prev.filter(item => item !== location) : [...prev, location]
        );
    };

    useEffect(() => {
        const matchesCategory = (job) => selectedCategories.length === 0 || selectedCategories.includes(job.category);
        const matchesLocation = (job) => selectedLocations.length === 0 || selectedLocations.includes(job.location);
        const matchesTitle = (job) => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
        const matchesSearchLocation = (job) => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

        const newFilteredJobs = jobsData.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        );
        setFilteredJobs(newFilteredJobs);
        setCurrentPage(1);
    }, [selectedCategories, selectedLocations, searchFilter]);

    const isSearched = searchFilter.title !== "" || searchFilter.location !== "";

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 fade-in'>
            {/* Sidebar */}
            <div className='w-full lg:w-1/4 px-4'>
                <div className='glass bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-md sticky top-24'>
                    {/* Search filter display */}
                    {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <>
                            <h3 className='font-semibold text-lg mb-4 text-white'>Current Search</h3>
                            <div className='mb-4 text-slate-300 space-y-2'>
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2.5 bg-blue-900/50 border border-blue-700/50 px-4 py-2 rounded-xl backdrop-blur-sm'>
                                        <span className='text-blue-300'>{searchFilter.title}</span>
                                        <img 
                                            onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))} 
                                            className='cursor-pointer hover:scale-110 transition-transform duration-200 filter brightness-150' 
                                            src={assets.cross_icon} 
                                            alt="Remove" 
                                        />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-900/50 border border-red-700/50 px-4 py-2 rounded-xl backdrop-blur-sm'>
                                        <span className='text-red-300'>{searchFilter.location}</span>
                                        <img 
                                            onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))} 
                                            className='cursor-pointer hover:scale-110 transition-transform duration-200 filter brightness-150' 
                                            src={assets.cross_icon} 
                                            alt="Remove" 
                                        />
                                    </span>
                                )}
                            </div>
                        </>
                    )}

                    <button 
                        onClick={() => setShowFilter(prev => !prev)} 
                        className="btn-animated w-full px-6 py-3 rounded-xl border border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700 transition-all duration-300 lg:hidden mb-6"
                    >
                        {showFilter ? "Close Filters" : "Show Filters"}
                    </button>

                    {/* Category Filter */}
                    <div className={showFilter ? "" : "max-lg:hidden"}>
                        <h4 className='font-semibold text-lg py-4 text-white flex items-center gap-2'>
                            <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                            Search by Categories
                        </h4>
                        <ul className='space-y-3 text-slate-300'>
                            {JobCategories.map((category, index) => (
                                <li key={index} className='flex gap-3 items-center group'>
                                    <input 
                                        className='scale-125 accent-blue-500 bg-slate-700 border-slate-600' 
                                        type="checkbox" 
                                        onChange={() => handleCategoryChange(category)}
                                        checked={selectedCategories.includes(category)} 
                                    />
                                    <span className='group-hover:text-blue-300 transition-colors duration-200'>{category}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Location Filter */}
                    <div className={showFilter ? "" : "max-lg:hidden"}>
                        <h4 className='font-semibold text-lg py-4 pt-8 text-white flex items-center gap-2'>
                            <span className='w-2 h-2 bg-emerald-500 rounded-full'></span>
                            Search by Locations
                        </h4>
                        <ul className='space-y-3 text-slate-300'>
                            {JobLocations.map((location, index) => (
                                <li key={index} className='flex gap-3 items-center group'>
                                    <input 
                                        className='scale-125 accent-emerald-500 bg-slate-700 border-slate-600' 
                                        type="checkbox" 
                                        onChange={() => handleLocationChange(location)}
                                        checked={selectedLocations.includes(location)}
                                    />
                                    <span className='group-hover:text-emerald-300 transition-colors duration-200'>{location}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Job listings */}
            <section className='w-full lg:w-3/4 text-white max-lg:px-4'>
                <div className='mb-8'>
                    <h3 className='font-bold text-4xl py-2 gradient-text' id='job-list'>
                        Latest Jobs
                    </h3>
                    <p className='text-slate-400 text-lg'>Get your desired job from top companies</p>
                </div>
                
                {/* Search Input */}
                <div className='mb-8 flex gap-4'>
                    <div className='flex-1 relative'>
                        <input
                            type="text"
                            placeholder="Search job titles..."
                            value={searchFilter.title}
                            onChange={(e) => setSearchFilter(prev => ({ ...prev, title: e.target.value }))}
                            className='w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm'
                        />
                        <div className='absolute right-3 top-3'>
                            <img src={assets.search_icon} alt="Search" className='h-5 w-5 filter brightness-150' />
                        </div>
                    </div>
                    <div className='flex-1 relative'>
                        <input
                            type="text"
                            placeholder="Search locations..."
                            value={searchFilter.location}
                            onChange={(e) => setSearchFilter(prev => ({ ...prev, location: e.target.value }))}
                            className='w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm'
                        />
                        <div className='absolute right-3 top-3'>
                            <img src={assets.location_icon} alt="Location" className='h-5 w-5 filter brightness-150' />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>

                {filteredJobs.length === 0 && (
                    <div className='text-center py-12'>
                        <div className='glass bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-md'>
                            <p className='text-slate-400 text-xl mb-2'>No jobs found matching your criteria</p>
                            <p className='text-slate-500'>Try adjusting your search filters</p>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-3 mt-12'>
                        <a href="#job-list">
                            <button 
                                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} 
                                className='btn-animated p-3 glass bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-700/50 transition-all duration-300 backdrop-blur-md'
                                disabled={currentPage === 1}
                            >
                                <img 
                                    src={assets.left_arrow_icon} 
                                    alt="Previous" 
                                    className='filter brightness-150'
                                />
                            </button>
                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a key={index} href="#job-list">
                                <button 
                                    onClick={() => setCurrentPage(index + 1)} 
                                    className={`btn-animated w-12 h-12 flex items-center justify-center border rounded-xl font-medium transition-all duration-300 ${
                                        currentPage === index + 1 
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-500 shadow-lg shadow-blue-500/25' 
                                            : 'glass bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 backdrop-blur-md'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <button 
                                onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} 
                                className='btn-animated p-3 glass bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-700/50 transition-all duration-300 backdrop-blur-md'
                                disabled={currentPage === Math.ceil(filteredJobs.length / 6)}
                            >
                                <img 
                                    src={assets.right_arrow_icon} 
                                    alt="Next" 
                                    className='filter brightness-150'
                                />
                            </button>
                        </a>
                    </div>
                )}
            </section>
        </div>
    );
};

export default JobListing;
