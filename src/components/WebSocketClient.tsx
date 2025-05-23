import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import './WebSocketClient.css';   

type Message = {
  id: number;          
  title: string;
  content: string;
};

interface StompErrorFrame {
  headers?: {
    message?: string;
  };
  body?: string;
}

export default function WebSocketClient() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    let idCounter = 0; 

    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe('/topic/messages', (msg: any) => {
          try {
            const parsed: Omit<Message, 'id'> = JSON.parse(msg.body);
            const newMessage: Message = { ...parsed, id: idCounter++ };

            setMessages(prev => [...prev, newMessage]);

            setTimeout(() => {
              setMessages(prev => prev.filter(m => m.id !== newMessage.id));
            }, 5000);

          } catch (error) {
            console.error('Error parsing message:', error);
          }
        });
      },
      onStompError: (frame: StompErrorFrame) => {
        console.error('Broker error:', frame.headers?.message);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <div
      className="websocket-client-container"
      aria-live="polite"
      aria-atomic="true"
    >
      {messages.map(msg => (
        <div
          key={msg.id}
          className="notification-card"     
          role="alert"
        >
          <strong>{msg.title}</strong>
          <div>{msg.content}</div>
        </div>
      ))}
    </div>
  );
}
