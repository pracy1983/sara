import { useState, useCallback } from 'react';
import { Message } from '../types';

let messageCounter = 0;

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback((content: string) => {
    messageCounter++;
    setMessages(prev => [...prev, {
      id: `msg-${messageCounter}`,
      type: 'user',
      content,
      timestamp: new Date()
    }]);
  }, []);

  const addBotMessage = useCallback((content: string | React.ReactNode) => {
    messageCounter++;
    setMessages(prev => [...prev, {
      id: `msg-${messageCounter}`,
      type: 'bot',
      content,
      timestamp: new Date()
    }]);
  }, []);

  return {
    messages,
    addMessage,
    addBotMessage
  };
}