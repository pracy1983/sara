import React, { useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { useMessages } from './hooks/useMessages';
import { useAudioRecording } from './hooks/useAudioRecording';
import { useHealthUnits } from './hooks/useHealthUnits';
import { HealthUnitDisplay } from './components/HealthUnitDisplay';

export function ChatBot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { messages, sendMessage, addBotMessage, isLoading } = useMessages();
  const { findNearbyUnits } = useHealthUnits();
  const { isRecording, startRecording, stopRecording } = useAudioRecording();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Olá! Sou SARA, sua assistente virtual do SUS. Como posso ajudar você hoje?");
      }, 500);
      setTimeout(() => {
        addBotMessage("Para encontrar a unidade de saúde mais próxima, preciso da sua localização. Use o botão de localização abaixo ou digite seu endereço.");
      }, 1500);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const nearbyUnits = findNearbyUnits(position.coords);
          addBotMessage(<HealthUnitDisplay units={nearbyUnits} />);
        },
        (error) => {
          addBotMessage("Não foi possível obter sua localização. Por favor, digite seu endereço.");
        }
      );
    }
  };

  const handleSubmit = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-96 flex flex-col max-h-[600px] mb-4">
          <ChatHeader onClose={() => setIsOpen(false)} />
          <MessageList messages={messages} messagesEndRef={messagesEndRef} />
          <ChatInput
            onSubmit={handleSubmit}
            onLocationRequest={handleLocationRequest}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            isRecording={isRecording}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}