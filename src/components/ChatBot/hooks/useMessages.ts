import { useState, useCallback } from 'react';
import { Message } from '../types';
import { openAIService } from '../../../services/openai';

let messageCounter = 0;

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback(async (content: string) => {
    messageCounter++;
    setMessages(prev => [...prev, {
      id: `msg-${messageCounter}`,
      type: 'user',
      content,
      timestamp: new Date()
    }]);

    setIsLoading(true);
    try {
      const response = await openAIService.sendMessage(content);
      messageCounter++;
      setMessages(prev => [...prev, {
        id: `msg-${messageCounter}`,
        type: 'bot',
        content: response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error getting response:', error);
      messageCounter++;
      setMessages(prev => [...prev, {
        id: `msg-${messageCounter}`,
        type: 'bot',
        content: 'Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
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
    addBotMessage,
    isLoading
  };
}