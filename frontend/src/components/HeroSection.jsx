import heroImg from '../assets/hero.jpeg';

export default function HeroSection({ t }) {
  return (
    <div className="max-w-3xl w-full text-center mt-6 md:mt-12 space-y-8 animate-fade-in z-10 relative">
      <div className="inline-block p-4 rounded-3xl bg-surface-container-high/50 backdrop-blur-md mb-2 shadow-sm border border-emerald-100/20">
        <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_food_beverage</span>
      </div>
      <h2 className="text-4xl md:text-6xl font-extrabold text-on-background leading-tight font-headline">
        {t.heroTitle} <span className="text-primary italic">{t.heroHighlight}</span>
      </h2>

      <div className="flex justify-center my-8">
        <div className="p-3 bg-surface-container-low border border-emerald-100/30 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
          <img src={heroImg} alt="Hero Cup" className="w-56 h-56 md:w-64 md:h-64 object-cover rounded-2xl" />
        </div>
      </div>

      <div className="space-y-6 mt-12">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-surface-container-low p-6 rounded-2xl max-w-lg shadow-sm border border-emerald-100/20">
            <p className="text-2xl font-bold text-emerald-900 mb-2">{t.heroGreeting}</p>
            <p className="text-lg text-secondary italic font-medium">"{t.heroSubtitle}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
