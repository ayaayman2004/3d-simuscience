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
  const [conversations, setConversations] = useState([]);
  const [currentConvId, setCurrentConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem("groq_api_key") || "");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    const msgContainer = document.getElementById('messagesContainer');
    if (msgContainer) msgContainer.scrollTop = 0;
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("chembot_conversations");
    if (saved) {
      try {
        const convs = JSON.parse(saved);
        setConversations(convs);
        setCurrentConvId(null);
        setMessages([]);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("chembot_conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
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
      if (existing) {
        return prev.map(c => c.id === conv.id ? conv : c);
      } else {
        return [...prev, conv];
      }
    });
    return conv.id;
  };

  const newChat = () => {
    setCurrentConvId(null);
    setMessages([]);
    setTimeout(() => {
      window.scrollTo(0, 0);
      const msgContainer = document.getElementById('messagesContainer');
      if (msgContainer) msgContainer.scrollTop = 0;
    }, 0);
  };

  const loadConversation = (id) => {
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      setCurrentConvId(conv.id);
      setMessages(conv.messages);
      setTimeout(() => {
        window.scrollTo(0, 0);
        const msgContainer = document.getElementById('messagesContainer');
        if (msgContainer) msgContainer.scrollTop = 0;
      }, 0);
    }
  };

  const deleteConversation = (id, e) => {
    e.stopPropagation();
    const newConvs = conversations.filter(c => c.id !== id);
    setConversations(newConvs);
    if (currentConvId === id) {
      setCurrentConvId(null);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = { role: "user", content: text, time: Date.now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let convId = currentConvId;
    if (!convId) {
      convId = saveConversation(newMessages, text);
      setCurrentConvId(convId);
    } else {
      saveConversation(newMessages, text);
    }

    const storedKey = apiKey || localStorage.getItem("groq_api_key");
    if (!storedKey) {
      setShowKeyModal(true);
      setIsLoading(false);
      return;
    }

    try {
      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...newMessages.map(m => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content
        }))
      ];

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: apiMessages,
          max_tokens: 1500,
        }),
      });

      if (!res.ok) throw new Error("فشل الاتصال بـ Groq API");

      const data = await res.json();
      const reply = data.choices[0]?.message?.content || "عذراً، لم أتمكن من الإجابة.";
      const botMsg = { role: "bot", content: reply, time: Date.now() };
      const finalMessages = [...newMessages, botMsg];
      setMessages(finalMessages);
      saveConversation(finalMessages, text);
    } catch (err) {
      alert(`❌ حدث خطأ: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
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
    <div className="chatbot-fullpage">
      <div className="chatbot-header-full">
        <button className="back-home" onClick={() => window.location.href = "/"}>← العودة للرئيسية</button>
        <h2>🧪 ChemBot – مساعد الكيمياء الذكي</h2>
        <div className="api-status">
          <span>{localStorage.getItem("groq_api_key") ? "✅ API متصل" : "❌ API غير مضبوط"}</span>
          <button onClick={() => setShowKeyModal(true)}>تغيير المفتاح</button>
        </div>
      </div>

      <div className="chatbot-main">
        <div className="chatbot-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-title">المحادثات</span>
            <button className="btn-new-chat" onClick={newChat}>+ جديد</button>
          </div>
          <div className="conversations-list">
            {conversations.length === 0 && <div className="sidebar-empty">لا توجد محادثات بعد</div>}
            {[...conversations].reverse().map(conv => (
              <div
                key={conv.id}
                className={`conversation-item ${conv.id === currentConvId ? 'active' : ''}`}
                onClick={() => loadConversation(conv.id)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div className="conv-title">{conv.title}</div>
                    <div className="conv-preview">{conv.preview || ""}</div>
                    <div className="conv-time">{formatTime(conv.updatedAt)}</div>
                  </div>
                  <button className="conv-delete" onClick={(e) => deleteConversation(conv.id, e)}>✕</button>
                </div>
              </div>
            ))}
          </div>
          <div className="quick-topics">
            <div className="qt-title">مواضيع سريعة</div>
            {["كيف أوازن معادلة كيميائية؟", "شرح الروابط الأيونية", "أنواع التفاعلات الكيميائية"].map(q => (
              <button key={q} className="qt-btn" onClick={() => setInput(q)}>{q}</button>
            ))}
          </div>
        </div>

        <div className="chat-area">
          <div className="messages-container" id="messagesContainer">
            {messages.length === 0 && (
              <div className="welcome-screen">
                <div className="welcome-icon">⚗️</div>
                <div className="welcome-title">مرحباً في ChemBot AI</div>
                <div className="welcome-subtitle">مساعدك الذكي المتخصص في الكيمياء — اسألني عن أي تفاعل كيميائي، معادلة، عنصر، أو مفهوم</div>
                <div className="example-questions">
                  <div className="example-q" onClick={() => setInput("كيف يتم موازنة التفاعلات الكيميائية؟ أعطني أمثلة")}>⚖️ موازنة التفاعلات</div>
                  <div className="example-q" onClick={() => setInput("ما هي الروابط الأيونية والتساهمية؟")}>🔗 أنواع الروابط</div>
                  <div className="example-q" onClick={() => setInput("اشرح قاعدة أوكتيت والاستثناءات عليها")}>🔬 قاعدة أوكتيت</div>
                  <div className="example-q" onClick={() => setInput("كيف تحسب عدد المولات؟")}>🧮 حسابات المولات</div>
                  <div className="example-q" onClick={() => setInput("أنواع التفاعلات الكيميائية بأمثلة")}>⚡ أنواع التفاعلات</div>
                  <div className="example-q" onClick={() => setInput("اشرح التركيب الذري والإلكترونات")}>⚛️ التركيب الذري</div>
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="msg-avatar">{msg.role === "user" ? "👤" : "⚗️"}</div>
                <div className="msg-content">
                  <div className="msg-bubble" dangerouslySetInnerHTML={{ __html: msg.role === "bot" ? marked.parse(msg.content) : msg.content.replace(/\n/g, '<br>') }} />
                  <div className="msg-meta">
                    <span>{formatTime(msg.time)}</span>
                    {msg.role === "bot" && <button className="copy-btn" onClick={() => copyMessage(msg.content)}>📋 نسخ</button>}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="msg-avatar">⚗️</div>
                <div className="msg-content">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <span style={{ fontSize: "13px", marginRight: "6px" }}>ChemBot يفكر...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-area">
            <div className="input-wrapper">
              <div className="input-row">
                <textarea
                  id="userInput"
                  rows="1"
                  placeholder="اكتب سؤالك الكيميائي..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  ref={inputRef}
                />
                <button className="send-btn" onClick={sendMessage} disabled={isLoading}>➤</button>
              </div>
              <div className="input-footer">
                <span className="input-hint">⬅️ Shift+Enter للسطر الجديد</span>
                <span className="char-count">{input.length} حرف</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showKeyModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>أدخل مفتاح Groq API</h3>
            <p style={{ fontSize: "12px", color: "#8fa3c8" }}>يجب أن يبدأ بـ <code>gsk_</code></p>
            <input
              type="text"
              placeholder="gsk_xxxxxxxxx"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              autoFocus
            />
            <button onClick={handleSaveApiKey}>حفظ والمتابعة</button>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --accent-cyan: #00d4ff;
          --accent-teal: #00c9a7;
          --accent-purple: #7c5cbf;
          --accent-glow: rgba(0,212,255,0.15);
          --text-primary: #e8f0fe;
          --text-secondary: #b8d0ff;
          --text-muted: #7a9bcb;
          --border: rgba(0,212,255,0.2);
          --border-hover: rgba(0,212,255,0.4);
          --bg-glass: rgba(8, 18, 38, 0.65);
          --bg-glass-strong: rgba(5, 12, 28, 0.85);
        }

        .chatbot-fullpage {
          min-height: 100vh;
          background: transparent;
          display: flex;
          flex-direction: column;
          font-family: 'Cairo', 'Segoe UI', sans-serif;
        }

        /* header with glass effect */
        .chatbot-header-full {
          background: var(--bg-glass);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .back-home {
          background: none;
          border: none;
          color: var(--accent-cyan);
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }
        .back-home:hover {
          text-shadow: 0 0 6px var(--accent-cyan);
        }
        .chatbot-header-full h2 {
          margin: 0;
          font-size: 1.3rem;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-teal));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .api-status {
          display: flex;
          gap: 12px;
          align-items: center;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .api-status button {
          background: rgba(0,212,255,0.1);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 4px 12px;
          cursor: pointer;
          color: var(--accent-cyan);
          transition: 0.2s;
        }
        .api-status button:hover {
          background: rgba(0,212,255,0.2);
          border-color: var(--accent-cyan);
        }

        /* main layout */
        .chatbot-main {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        /* sidebar glass */
        .chatbot-sidebar {
          width: 280px;
          background: var(--bg-glass);
          backdrop-filter: blur(16px);
          border-left: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .sidebar-header {
          padding: 16px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sidebar-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
        }
        .btn-new-chat {
          background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,201,167,0.1));
          border: 1px solid var(--border-hover);
          border-radius: 8px;
          color: var(--accent-cyan);
          padding: 5px 10px;
          font-size: 12px;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-new-chat:hover {
          background: rgba(0,212,255,0.25);
          border-color: var(--accent-cyan);
        }
        .conversations-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
        }
        .conversation-item {
          padding: 10px 12px;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 2px;
          border: 1px solid transparent;
          transition: 0.2s;
        }
        .conversation-item:hover {
          background: rgba(0,212,255,0.08);
          border-color: var(--border);
        }
        .conversation-item.active {
          background: rgba(0,212,255,0.12);
          border-color: var(--accent-cyan);
        }
        .conv-title {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .conv-preview {
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .conv-time {
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 3px;
        }
        .conv-delete {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 12px;
          opacity: 0;
          transition: 0.2s;
        }
        .conversation-item:hover .conv-delete {
          opacity: 1;
        }
        .quick-topics {
          padding: 12px;
          border-top: 1px solid var(--border);
        }
        .qt-title {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .qt-btn {
          width: 100%;
          text-align: right;
          background: rgba(0,212,255,0.04);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-secondary);
          padding: 6px 10px;
          font-size: 12px;
          margin-bottom: 4px;
          cursor: pointer;
          transition: 0.2s;
        }
        .qt-btn:hover {
          background: rgba(0,212,255,0.1);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        /* chat area */
        .chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: transparent;
        }
        .welcome-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px;
          background: var(--bg-glass-strong);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          border: 1px solid var(--border);
        }
        .welcome-icon {
          font-size: 64px;
          margin-bottom: 20px;
          animation: float 3s ease-in-out infinite;
        }
        .welcome-title {
          font-size: 28px;
          font-weight: 900;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-teal));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 12px;
        }
        .welcome-subtitle {
          font-size: 15px;
          color: var(--text-secondary);
          max-width: 480px;
          margin-bottom: 32px;
        }
        .example-questions {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          max-width: 520px;
          width: 100%;
        }
        .example-q {
          background: rgba(0,212,255,0.06);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: 0.25s;
        }
        .example-q:hover {
          background: rgba(0,212,255,0.15);
          border-color: var(--accent-cyan);
          transform: translateY(-2px);
        }
        .message {
          display: flex;
          gap: 12px;
          animation: slideUp 0.3s ease;
        }
        .message.user {
          flex-direction: row-reverse;
        }
        .msg-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .message.user .msg-avatar {
          background: linear-gradient(135deg, #1a2f5e, #0f1e42);
          border: 1px solid rgba(0,212,255,0.3);
        }
        .message.bot .msg-avatar {
          background: linear-gradient(135deg, #0d1f3c, #091529);
          border: 1px solid rgba(0,212,255,0.2);
          box-shadow: 0 0 12px var(--accent-glow);
        }
        .msg-content {
          flex: 1;
          max-width: 75%;
        }
        .message.user .msg-content {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .msg-bubble {
          padding: 12px 16px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.65;
          backdrop-filter: blur(8px);
        }
        .message.user .msg-bubble {
          background: linear-gradient(135deg, #1a2f5e, #0f1e42);
          border: 1px solid rgba(0,212,255,0.3);
          border-radius: 14px 4px 14px 14px;
        }
        .message.bot .msg-bubble {
          background: rgba(10, 20, 35, 0.75);
          border: 1px solid var(--border);
          border-radius: 4px 14px 14px 14px;
        }
        .msg-meta {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .message.user .msg-meta {
          flex-direction: row-reverse;
        }
        .copy-btn {
          background: rgba(0,212,255,0.06);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-muted);
          padding: 3px 8px;
          font-size: 11px;
          cursor: pointer;
          transition: 0.2s;
        }
        .copy-btn:hover {
          background: rgba(0,212,255,0.12);
          color: var(--accent-cyan);
        }
        .typing-indicator {
          display: flex;
          gap: 6px;
          align-items: center;
          padding: 10px 14px;
          background: rgba(10, 20, 35, 0.75);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          width: fit-content;
          border: 1px solid var(--border);
        }
        .typing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-cyan);
          animation: typingAnim 1.4s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        .input-area {
          padding: 16px 24px 20px;
          background: transparent;
          border-top: 1px solid var(--border);
        }
        .input-wrapper {
          background: var(--bg-glass);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: 0.25s;
        }
        .input-wrapper:focus-within {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 3px rgba(0,212,255,0.1);
        }
        .input-row {
          display: flex;
          align-items: flex-end;
        }
        #userInput {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: 'Cairo', sans-serif;
          font-size: 15px;
          padding: 12px 16px;
          resize: none;
          min-height: 52px;
          max-height: 140px;
        }
        .send-btn {
          background: linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,201,167,0.15));
          border: none;
          color: var(--accent-cyan);
          width: 52px;
          height: 52px;
          cursor: pointer;
          font-size: 20px;
          border-radius: 0 14px 14px 0;
          transition: 0.2s;
        }
        .send-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(0,212,255,0.4), rgba(0,201,167,0.3));
          box-shadow: 0 0 12px rgba(0,212,255,0.4);
        }
        .send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .input-footer {
          display: flex;
          justify-content: space-between;
          padding: 6px 14px 8px;
          border-top: 1px solid rgba(0,212,255,0.1);
          font-size: 11px;
          color: var(--text-muted);
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }
        .modal-content {
          background: var(--bg-glass-strong);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0,212,255,0.4);
          border-radius: 24px;
          padding: 24px;
          width: 320px;
          text-align: center;
        }
        .modal-content input {
          width: 100%;
          background: rgba(0,212,255,0.08);
          border: 1px solid var(--border);
          border-radius: 40px;
          padding: 10px 16px;
          margin: 16px 0;
          color: white;
          direction: ltr;
        }
        .modal-content button {
          background: var(--accent-cyan);
          border: none;
          padding: 8px 24px;
          border-radius: 40px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.2s;
        }
        .modal-content button:hover {
          background: #00e4ff;
          box-shadow: 0 0 15px var(--accent-cyan);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingAnim {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 768px) {
          .chatbot-sidebar { width: 240px; }
          .msg-content { max-width: 85%; }
        }
        @media (max-width: 600px) {
          .chatbot-main { flex-direction: column; }
          .chatbot-sidebar { width: 100%; height: 40%; max-height: 300px; }
        }
      `}</style>
    </div>
  );
}