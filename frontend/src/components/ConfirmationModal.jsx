export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, cancelText, confirmText }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest p-6 rounded-3xl max-w-sm w-full mx-4 shadow-2xl border border-emerald-100/20">
        <h3 className="text-xl font-bold font-headline text-emerald-900 mb-2">{title}</h3>
        <p className="text-stone-600 font-body text-sm mb-6 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3 flex-wrap">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-50 font-bold text-sm transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-error text-on-error hover:bg-error-dim font-bold text-sm transition-colors shadow-md shadow-error/10"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
