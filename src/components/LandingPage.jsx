import { ArrowRightIcon, ChartBarSquareIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function LandingPage({ onLaunch }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 animate-fade-up">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <h1 className="text-5xl lg:text-7xl font-display font-bold text-stone-900 tracking-tight leading-tight mb-6">
          Pricing Intelligence for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Real World Assets</span>
        </h1>
        <p className="text-lg lg:text-xl text-stone-500 mb-10 max-w-2xl mx-auto">
          The first AI-driven terminal to analyze physical collectibles on Renaiss. 
          Get instant fair market value, liquidity scores, and investment insights powered by Google Gemini.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={onLaunch}
            className="group flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-stone-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Launch Terminal
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="https://renaiss.com" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full font-medium text-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors">
            Read Docs
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-stone-200/50 shadow-sm hover:shadow-md transition-shadow delay-100 animate-fade-up">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <ChartBarSquareIcon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-3">Live Market Data</h3>
          <p className="text-stone-500 leading-relaxed">
            We aggregate recent sales from eBay, Goldin, and PWCC to plot the true fair market value over time, tracking volatility and moving averages.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-stone-200/50 shadow-sm hover:shadow-md transition-shadow delay-200 animate-fade-up">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
            <SparklesIcon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-3">AI Deep Analysis</h3>
          <p className="text-stone-500 leading-relaxed">
            Our multi-modal AI reads raw card data, evaluates set rarity, checks historical price action, and writes a professional investment brief.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-stone-200/50 shadow-sm hover:shadow-md transition-shadow delay-300 animate-fade-up">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
            <ShieldCheckIcon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-3">BNB Chain Verified</h3>
          <p className="text-stone-500 leading-relaxed">
            Powered by the robust infrastructure of Renaiss Protocol. Assets are fully verified on-chain to prevent counterfeits and ensure absolute provenance.
          </p>
        </div>
      </div>
    </div>
  );
}
