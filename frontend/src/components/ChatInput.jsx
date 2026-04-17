export default function ChatInput({ input, setInput, sendMessage, loading, t }) {
  return (
    <footer className="absolute bottom-0 left-0 right-0 p-6 md:p-10 pointer-events-none z-50">
      <div className="max-w-4xl mx-auto w-full pointer-events-auto">
        <div className="relative group">
          <div className="bg-surface-container-highest/90 backdrop-blur-3xl border border-outline-variant/20 rounded-[2.5rem] p-2 flex items-center shadow-2xl shadow-emerald-900/10 transition-shadow">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-stone-400 font-medium py-3 px-2 text-[15px] focus:outline-none min-w-0"
              placeholder={t.inputPlaceholder}
              type="text"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center shadow-md shadow-primary/20 hover:bg-primary-dim transition-all active:scale-95 group-focus-within:ring-4 ring-primary/20 focus:outline-none disabled:opacity-50 disabled:active:scale-100 shrink-0"
              style={{
                transform: document.documentElement.dir === 'rtl' ? 'rotate(180deg)' : 'none'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
            </button>
          </div>
          <div className="mt-3 text-center">
            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Powered by Omar Khaled</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
