import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { marked } from "marked";

const SYSTEM_PROMPT = `أنت ChemBot AI، مساعد ذكاء اصطناعي متخصص حصرياً في الكيمياء باللغة العربية.

## قاعدة أساسية صارمة جداً:
أنت متخصص في الكيمياء فقط. إذا جاءك أي سؤال خارج نطاق الكيمياء — مهما كان نوعه (تقنية، رياضة، طعام، لابتوب، سياسة، ترفيه، صحة عامة، وصفات، أخبار، إلخ) — يجب أن ترفضه فوراً بهذه الجملة بالضبط:

"⚗️ عذراً! أنا ChemBot AI ومتخصص في الكيمياء فقط. سؤالك خارج نطاق تخصصي. هل لديك سؤال عن تفاعل كيميائي، عنصر، معادلة، أو أي موضوع كيميائي؟ 🧪"

لا تحاول الإجابة على أي سؤال غير كيميائي مهما بدا بسيطاً أو منطقياً.

## مجالاتك الوحيدة المسموح بها:
- الكيمياء العامة والتحليلية
- الكيمياء العضوية وغير العضوية
- الكيمياء الفيزيائية والحرارية
- التفاعلات الكيميائية والمعادلات وموازنتها
- الجدول الدوري والعناصر وخصائصها
- الروابط الكيميائية والتركيب الجزيئي
- المحاليل والتركيز والمولارية
- الكيمياء الكهروكيميائية
- الكيمياء الحيوية (فقط المركبات الكيميائية الحيوية)
- حسابات الكيمياء والستويوميتري
- قوانين الغازات وقانون أفوجادرو وبويل وشارل

## قواعد الإجابة على أسئلة الكيمياء:
1. أجب باللغة العربية الفصحى الواضحة
2. استخدم الرموز الكيميائية الدولية (H₂O, CO₂, NaCl, إلخ)
3. اشرح المعادلات الكيميائية بوضوح ووازنها
4. استخدم التنسيق الجيد: عناوين، قوائم، جداول عند الحاجة
5. أعطِ أمثلة عملية وتطبيقات حياتية عند الإمكان
6. اذكر قوانين ومعادلات بشكل واضح ودقيق علمياً`;

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' }) + ' ' +
    d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatBotPage() {
  const [conversations, setConversations]   = useState([]);
  const [currentConvId, setCurrentConvId]   = useState(null);
  const [messages, setMessages]             = useState([]);
  const [isLoading, setIsLoading]           = useState(false);
  const [input, setInput]                   = useState("");
  const [showKeyModal, setShowKeyModal]     = useState(false);
  const [apiKey, setApiKey]                 = useState(localStorage.getItem("groq_api_key") || "");
  const [sidebarOpen, setSidebarOpen]       = useState(false); // mobile drawer

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("chembot_conversations");
    if (saved) {
      try { setConversations(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (conversations.length > 0)
      localStorage.setItem("chembot_conversations", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (messages.length > 0)
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveConversation = (msgs, titleHint) => {
    const conv = {
      id: currentConvId || Date.now().toString(),
      title: titleHint?.slice(0, 40) || "محادثة جديدة",
      messages: msgs,
      preview: msgs.length > 0 && msgs[msgs.length - 1]?.content?.slice(0, 60),
      updatedAt: Date.now(),
    };
    setConversations(prev => {
      const existing = prev.find(c => c.id === conv.id);
      return existing ? prev.map(c => c.id === conv.id ? conv : c) : [...prev, conv];
    });
    return conv.id;
  };

  const newChat = () => {
    setCurrentConvId(null);
    setMessages([]);
    setSidebarOpen(false);
  };

  const loadConversation = (id) => {
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      setCurrentConvId(conv.id);
      setMessages(conv.messages);
      setSidebarOpen(false);
    }
  };

  const deleteConversation = (id, e) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(c => c.id !== id));
    if (currentConvId === id) { setCurrentConvId(null); setMessages([]); }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg     = { role: "user", content: text, time: Date.now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let convId = currentConvId;
    if (!convId) { convId = saveConversation(newMessages, text); setCurrentConvId(convId); }
    else saveConversation(newMessages, text);

    const storedKey = apiKey || localStorage.getItem("groq_api_key");
    if (!storedKey) { setShowKeyModal(true); setIsLoading(false); return; }

    try {
      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...newMessages.map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.content }))
      ];
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${storedKey}` },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: apiMessages, max_tokens: 1500 }),
      });
      if (!res.ok) throw new Error("فشل الاتصال بـ Groq API");
      const data        = await res.json();
      const reply       = data.choices[0]?.message?.content || "عذراً، لم أتمكن من الإجابة.";
      const botMsg      = { role: "bot", content: reply, time: Date.now() };
      const finalMsgs   = [...newMessages, botMsg];
      setMessages(finalMsgs);
      saveConversation(finalMsgs, text);
    } catch (err) {
      alert(`❌ حدث خطأ: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
    alert("تم نسخ الرسالة");
  };

  const handleSaveApiKey = () => {
    if (apiKey.startsWith("gsk_")) {
      localStorage.setItem("groq_api_key", apiKey);
      setShowKeyModal(false);
    } else {
      alert("المفتاح غير صالح – يجب أن يبدأ بـ gsk_");
    }
  };

  return (
    <div className="cb-page">
      <style>{`
        /* ══════════════════════════════════════════
           الحل الأساسي:
           - cb-page = height 100svh + overflow hidden
           - الـ scroll الوحيد = messages-container
           - الـ sidebar على موبايل = drawer خارج الـ flow
        ══════════════════════════════════════════ */

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; max-width: 100%; }

        :root {
          --cyan:        #00d4ff;
          --teal:        #00c9a7;
          --purple:      #7c5cbf;
          --glow:        rgba(0,212,255,0.15);
          --text-1:      #e8f0fe;
          --text-2:      #b8d0ff;
          --text-3:      #7a9bcb;
          --border:      rgba(0,212,255,0.2);
          --border-h:    rgba(0,212,255,0.4);
          --glass:       rgba(8,18,38,0.65);
          --glass-s:     rgba(5,12,28,0.85);
        }

        /* ── Root page: fixed height, no outer scroll ── */
        .cb-page {
          height: 100svh;
          max-width: 100vw;
          background: transparent;
          display: flex;
          flex-direction: column;
          overflow: hidden;              /* ← لا scroll خارج الصفحة أبداً */
          font-family: 'Cairo','Segoe UI',sans-serif;
        }

        /* ── Header ── */
        .cb-header {
          flex-shrink: 0;               /* ← لا يتضغط */
          background: var(--glass);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          padding: 10px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          min-height: 52px;
        }
        .cb-back {
          background: none;
          border: none;
          color: var(--cyan);
          font-size: 13px;
          cursor: pointer;
          white-space: nowrap;
        }
        .cb-back:hover { text-shadow: 0 0 6px var(--cyan); }
        .cb-header h2 {
          font-size: clamp(0.9rem, 3vw, 1.25rem);
          background: linear-gradient(135deg, var(--cyan), var(--teal));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          white-space: nowrap;
        }
        .cb-api-status {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 12px;
          color: var(--text-2);
        }
        .cb-api-status button {
          background: rgba(0,212,255,0.1);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 4px 10px;
          cursor: pointer;
          color: var(--cyan);
          font-size: 11px;
          white-space: nowrap;
        }
        /* mobile sidebar toggle */
        .cb-sidebar-toggle {
          display: none;
          background: rgba(0,212,255,0.1);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 6px 10px;
          color: var(--cyan);
          cursor: pointer;
          font-size: 14px;
          white-space: nowrap;
        }

        /* ── Main area: fills remaining height ── */
        .cb-main {
          flex: 1;
          display: flex;
          overflow: hidden;             /* ← الأبناء يتحكموا في scroll داخلهم */
          position: relative;
        }

        /* ── Sidebar ── */
        .cb-sidebar {
          width: 270px;
          flex-shrink: 0;
          background: var(--glass);
          backdrop-filter: blur(16px);
          border-left: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: width 0.3s ease;
        }
        .cb-sidebar-head {
          flex-shrink: 0;
          padding: 14px 12px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }
        .cb-sidebar-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-2);
          text-transform: uppercase;
        }
        .cb-new-chat {
          background: linear-gradient(135deg,rgba(0,212,255,0.15),rgba(0,201,167,0.1));
          border: 1px solid var(--border-h);
          border-radius: 8px;
          color: var(--cyan);
          padding: 5px 9px;
          font-size: 12px;
          cursor: pointer;
          white-space: nowrap;
        }
        .cb-new-chat:hover { background: rgba(0,212,255,0.25); }

        /* convs list scrolls internally */
        .cb-convs {
          flex: 1;
          overflow-y: auto;
          padding: 6px;
        }
        .cb-sidebar-empty {
          font-size: 12px;
          color: var(--text-3);
          text-align: center;
          padding: 20px 10px;
        }
        .cb-conv-item {
          padding: 9px 10px;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 2px;
          border: 1px solid transparent;
          transition: 0.2s;
        }
        .cb-conv-item:hover { background: rgba(0,212,255,0.08); border-color: var(--border); }
        .cb-conv-item.active { background: rgba(0,212,255,0.12); border-color: var(--cyan); }
        .cb-conv-row { display: flex; justify-content: space-between; align-items: flex-start; }
        .cb-conv-info { flex: 1; min-width: 0; }
        .cb-conv-title {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-1);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cb-conv-preview {
          font-size: 11px;
          color: var(--text-3);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cb-conv-time { font-size: 10px; color: var(--text-3); margin-top: 2px; }
        .cb-conv-del {
          background: none;
          border: none;
          color: var(--text-3);
          cursor: pointer;
          font-size: 12px;
          opacity: 0;
          transition: 0.2s;
          flex-shrink: 0;
          padding: 0 2px;
        }
        .cb-conv-item:hover .cb-conv-del { opacity: 1; }

        .cb-quick {
          flex-shrink: 0;
          padding: 10px;
          border-top: 1px solid var(--border);
        }
        .cb-qt-title { font-size: 10px; color: var(--text-3); text-transform: uppercase; margin-bottom: 6px; }
        .cb-qt-btn {
          width: 100%;
          text-align: right;
          background: rgba(0,212,255,0.04);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-2);
          padding: 6px 8px;
          font-size: 11px;
          margin-bottom: 4px;
          cursor: pointer;
          transition: 0.2s;
        }
        .cb-qt-btn:hover { background: rgba(0,212,255,0.1); border-color: var(--cyan); color: var(--cyan); }

        /* ── Chat area ── */
        .cb-chat {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;             /* ← الـ scroll داخل messages فقط */
          min-width: 0;
        }

        /* ── Messages: الـ scroll الوحيد المسموح به ── */
        .cb-messages {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: clamp(16px, 3vw, 28px) clamp(12px, 4vw, 32px);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ── Welcome ── */
        .cb-welcome {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: clamp(20px, 4vw, 40px);
          background: var(--glass-s);
          backdrop-filter: blur(20px);
          border-radius: clamp(16px, 3vw, 32px);
          border: 1px solid var(--border);
        }
        .cb-welcome-icon {
          font-size: clamp(40px, 10vw, 64px);
          margin-bottom: 16px;
          animation: float 3s ease-in-out infinite;
        }
        .cb-welcome-title {
          font-size: clamp(1.2rem, 4vw, 1.8rem);
          font-weight: 900;
          background: linear-gradient(135deg, var(--cyan), var(--teal));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .cb-welcome-sub {
          font-size: clamp(12px, 2.5vw, 15px);
          color: var(--text-2);
          max-width: 460px;
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .cb-examples {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 8px;
          max-width: 500px;
          width: 100%;
        }
        .cb-example-q {
          background: rgba(0,212,255,0.06);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 10px 12px;
          font-size: clamp(11px, 2vw, 13px);
          color: var(--text-2);
          cursor: pointer;
          transition: 0.25s;
          text-align: center;
        }
        .cb-example-q:hover {
          background: rgba(0,212,255,0.15);
          border-color: var(--cyan);
          transform: translateY(-2px);
        }

        /* ── Message bubbles ── */
        .cb-msg { display: flex; gap: 10px; animation: slideUp 0.3s ease; }
        .cb-msg.user { flex-direction: row-reverse; }
        .cb-avatar {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
        }
        .cb-msg.user .cb-avatar {
          background: linear-gradient(135deg, #1a2f5e, #0f1e42);
          border: 1px solid rgba(0,212,255,0.3);
        }
        .cb-msg.bot .cb-avatar {
          background: linear-gradient(135deg, #0d1f3c, #091529);
          border: 1px solid rgba(0,212,255,0.2);
          box-shadow: 0 0 12px var(--glow);
        }
        .cb-msg-content { flex: 1; max-width: 75%; }
        .cb-msg.user .cb-msg-content { display: flex; flex-direction: column; align-items: flex-end; }
        .cb-bubble {
          padding: 11px 15px;
          border-radius: 14px;
          font-size: clamp(13px, 2.5vw, 14px);
          line-height: 1.65;
          backdrop-filter: blur(8px);
          word-break: break-word;
          overflow-x: auto;              /* ← يسمح بـ scroll أفقي داخل الـ bubble فقط */
          max-width: 100%;
        }
        /* ── Markdown elements inside bubble ── */
        .cb-bubble pre {
          overflow-x: auto;
          max-width: 100%;
          background: rgba(0,0,0,0.3);
          border-radius: 8px;
          padding: 12px;
          margin: 8px 0;
        }
        .cb-bubble code {
          word-break: break-all;
          white-space: pre-wrap;
          font-size: 0.85em;
        }
        .cb-bubble pre code {
          white-space: pre;
          word-break: normal;
        }
        .cb-bubble table {
          width: 100%;
          max-width: 100%;
          border-collapse: collapse;
          display: block;
          overflow-x: auto;
          font-size: 0.85em;
        }
        .cb-bubble img { max-width: 100%; height: auto; }
        .cb-msg.user .cb-bubble {
          background: linear-gradient(135deg, #1a2f5e, #0f1e42);
          border: 1px solid rgba(0,212,255,0.3);
          border-radius: 14px 4px 14px 14px;
          color: var(--text-1);
        }
        .cb-msg.bot .cb-bubble {
          background: rgba(10,20,35,0.75);
          border: 1px solid var(--border);
          border-radius: 4px 14px 14px 14px;
          color: var(--text-1);
        }
        .cb-meta {
          font-size: 11px;
          color: var(--text-3);
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cb-msg.user .cb-meta { flex-direction: row-reverse; }
        .cb-copy {
          background: rgba(0,212,255,0.06);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-3);
          padding: 2px 7px;
          font-size: 11px;
          cursor: pointer;
          transition: 0.2s;
        }
        .cb-copy:hover { background: rgba(0,212,255,0.12); color: var(--cyan); }

        /* ── Typing indicator ── */
        .cb-typing {
          display: flex;
          gap: 6px;
          align-items: center;
          padding: 9px 13px;
          background: rgba(10,20,35,0.75);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          width: fit-content;
          border: 1px solid var(--border);
        }
        .cb-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--cyan);
          animation: typingAnim 1.4s infinite;
        }
        .cb-dot:nth-child(2) { animation-delay: 0.2s; }
        .cb-dot:nth-child(3) { animation-delay: 0.4s; }

        /* ── Input area: fixed at bottom ── */
        .cb-input-area {
          flex-shrink: 0;
          padding: clamp(10px, 2vw, 16px) clamp(12px, 3vw, 24px) clamp(12px, 2.5vw, 20px);
          border-top: 1px solid var(--border);
          background: transparent;
        }
        .cb-input-wrap {
          background: var(--glass);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: 0.25s;
        }
        .cb-input-wrap:focus-within {
          border-color: var(--cyan);
          box-shadow: 0 0 0 3px rgba(0,212,255,0.1);
        }
        .cb-input-row { display: flex; align-items: flex-end; }
        .cb-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-1);
          font-family: 'Cairo', sans-serif;
          font-size: clamp(13px, 2.5vw, 15px);
          padding: 12px 14px;
          resize: none;
          min-height: 48px;
          max-height: 130px;
        }
        .cb-send {
          background: linear-gradient(135deg,rgba(0,212,255,0.2),rgba(0,201,167,0.15));
          border: none;
          color: var(--cyan);
          width: 48px;
          height: 48px;
          cursor: pointer;
          font-size: 19px;
          border-radius: 0 14px 14px 0;
          transition: 0.2s;
          flex-shrink: 0;
        }
        .cb-send:hover:not(:disabled) {
          background: linear-gradient(135deg,rgba(0,212,255,0.4),rgba(0,201,167,0.3));
          box-shadow: 0 0 12px rgba(0,212,255,0.4);
        }
        .cb-send:disabled { opacity: 0.4; cursor: not-allowed; }
        .cb-input-footer {
          display: flex;
          justify-content: space-between;
          padding: 5px 12px 7px;
          border-top: 1px solid rgba(0,212,255,0.1);
          font-size: 11px;
          color: var(--text-3);
        }

        /* ── API key modal ── */
        .cb-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }
        .cb-modal {
          background: var(--glass-s);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0,212,255,0.4);
          border-radius: clamp(16px, 3vw, 24px);
          padding: clamp(20px, 4vw, 28px);
          width: 100%;
          max-width: 320px;
          text-align: center;
        }
        .cb-modal h3 { color: var(--text-1); margin-bottom: 8px; }
        .cb-modal p { font-size: 12px; color: var(--text-3); margin-bottom: 12px; }
        .cb-modal input {
          width: 100%;
          background: rgba(0,212,255,0.08);
          border: 1px solid var(--border);
          border-radius: 40px;
          padding: 10px 16px;
          margin-bottom: 14px;
          color: white;
          direction: ltr;
          outline: none;
          font-size: 13px;
        }
        .cb-modal input:focus { border-color: var(--cyan); }
        .cb-modal button {
          background: var(--cyan);
          border: none;
          padding: 8px 24px;
          border-radius: 40px;
          font-weight: bold;
          cursor: pointer;
          color: #04060f;
        }

        /* ── Mobile sidebar overlay ── */
        .cb-sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 900;
        }

        /* ── Keyframes ── */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingAnim {
          0%,100% { opacity: 0.3; transform: scale(0.8); }
          50%      { opacity: 1;   transform: scale(1.1); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }

        /* ══════════════════════════════════════
           Tablet (≤ 768px)
        ══════════════════════════════════════ */
        @media (max-width: 768px) {
          .cb-sidebar { width: 230px; }
          .cb-msg-content { max-width: 85%; }
        }

        /* ══════════════════════════════════════
           Mobile (≤ 600px)
          الـ sidebar يتحول لـ drawer من الجانب
        ══════════════════════════════════════ */
        @media (max-width: 600px) {
          .cb-sidebar-toggle { display: block; }

          /* Sidebar = fixed drawer */
          .cb-sidebar {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: min(280px, 85vw);
            z-index: 1000;
            border-left: 1px solid var(--cyan);
            transform: translateX(100%);
            transition: transform 0.3s ease;
          }
          .cb-sidebar.open { transform: translateX(0); }

          .cb-sidebar-overlay { display: block; }
          .cb-sidebar-overlay.open { display: block; }
          .cb-sidebar-overlay:not(.open) { display: none; }

          /* Chat takes full width */
          .cb-chat { width: 100%; }

          .cb-msg-content { max-width: 90%; }
          .cb-messages { gap: 14px; }

          .cb-examples { grid-template-columns: 1fr 1fr; }
          .cb-welcome { padding: clamp(16px, 4vw, 24px); }

          /* Header wrapping */
          .cb-header { min-height: auto; }
          .cb-header h2 { font-size: 0.9rem; }
        }

        /* ══════════════════════════════════════
           Very small (≤ 380px)
        ══════════════════════════════════════ */
        @media (max-width: 380px) {
          .cb-examples { grid-template-columns: 1fr; }
          .cb-avatar { width: 28px; height: 28px; font-size: 14px; }
          .cb-bubble { font-size: 13px; padding: 9px 12px; }
        }
      `}</style>

      {/* ── Header ── */}
      <div className="cb-header">
        <button className="cb-back" onClick={() => window.location.href = "/"}>← العودة للرئيسية</button>
        <h2>🧪 ChemBot – مساعد الكيمياء الذكي</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div className="cb-api-status">
            <span>{localStorage.getItem("groq_api_key") ? "✅ API متصل" : "❌ API غير مضبوط"}</span>
            <button onClick={() => setShowKeyModal(true)}>تغيير المفتاح</button>
          </div>
          <button className="cb-sidebar-toggle" onClick={() => setSidebarOpen(v => !v)}>
            ☰ المحادثات
          </button>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="cb-main">

        {/* Mobile overlay */}
        <div
          className={`cb-sidebar-overlay ${sidebarOpen ? "open" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* ── Sidebar ── */}
        <div className={`cb-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="cb-sidebar-head">
            <span className="cb-sidebar-title">المحادثات</span>
            <button className="cb-new-chat" onClick={newChat}>+ جديد</button>
          </div>

          <div className="cb-convs">
            {conversations.length === 0 && <div className="cb-sidebar-empty">لا توجد محادثات بعد</div>}
            {[...conversations].reverse().map(conv => (
              <div
                key={conv.id}
                className={`cb-conv-item ${conv.id === currentConvId ? "active" : ""}`}
                onClick={() => loadConversation(conv.id)}
              >
                <div className="cb-conv-row">
                  <div className="cb-conv-info">
                    <div className="cb-conv-title">{conv.title}</div>
                    <div className="cb-conv-preview">{conv.preview || ""}</div>
                    <div className="cb-conv-time">{formatTime(conv.updatedAt)}</div>
                  </div>
                  <button className="cb-conv-del" onClick={e => deleteConversation(conv.id, e)}>✕</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cb-quick">
            <div className="cb-qt-title">مواضيع سريعة</div>
            {["كيف أوازن معادلة كيميائية؟", "شرح الروابط الأيونية", "أنواع التفاعلات الكيميائية"].map(q => (
              <button key={q} className="cb-qt-btn" onClick={() => { setInput(q); setSidebarOpen(false); }}>{q}</button>
            ))}
          </div>
        </div>

        {/* ── Chat ── */}
        <div className="cb-chat">

          {/* Messages — الـ scroll الوحيد في الصفحة */}
          <div className="cb-messages" id="messagesContainer">
            {messages.length === 0 && (
              <div className="cb-welcome">
                <div className="cb-welcome-icon">⚗️</div>
                <div className="cb-welcome-title">مرحباً في ChemBot AI</div>
                <div className="cb-welcome-sub">مساعدك الذكي المتخصص في الكيمياء — اسألني عن أي تفاعل كيميائي، معادلة، عنصر، أو مفهوم</div>
                <div className="cb-examples">
                  {[
                    ["⚖️", "موازنة التفاعلات", "كيف يتم موازنة التفاعلات الكيميائية؟"],
                    ["🔗", "أنواع الروابط",    "ما هي الروابط الأيونية والتساهمية؟"],
                    ["🔬", "قاعدة أوكتيت",    "اشرح قاعدة أوكتيت والاستثناءات عليها"],
                    ["🧮", "حسابات المولات",  "كيف تحسب عدد المولات؟"],
                    ["⚡", "أنواع التفاعلات", "أنواع التفاعلات الكيميائية بأمثلة"],
                    ["⚛️", "التركيب الذري",   "اشرح التركيب الذري والإلكترونات"],
                  ].map(([ic, label, q]) => (
                    <div key={label} className="cb-example-q" onClick={() => setInput(q)}>
                      {ic} {label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`cb-msg ${msg.role}`}>
                <div className="cb-avatar">{msg.role === "user" ? "👤" : "⚗️"}</div>
                <div className="cb-msg-content">
                  <div
                    className="cb-bubble"
                    dangerouslySetInnerHTML={{
                      __html: msg.role === "bot"
                        ? marked.parse(msg.content)
                        : msg.content.replace(/\n/g, "<br>")
                    }}
                  />
                  <div className="cb-meta">
                    <span>{formatTime(msg.time)}</span>
                    {msg.role === "bot" && (
                      <button className="cb-copy" onClick={() => copyMessage(msg.content)}>📋 نسخ</button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="cb-msg bot">
                <div className="cb-avatar">⚗️</div>
                <div className="cb-msg-content">
                  <div className="cb-typing">
                    <div className="cb-dot" />
                    <div className="cb-dot" />
                    <div className="cb-dot" />
                    <span style={{ fontSize: "13px", marginRight: 6 }}>ChemBot يفكر...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="cb-input-area">
            <div className="cb-input-wrap">
              <div className="cb-input-row">
                <textarea
                  className="cb-textarea"
                  rows="1"
                  placeholder="اكتب سؤالك الكيميائي..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  ref={inputRef}
                />
                <button className="cb-send" onClick={sendMessage} disabled={isLoading}>➤</button>
              </div>
              <div className="cb-input-footer">
                <span>⬅️ Shift+Enter للسطر الجديد</span>
                <span>{input.length} حرف</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── API Key Modal ── */}
      {showKeyModal && (
        <div className="cb-modal-overlay">
          <div className="cb-modal">
            <h3>أدخل مفتاح Groq API</h3>
            <p>يجب أن يبدأ بـ <code>gsk_</code></p>
            <input
              type="text"
              placeholder="gsk_xxxxxxxxx"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              autoFocus
            />
            <button onClick={handleSaveApiKey}>حفظ والمتابعة</button>
          </div>
        </div>
      )}
    </div>
  );
}
