export default function Sidebar({ onNewCup, t }) {
  return (
    <aside className="hidden lg:flex flex-col h-full w-72 p-6 space-y-4 bg-emerald-50/50 dark:bg-stone-950/50 backdrop-blur-2xl border-x border-emerald-100/30 z-40 relative">
      <div className="flex items-center space-x-3 space-x-reverse mb-6 gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_food_beverage</span>
        </div>
        <div>
          <h1 className="text-xl font-black text-emerald-900 dark:text-emerald-50 leading-tight font-headline">{t.appTitle}</h1>
          <p className="text-xs text-stone-500 font-medium font-body truncate max-w-[200px]">{t.appSubtitle}</p>
        </div>
      </div>
      <button 
        onClick={onNewCup}
        className="w-full bg-primary text-on-primary rounded-full py-4 px-6 font-headline font-bold flex items-center justify-center gap-2 hover:bg-primary-dim active:scale-95 transition-all shadow-lg shadow-primary/10"
      >
        <span className="material-symbols-outlined text-sm">add</span>
        {t.newCup}
      </button>
    </aside>
  );
}
