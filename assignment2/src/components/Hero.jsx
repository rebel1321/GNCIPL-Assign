import { useRef } from "react";
import { assets } from "../assets/assets";

const Hero = ({ onSearch }) => {
    
    return (
        <div className="container 2xl:px-20 mx-auto my-10 fade-in">
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20 text-center mx-2 rounded-3xl shadow-2xl border border-slate-700/50 backdrop-blur-lg relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)]"></div>
                
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
                        Over 10,000+ jobs to apply
                    </h2>
                    <p className="mb-10 max-w-2xl mx-auto text-lg font-light px-5 text-slate-300 leading-relaxed">
                        Your Next Big Career Move Starts Right Here - Explore the Best Job
                        Opportunities and Take the First Step Toward Your Future!
                    </p>
                    
                    
                </div>
            </div>

            <div className="glass border border-slate-700/50 shadow-2xl mx-2 mt-8 p-8 rounded-2xl backdrop-blur-md bg-slate-800/30">
                <div className="flex justify-center gap-10 lg:gap-16 flex-wrap items-center w-full">
                    <p className="font-semibold text-slate-300 text-lg">Trusted by</p>
                    <img className="h-8 filter brightness-150 hover:brightness-200 transition-all duration-300 hover:scale-110" src={assets.microsoft_logo} alt="Microsoft" />
                    <img className="h-8 filter brightness-150 hover:brightness-200 transition-all duration-300 hover:scale-110" src={assets.walmart_logo} alt="Walmart" />
                    <img className="h-8 filter brightness-150 hover:brightness-200 transition-all duration-300 hover:scale-110" src={assets.accenture_logo} alt="Accenture" />
                    <img className="h-8 filter brightness-150 hover:brightness-200 transition-all duration-300 hover:scale-110" src={assets.samsung_logo} alt="Samsung" />
                    <img className="h-8 filter brightness-150 hover:brightness-200 transition-all duration-300 hover:scale-110" src={assets.amazon_logo} alt="Amazon" />
                    <img className="h-8 filter brightness-150 hover:brightness-200 transition-all duration-300 hover:scale-110" src={assets.adobe_logo} alt="Adobe" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
