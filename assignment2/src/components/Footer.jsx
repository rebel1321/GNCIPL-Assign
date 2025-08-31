import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
    const navigate = useNavigate();
    
    return (
        <footer className="mt-20 border-t border-slate-700/50">
            <div className="container px-4 2xl:px-20 mx-auto">
                <div className="flex items-center justify-between gap-4 py-8">
                    <div 
                        onClick={() => navigate('/')} 
                        className='cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity duration-300'
                    >
                        <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center'>
                            <span className='text-white font-bold text-sm'>JF</span>
                        </div>
                        <span className='text-white font-bold text-lg tracking-wide'>JobFinder</span>
                    </div>
                    <p className="flex-1 pl-6 text-sm text-slate-400 max-sm:hidden before:content-['|'] before:mr-4 before:text-slate-600">
                        Copyright @Satyam Tripathi | All rights reserved.
                    </p>
                    <div className="flex gap-3">
                        <div className="p-2 glass bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group cursor-pointer">
                            <img width={24} src={assets.facebook_icon} alt="Facebook" className="filter brightness-150 group-hover:brightness-200 transition-all duration-300" />
                        </div>
                        <div className="p-2 glass bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group cursor-pointer">
                            <img width={24} src={assets.twitter_icon} alt="Twitter" className="filter brightness-150 group-hover:brightness-200 transition-all duration-300" />
                        </div>
                        <div className="p-2 glass bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group cursor-pointer">
                            <img width={24} src={assets.instagram_icon} alt="Instagram" className="filter brightness-150 group-hover:brightness-200 transition-all duration-300" />
                        </div>
                    </div>
                </div>
                
                {/* Additional footer content */}
                <div className="border-t border-slate-700/50 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                        <div className="flex flex-wrap gap-6">
                            <span className="hover:text-slate-300 transition-colors duration-300 cursor-pointer">Privacy Policy</span>
                            <span className="hover:text-slate-300 transition-colors duration-300 cursor-pointer">Terms of Service</span>
                            <span className="hover:text-slate-300 transition-colors duration-300 cursor-pointer">Contact Us</span>
                            <span className="hover:text-slate-300 transition-colors duration-300 cursor-pointer">About</span>
                        </div>
                        <p className="text-xs">Made By Satyam Tripathi</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
