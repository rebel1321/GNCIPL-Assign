import { assets } from "../assets/assets";

const AppDownload = () => {
    return (
        <div className="container px-4 2xl:px-20 mx-auto my-20 fade-in">
            <div className="relative glass bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 border border-slate-700/50 p-12 sm:p-24 lg:p-32 rounded-3xl backdrop-blur-md overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                    <h1 className="text-3xl sm:text-5xl font-bold mb-8 max-w-lg text-white leading-tight">
                        Download Mobile App For
                        <span className="gradient-text block">Better Experience</span>
                    </h1>
                    <p className="text-slate-300 text-lg mb-10 max-w-md">
                        Get instant access to thousands of job opportunities right at your fingertips. Apply, track, and manage your career on the go.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="inline-block btn-animated card-hover">
                            <img className="h-14 filter brightness-150 hover:brightness-200 transition-all duration-300" src={assets.play_store} alt="Play Store" />
                        </a>
                        <a href="#" className="inline-block btn-animated card-hover">
                            <img className="h-14 filter brightness-150 hover:brightness-200 transition-all duration-300" src={assets.app_store} alt="App Store" />
                        </a>
                    </div>
                </div>
                <img 
                    className="absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden filter brightness-110 hover:brightness-125 transition-all duration-500" 
                    src={assets.app_main_img} 
                    alt="Mobile App" 
                />
            </div>
        </div>
    );
};

export default AppDownload;
