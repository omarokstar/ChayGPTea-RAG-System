import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { sendMessageToApi } from "../api/chatApi.js";
import Sidebar from "./Sidebar";
import HeroSection from "./HeroSection";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ConfirmationModal from "./ConfirmationModal";
import { translations } from "../locales/translations";

export default function ChatBox() {
  const INITIAL_MESSAGES = [
    {
      role: "assistant",
      text: "مرحباً! أنا خبير الشاي / Hello! I am your tea expert. I only talk about tea. Do you have a tea-related question?",
    },
  ];

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState("en"); // 'en' or 'ar'
  const bottomRef = useRef(null);

  const t = translations[lang];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Set document dir when language changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const data = await sendMessageToApi(updatedMessages);
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (error) {
      toast.error(error.message || (lang === 'ar' ? 'حدث خطأ، يرجى المحاولة مرة أخرى.' : 'An error occurred, please try again.'));
      // Following best practices: we notify via Toaster, instead of appending dirty error messages to the chat history.
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container font-body transition-all" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
      <Sidebar onNewCup={() => setIsModalOpen(true)} t={t} />

      <main className="flex-1 flex flex-col relative tea-pattern overflow-hidden">
        <header className="fixed lg:absolute top-0 w-full z-50 bg-background/80 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none flex justify-between items-center px-6 py-4 max-w-full">
          <div className="lg:hidden flex items-center gap-3">
            <button className="p-2 text-stone-600 focus:outline-none">
              <span className="material-symbols-outlined text-primary">eco</span>
            </button>
            <span className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 italic font-headline">{t.appTitle}</span>
          </div>

          <div className="hidden lg:block"></div>

          <div className="flex items-center gap-4 lg:gap-6 z-50">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="px-3 py-1 bg-surface-container-high hover:bg-surface-container-highest rounded-full text-xs font-bold text-primary transition-colors border border-emerald-100/30">
              {lang === 'en' ? 'عربي' : 'English'}
            </button>

            {/* Mobile "New Cup" Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="lg:hidden p-2 rounded-full text-primary hover:bg-emerald-50 focus:outline-none transition-colors border border-emerald-100/20 bg-surface-container-low"
              title="New Cup"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pt-24 pb-40 px-6 md:px-12 lg:px-24 flex flex-col items-center custom-scrollbar">
          {messages.length === 1 && <HeroSection t={t} />}

          <MessageList
            messages={messages}
            loading={loading}
            bottomRef={bottomRef}
            lang={lang}
            t={t}
          />
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          loading={loading}
          t={t}
        />

        {/* Decorative Floating Elements */}
        <div className={`absolute top-20 ${lang === 'ar' ? 'left-10' : 'right-10'} w-64 h-64 opacity-[0.03] pointer-events-none select-none z-0`}>
          <img className="w-full h-full object-contain grayscale" alt="decorative tea leaf" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn-HZTbQQJhtlAxCwghgfdP_VyPPjF0lu7AWW3wMq-19yZCry2DVvGI28y7ALWsqywAkfgM-0FkW_YO--9EiRWOiVlXI7vfQ26_YBukKYae-geOy-m-bAX_lEx3GuSzpWcDuC9dpnTcqlsAwl3PL3rKHHlchNkl4OlfRaLuYdrD1oyowt9ToeacpmTIdF438lHNwD3mZ2WX5JXicQsgmRRuBeNSXbTJwPFP0xhIaNiYcU2_VSgnxkL5qSVlA-Rp06WCZJhZg4-uZiw" />
        </div>
        <div className={`absolute bottom-40 ${lang === 'ar' ? 'right-10' : 'left-10'} w-48 h-48 opacity-[0.03] pointer-events-none select-none transform -rotate-12 z-0`}>
          <img className="w-full h-full object-contain grayscale" alt="decorative teapot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmyX1QN9stA9ld4BiqELbQ7TqttxDRCdovzakls9AeKm1JBcKrFsldNNX6MXGoDs-wybNcw6HsXNTGpBIsxKNzoTdniZQFsIGtrFkGlqF6KnAjuhVUaNYmIOnpeibrIEefcz1JEnwpcu_IkyqfNYkSTC1QNZtx-Uj9I8wHkEpBsnylwshwq-PnD_W1LY-S-S451Z3FFBl-R9w3BoNLhycpUifoJ7aSGwlbEL2apE323DKnpWUxYoME4FtCM9E5Etl8JnhgvgKTTED_" />
        </div>
      </main>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={clearChat}
        title={t.modalTitle}
        message={t.modalMessage}
        cancelText={t.modalCancel}
        confirmText={t.modalConfirm}
      />
    </div>
  );
}
