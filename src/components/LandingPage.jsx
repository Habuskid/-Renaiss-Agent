import { ArrowRightIcon, PresentationChartLineIcon, CpuChipIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

export default function LandingPage({ onLaunch, featuredCards = [] }) {
  const bgCards = featuredCards.slice(0, 5);
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 animate-fade-up relative">
      
      {/* Floating Background Cards */}
      <div className="absolute inset-0 pointer-events-none z-[-5] overflow-hidden">
        {bgCards.map((card, index) => {
          // Pre-defined scattered positions for up to 5 background cards
          const positions = [
            { top: '5%', left: '5%', delay: '0s', scale: '0.8', rotate: '-12deg' },
            { top: '15%', right: '5%', delay: '1.5s', scale: '0.9', rotate: '15deg' },
            { bottom: '20%', left: '10%', delay: '0.5s', scale: '0.85', rotate: '-8deg' },
            { bottom: '10%', right: '15%', delay: '2s', scale: '0.75', rotate: '10deg' },
            { top: '40%', right: '-5%', delay: '1s', scale: '0.8', rotate: '-5deg' },
          ];
          const pos = positions[index] || positions[0];

          return (
            <div 
              key={card.name}
              className="absolute animate-float-3d opacity-20 blur-[2px] grayscale-[30%]"
              style={{
                top: pos.top,
                bottom: pos.bottom,
                left: pos.left,
                right: pos.right,
                transform: `scale(${pos.scale}) rotate(${pos.rotate})`,
                animationDelay: pos.delay
              }}
            >
              <img 
                src={card.image} 
                alt={card.name}
                className="w-48 h-64 object-cover rounded-xl shadow-2xl border border-white/20"
              />
            </div>
          );
        })}
      </div>
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <h1 className="text-5xl lg:text-7xl font-display font-bold text-stone-900 tracking-tight leading-tight mb-6">
          Pricing Intelligence for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Real World Assets</span>
        </h1>
        <p className="text-lg lg:text-xl text-stone-500 mb-10 max-w-2xl mx-auto">
          The first AI-driven terminal to analyze physical collectibles on Renaiss. 
          Get instant fair market value, liquidity scores, and investment insights powered by Ai.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={onLaunch}
            className="group flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-stone-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Launch Terminal
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 delay-100 animate-fade-up group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <PresentationChartLineIcon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-3">Live Market Data</h3>
          <p className="text-stone-500 leading-relaxed">
            We aggregate recent sales from eBay, Goldin, and PWCC to plot the true fair market value over time, tracking volatility and moving averages.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 delay-200 animate-fade-up group">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <CpuChipIcon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-3">AI Deep Analysis</h3>
          <p className="text-stone-500 leading-relaxed">
            Our multi-modal AI reads raw card data, evaluates set rarity, checks historical price action, and writes a professional investment brief.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 delay-300 animate-fade-up group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <CheckBadgeIcon className="w-7 h-7" />
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
