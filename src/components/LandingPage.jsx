import { ArrowRightIcon, PresentationChartLineIcon, CpuChipIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

export default function LandingPage({ onLaunch, featuredCards = [] }) {
  const bgCards = featuredCards.slice(0, 4);
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 animate-fade-up relative">
      
      {/* We removed the absolute floating cards to create a clean, side-by-side premium Google-like design */}
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-20 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <h1 className="text-5xl lg:text-7xl font-display font-bold text-stone-900 tracking-tight leading-tight mb-6 animate-fade-up delay-100 cursor-default">
          <span className="inline-block transition-all duration-150 ease-out hover:-translate-y-3 hover:scale-110 hover:text-blue-600 mr-3">Pricing</span>
          <span className="inline-block transition-all duration-150 ease-out hover:-translate-y-3 hover:scale-110 hover:text-blue-600 mr-3">Intelligence</span>
          <span className="inline-block transition-all duration-150 ease-out hover:-translate-y-3 hover:scale-110 hover:text-blue-600">for</span>
          <br/>
          <span className="inline-block transition-all duration-150 ease-out hover:-translate-y-3 hover:scale-110 mr-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">Real</span>
          <span className="inline-block transition-all duration-150 ease-out hover:-translate-y-3 hover:scale-110 mr-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">World</span>
          <span className="inline-block transition-all duration-150 ease-out hover:-translate-y-3 hover:scale-110 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">Assets</span>
        </h1>
        <p className="text-lg lg:text-xl text-stone-600 mb-10 max-w-2xl mx-auto animate-fade-up delay-200">
          The first AI-driven terminal to analyze physical collectibles on Renaiss. 
          Get instant fair market value, liquidity scores, and investment insights powered by Ai.
        </p>
        
        <div className="flex items-center justify-center gap-4 animate-fade-up delay-300">
          <button 
            onClick={onLaunch}
            className="group flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-stone-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Launch Terminal
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Premium Side-by-Side Collection Row */}
      <div className="mb-24 relative z-10">
        <div className="flex items-center justify-between mb-6 animate-fade-up delay-300">
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-widest">Trending Collections</h3>
          <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-stone-200 to-transparent"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {bgCards.length > 0 ? (
            bgCards.map((card, index) => (
              <div 
                key={card.href || card.name}
                className={`bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group animate-fade-up`}
                style={{ animationDelay: `${300 + (index * 100)}ms` }}
                onClick={onLaunch}
              >
                <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 mb-4 shadow-inner relative">
                  <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <img 
                    src={card.imageUrlThumb || card.imageUrl} 
                    alt={card.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-left px-1">
                  <h4 className="font-bold text-stone-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">{card.name}</h4>
                  <p className="text-xs text-stone-500 mt-1 font-medium">{card.gradeLabel}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-stone-900">
                      ${(card.priceUsdCents / 100).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">View</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Skeleton Loaders for Instant Rendering */
            [...Array(4)].map((_, index) => (
              <div 
                key={`skeleton-${index}`}
                className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm animate-fade-up"
                style={{ animationDelay: `${300 + (index * 100)}ms` }}
              >
                <div className="w-full aspect-[3/4] rounded-xl bg-stone-200 animate-pulse mb-4"></div>
                <div className="px-1">
                  <div className="h-4 bg-stone-200 animate-pulse rounded-full w-3/4 mb-2"></div>
                  <div className="h-3 bg-stone-200 animate-pulse rounded-full w-1/2 mb-4"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-stone-200 animate-pulse rounded-full w-1/3"></div>
                    <div className="h-5 bg-stone-200 animate-pulse rounded-md w-10"></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] hover:scale-110 hover:-translate-y-6 transition-all duration-500 ease-out delay-100 animate-fade-up group cursor-default">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <PresentationChartLineIcon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-3">Real-Time Valuation</h3>
          <p className="text-stone-500 leading-relaxed">
            Instantly determine the fair market value of physical collectibles. Search by asset name to unlock real-time pricing intelligence.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] hover:scale-110 hover:-translate-y-6 transition-all duration-500 ease-out delay-200 animate-fade-up group cursor-default">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <CpuChipIcon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-3">AI-Powered Analysis</h3>
          <p className="text-stone-500 leading-relaxed">
            Our advanced AI engine evaluates physical assets to provide accurate liquidity scores, market volatility metrics, and comprehensive investment insights.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] hover:scale-110 hover:-translate-y-6 transition-all duration-500 ease-out delay-300 animate-fade-up group cursor-default">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <CheckBadgeIcon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-3">Renaiss Protocol Native</h3>
          <p className="text-stone-500 leading-relaxed">
            Powered by the Renaiss Protocol on BNB Chain. Our terminal brings verified transparency to physical assets indexed exclusively within the Renaiss ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}
