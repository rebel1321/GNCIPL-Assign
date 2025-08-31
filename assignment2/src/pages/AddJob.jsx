import { useState } from "react";
import { JobCategories, JobLocations, assets } from "../assets/assets";
import { toast } from "react-toastify";

const AddJob = () => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("Bangalore");
    const [category, setCategory] = useState("Programming");
    const [level, setLevel] = useState("Beginner Level");
    const [salary, setSalary] = useState(0);
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!title || !description || !salary) {
            toast.error("Please fill in all required fields");
            setIsSubmitting(false);
            return;
        }

        if (salary < 0) {
            toast.error("Salary must be a positive number");
            setIsSubmitting(false);
            return;
        }

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate job posting
        const newJob = {
            _id: Date.now().toString(),
            title,
            description,
            location,
            salary,
            category,
            level,
            companyId: {
                _id: "company1",
                name: "Tech Solutions Inc.",
                email: "admin@techsolutions.com",
                image: "./company_icon.svg"
            },
            date: Date.now(),
            applicants: 0
        };

        console.log("New job posted:", newJob);
        toast.success("Job posted successfully!");

        // Reset form
        setTitle("");
        setDescription("");
        setSalary(0);
        setLocation("Bangalore");
        setCategory("Programming");
        setLevel("Beginner Level");
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-900 p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                            <img src={assets.add_icon} alt="Add Job" className="w-6 h-6 filter brightness-0 invert" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold gradient-text">Post a New Job</h1>
                            <p className="text-slate-400 text-lg">Create a job posting to attract top talent</p>
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <form onSubmit={onSubmitHandler} className="glass bg-slate-800/20 border border-slate-700/50 rounded-2xl p-8 lg:p-12">
                    <div className="space-y-8">
                        {/* Job Title */}
                        <div>
                            <label className="block text-lg font-bold text-white mb-4">
                                Job Title <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Senior Software Engineer"
                                className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                                required
                            />
                        </div>

                        {/* Grid for Location, Category, Level */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-lg font-bold text-white mb-4">
                                    Location
                                </label>
                                <div className="relative">
                                    <select
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg appearance-none"
                                    >
                                        {JobLocations.map((loc) => (
                                            <option key={loc} value={loc} className="bg-slate-800 text-white">
                                                {loc}
                                            </option>
                                        ))}
                                    </select>
                                    <img src={assets.location_icon} alt="Location" className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 filter brightness-150 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-white mb-4">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg appearance-none"
                                >
                                    {JobCategories.map((cat) => (
                                        <option key={cat} value={cat} className="bg-slate-800 text-white">
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-white mb-4">
                                    Experience Level
                                </label>
                                <select
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg appearance-none"
                                >
                                    <option value="Beginner Level" className="bg-slate-800 text-white">Beginner Level</option>
                                    <option value="Intermediate Level" className="bg-slate-800 text-white">Intermediate Level</option>
                                    <option value="Senior Level" className="bg-slate-800 text-white">Senior Level</option>
                                </select>
                            </div>
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-lg font-bold text-white mb-4">
                                Annual Salary (USD) <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={salary}
                                    onChange={(e) => setSalary(Number(e.target.value))}
                                    placeholder="e.g. 80000"
                                    min="0"
                                    className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg pl-12"
                                    required
                                />
                                <img src={assets.money_icon} alt="Salary" className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 filter brightness-150" />
                            </div>
                            <p className="text-slate-400 text-sm mt-2">Enter the annual salary in USD</p>
                        </div>

                        {/* Job Description */}
                        <div>
                            <label className="block text-lg font-bold text-white mb-4">
                                Job Description <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the job role, responsibilities, requirements, benefits, and company culture..."
                                rows={10}
                                className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg resize-none"
                                required
                            />
                            <p className="text-slate-400 text-sm mt-2">Provide detailed information about the position</p>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`btn-animated w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                                    isSubmitting 
                                        ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-green-500/25'
                                }`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                                        Posting Job...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-3">
                                        <span>🚀</span>
                                        Post Job
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Help Text */}
                        <div className="text-center">
                            <p className="text-slate-400 text-sm">
                                Your job posting will be reviewed and published within 24 hours.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJob;
