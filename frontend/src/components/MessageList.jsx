export default function MessageList({ messages, loading, bottomRef }) {
  return (
    <div className="w-full max-w-3xl flex flex-col gap-6 z-10 relative">
      {messages.length > 1 && messages.map((m, i) => (
        <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
          {m.role === "assistant" && (
            <div className="flex items-center gap-2 mb-2 ml-1">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_food_beverage</span>
              <span className="text-xs font-bold text-primary tracking-wide">ChaYGPTea</span>
            </div>
          )}
          <div
            className={`px-5 py-4 rounded-2xl max-w-[85%] md:max-w-[75%] shadow-sm ${m.role === "user"
              ? "bg-primary text-on-primary rounded-tr-sm"
              : "bg-surface-container-high text-on-surface rounded-tl-sm border border-emerald-100/30"
              }`}
            style={{ direction: /[\u0600-\u06FF]/.test(m.text) ? "rtl" : "ltr" }}
          >
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{m.text}</p>
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2 mb-1 ml-1">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_food_beverage</span>
            <span className="text-xs font-bold text-primary tracking-wide">ChaYGPTea</span>
          </div>
          <div className="bg-surface-container-high px-5 py-4 rounded-2xl rounded-tl-sm border border-emerald-100/30 text-on-surface flex items-center gap-2">
            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      )}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
