import { useState, useCallback, useRef } from 'react';
import { Message } from '../types';
import { openAIService } from '../../../services/openai';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messageCounterRef = useRef(0);

  const generateMessageId = () => {
    messageCounterRef.current += 1;
    return `msg-${Date.now()}-${messageCounterRef.current}`;
  };

  const sendMessage = useCallback(async (content: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Adiciona mensagem do usuário
      const userMessageId = generateMessageId();
      setMessages(prev => [...prev, {
        id: userMessageId,
        type: 'user',
        content,
        timestamp: new Date()
      }]);

      const response = await openAIService.sendMessage(content);
      console.log('Response from OpenAI:', response);
      
      // Tenta fazer o parse da resposta como JSON
      try {
        const jsonResponse = JSON.parse(response);
        console.log('Parsed response:', jsonResponse);
        
        if (jsonResponse.type === 'healthUnits' && Array.isArray(jsonResponse.units)) {
          // Se for uma resposta de unidades de saúde válida, formata adequadamente
          setMessages(prev => [...prev, {
            id: generateMessageId(),
            type: 'bot',
            content: '',
            healthUnits: jsonResponse.units,
            timestamp: new Date()
          }]);
          return;
        }
      } catch (e) {
        // Se não for JSON ou for JSON inválido, continua normalmente
        console.log('Not a JSON response or invalid format:', e);
      }

      // Resposta normal do bot (texto)
      setMessages(prev => [...prev, {
        id: generateMessageId(),
        type: 'bot',
        content: response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?');
      
      // Adiciona mensagem de erro
      setMessages(prev => [...prev, {
        id: generateMessageId(),
        type: 'bot',
        content: 'Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addBotMessage = useCallback((content: string | React.ReactNode) => {
    const botMessageId = generateMessageId();
    setMessages(prev => [...prev, {
      id: botMessageId,
      type: 'bot',
      content,
      timestamp: new Date()
    }]);
  }, []);

  return {
    messages,
    sendMessage,
    addBotMessage,
    isLoading,
    error
  };
}