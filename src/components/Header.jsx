import { ScaleIcon, ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Header({ isAppLaunched, onToggleApp }) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-stone-200/50 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-2 flex-shrink-0 shadow-inner">
          <ScaleIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-base text-stone-900 tracking-tight">
            Renaiss Intelligence Agent
          </h1>
          <p className="text-[11px] text-stone-400 tracking-wider mt-0.5 uppercase font-medium">
            Pokémon · One Piece · AI Analysis
          </p>
        </div>
      </div>
      
      {onToggleApp && (
        <button 
          onClick={onToggleApp}
          className="flex items-center gap-2 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-blue-600 hover:border-blue-200 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 shadow-sm"
        >
          {isAppLaunched ? (
            <>
              <MagnifyingGlassIcon className="w-4 h-4" />
              <span>Search Again</span>
            </>
          ) : (
            <>
              <span>Launch App</span>
              <ArrowRightIcon className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </header>
  );
}
