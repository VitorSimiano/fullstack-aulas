'use client';
import { useState } from 'react';
import { useChat } from '../../hooks/userchat';

export default function ChatPage() {
  const [username, setUsername] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [text, setText] = useState('');

  const { messages, sendMessage, connected } = useChat(enteredName);

  const handleEnter = () => {
    const name = username.trim();
    if (!name) return;
    setEnteredName(name);
  };

  const handleSend = () => {
    if (text.trim() && enteredName) {
      sendMessage(enteredName, text);
      setText('');
    }
  };

  if (!enteredName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-1">Live Chat</h1>
          <p className="text-slate-400 text-sm mb-6">Campo Real · Entre com seu nome</p>
          <input
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 mb-4 outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500"
            placeholder="Seu nome..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
            maxLength={20}
          />
          <button
            onClick={handleEnter}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Entrar no Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="flex flex-col w-full max-w-2xl h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">

        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800 bg-slate-900">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {enteredName[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-white font-semibold leading-tight">Live Chat Campo Real</h1>
            <p className="text-slate-500 text-xs">Logado como <span className="text-blue-400">{enteredName}</span></p>
          </div>
          <span className={`ml-auto text-xs px-3 py-1 rounded-full font-medium ${connected ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
            {connected ? '● online' : '○ conectando...'}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          {messages.length === 0 && (
            <p className="text-slate-600 text-sm text-center mt-8">Nenhuma mensagem ainda. Diga olá! 👋</p>
          )}

          {messages.map((m: any, i) => {

            if (m.sender === '__system__') {
              return (
                <div key={i} className="flex justify-center">
                  <span className={`text-xs px-3 py-1 rounded-full border ${
                    m._eventType === 'join'
                      ? 'text-emerald-400 bg-emerald-950 border-emerald-900'
                      : 'text-red-400 bg-red-950 border-red-900'
                  }`}>
                    {m._eventType === 'join' ? '✓' : '✕'} {m.message}
                  </span>
                </div>
              );
            }

            const isOwn = m.sender === enteredName;

            return (
              <div key={i} className={`flex flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'}`}>
                {!isOwn && (
                  <span className="text-xs text-blue-400 font-semibold px-1">{m.sender}</span>
                )}
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isOwn
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-slate-800 text-slate-100 rounded-bl-sm'
                }`}>
                  {m.message || m.text}
                </div>
                <span className="text-[11px] text-slate-600 px-1">
                  {isOwn ? 'Você' : m.sender}
                  {m.time ? ` · ${m.time}` : m.createdAt ? ` · ${new Date(m.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : ''}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-slate-800 bg-slate-900">
          <input
            className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500 text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua mensagem..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-semibold transition-colors text-sm"
          >
            Enviar
          </button>
        </div>

      </div>
    </div>
  );
}