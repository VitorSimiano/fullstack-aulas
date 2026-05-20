import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export interface ChatMessage {
  id?: number;
  sender: string;
  message: string;
  time: string;
}

export interface SystemEvent {
  type: 'join' | 'leave';
  message: string;
}

// Socket criado fora do hook para persistir entre renders
let socket: Socket | null = null;

export const useChat = (username: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [events, setEvents] = useState<{ [key: number]: SystemEvent }>({});
  const [connected, setConnected] = useState(false);
  const eventIndexRef = useRef(0);

  useEffect(() => {
    if (!username) return;

    // ✅ FEATURE 1: passa o username ao conectar
    socket = io('http://localhost:3000', {
      query: { username },
    });

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    // ✅ FEATURE 3: recebe histórico do banco ao conectar
    socket.on('chat_history', (history: ChatMessage[]) => {
      setMessages(history);
    });

    // Escuta mensagens vindas do servidor (evento original do projeto)
    socket.on('msgToClient', (newMsg: ChatMessage) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    // ✅ FEATURE 1: escuta entrada de usuário
    socket.on('user_joined', (data: { message: string }) => {
      const idx = eventIndexRef.current++;
      setEvents((prev) => ({ ...prev, [idx]: { type: 'join', message: data.message } }));
      setMessages((prev) => [
        ...prev,
        { sender: '__system__', message: data.message, time: '', _eventType: 'join' } as any,
      ]);
    });

    // ✅ FEATURE 1: escuta saída de usuário
    socket.on('user_left', (data: { message: string }) => {
      setMessages((prev) => [
        ...prev,
        { sender: '__system__', message: data.message, time: '', _eventType: 'leave' } as any,
      ]);
    });

    return () => {
      socket?.off('msgToClient');
      socket?.off('chat_history');
      socket?.off('user_joined');
      socket?.off('user_left');
      socket?.disconnect();
      socket = null;
    };
  }, [username]);

  const sendMessage = (sender: string, message: string) => {
    // mantém o emit original E o novo padrão do gateway
    socket?.emit('msgToServer', { sender, message });
    socket?.emit('send_message', { text: message });
  };

  return { messages, sendMessage, connected };
};