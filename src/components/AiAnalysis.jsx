import { useState, useEffect, useRef } from 'react';
import { SparklesIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { analyzeCard } from '../services/gemini.js';
import { formatUSD } from '../utils/formatters.js';
import StarRating from './StarRating.jsx';
import TrendBadge from './TrendBadge.jsx';

export default function AiAnalysis({ card, details, trades, fmvSeries }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [usageCount, setUsageCount] = useState(() => {
    return parseInt(localStorage.getItem('renaiss_ai_usage') || '0', 10);
  });
  const prevCardRef = useRef(null);

  useEffect(() => {
    if (card !== prevCardRef.current) {
      setAnalysis(null);
      setError(null);
      setHasStarted(false); // Reset button state on new card
      prevCardRef.current = card;
    }
  }, [card]);

  const runAnalysis = async () => {
    if (!card || !details || !trades || !fmvSeries) return;
    if (usageCount >= 3) return; // safeguard
    
    setHasStarted(true);
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeCard({ cardDetail: details, trades, fmvSeries });
      setAnalysis(result);
      
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem('renaiss_ai_usage', newCount.toString());
    } catch (err) {
        // If we hit a rate limit, show a much friendlier error
        if (err.message?.includes('Quota exceeded') || err.message?.includes('429')) {
          setError('The AI is currently analyzing too many requests. Please wait a moment before trying again.');
        } else {
          setError(err.message || 'An error occurred during analysis.');
        }
      } finally {
        setLoading(false);
      }
    };

  const getBuyWindowColor = (window) => {
    if (window === 'Now') return 'text-green-600 font-bold';
    if (window === 'Wait') return 'text-amber-500 font-bold';
    return 'text-red-600 font-bold';
  };

  if (loading) {
    return (
      <div className="ai-border-glow bg-white/90 backdrop-blur-sm rounded-xl p-8 border border-stone-200/50 shadow-xl flex flex-col items-center justify-center text-center h-full min-h-[300px] transition-all">
        <ArrowPathIcon className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-stone-900 font-medium">Analyzing 10k+ data points...</p>
        <p className="text-sm text-stone-500 mt-1">Please wait while the AI reviews the market data.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/90 backdrop-blur-sm rounded-xl p-8 border border-red-100 shadow-xl flex flex-col items-center justify-center text-center h-full min-h-[300px] animate-fade-up">
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button 
          onClick={() => setError(null)}
          className="text-sm bg-white text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
        >
          Dismiss
        </button>
      </div>
    );
  }

  if (!hasStarted) {
    if (usageCount >= 3) {
      return (
        <div className="bg-gradient-to-br from-stone-50 to-stone-100 backdrop-blur-sm rounded-xl p-8 border border-stone-200/50 shadow-inner flex flex-col items-center justify-center h-full min-h-[300px] animate-fade-up text-center">
          <SparklesIcon className="w-10 h-10 text-stone-300 mb-4" />
          <h3 className="text-lg font-bold text-stone-900 mb-2">Usage Limit Reached</h3>
          <p className="text-sm text-stone-500 mb-6 max-w-[250px]">You have exhausted your 3 free AI Market Analyses.</p>
          <button 
            disabled
            className="bg-stone-300 text-stone-500 px-6 py-2.5 rounded-full font-medium cursor-not-allowed shadow-inner flex items-center gap-2 mb-4"
          >
            <SparklesIcon className="w-4 h-4" />
            Upgrade to Premium
          </button>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-stone-400 bg-stone-200/50 px-3 py-1.5 rounded-full border border-stone-200">
            3 / 3 Used
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-white to-stone-50/50 backdrop-blur-sm rounded-xl p-8 border border-stone-200/50 shadow-lg flex flex-col items-center justify-center h-full min-h-[300px] animate-fade-up text-center">
        <SparklesIcon className="w-10 h-10 text-amber-500 mb-4" />
        <h3 className="text-lg font-bold text-stone-900 mb-2">Ready for AI Analysis</h3>
        <p className="text-sm text-stone-500 mb-6 max-w-[250px]">Generate a fair market value range and conviction rating using live data.</p>
        <button 
          onClick={runAnalysis}
          className="bg-stone-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-stone-800 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 mb-4"
        >
          <SparklesIcon className="w-4 h-4" />
          Generate Insight ({3 - usageCount} left)
        </button>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-stone-400 bg-stone-100/80 px-3 py-1.5 rounded-full border border-stone-200/60">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
          Free Tier API • 15 Requests / Min
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-gradient-to-br from-white to-stone-50/50 backdrop-blur-sm rounded-xl p-8 border border-stone-200/50 shadow-lg flex flex-col items-center justify-center h-full min-h-[300px] animate-fade-up">
        <ArrowPathIcon className="w-6 h-6 text-stone-300 animate-spin mb-3" />
        <p className="text-stone-400 font-medium">Awaiting market data...</p>
      </div>
    );
  }

  return (
    <div className="ai-border-glow bg-white/95 backdrop-blur-md rounded-xl p-6 border border-stone-200/50 shadow-2xl h-full flex flex-col min-h-[300px] animate-fade-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-2 rounded-lg shadow-inner">
          <SparklesIcon className="w-5 h-5 text-amber-600" />
        </div>
        <h2 className="font-bold text-stone-900 tracking-tight text-lg">AI Market Analysis</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-stone-50/50 backdrop-blur-sm p-4 rounded-xl border border-stone-100 shadow-sm animate-fade-up delay-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Fair Value Range</p>
          <p className="text-lg font-bold text-stone-900 mt-1.5">
            {formatUSD(analysis.fairValueLow)} - {formatUSD(analysis.fairValueHigh)}
          </p>
        </div>
        <div className="bg-stone-50/50 backdrop-blur-sm p-4 rounded-xl border border-stone-100 shadow-sm animate-fade-up delay-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Buy Window</p>
          <p className={`text-lg mt-1.5 ${getBuyWindowColor(analysis.buyWindow)}`}>
            {analysis.buyWindow}
          </p>
        </div>
        <div className="bg-stone-50/50 backdrop-blur-sm p-4 rounded-xl border border-stone-100 shadow-sm animate-fade-up delay-300 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-center">
          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Market Trend</p>
          <div>
            <TrendBadge trend={analysis.trend} />
          </div>
        </div>
        <div className="bg-stone-50/50 backdrop-blur-sm p-4 rounded-xl border border-stone-100 shadow-sm animate-fade-up delay-400 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-center">
          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Conviction Rating</p>
          <StarRating rating={analysis.rating} />
        </div>
      </div>

      <div className="mt-auto animate-fade-up delay-400">
        <p className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-3">Analyst Insight</p>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 rounded-xl border border-blue-100/50 shadow-inner">
          <p className="text-sm text-stone-800 leading-relaxed font-medium">
            {analysis.insight}
          </p>
        </div>
      </div>
    </div>
  );
}
