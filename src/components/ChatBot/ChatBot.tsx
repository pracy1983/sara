import React, { useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { useMessages } from './hooks/useMessages';
import { useAudioRecording } from './hooks/useAudioRecording';
import { useHealthUnits } from './hooks/useHealthUnits';

export function ChatBot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { messages, addMessage, addBotMessage } = useMessages();
  const { findNearbyUnits, displayNearbyUnits } = useHealthUnits({ addBotMessage });
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
          displayNearbyUnits(nearbyUnits);
        },
        (error) => {
          addBotMessage("Não foi possível obter sua localização. Por favor, digite seu endereço.");
        }
      );
    }
  };

  const handleSubmit = (text: string) => {
    addMessage(text);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 animate-bounce"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col animate-slide-in">
          <ChatHeader onClose={() => setIsOpen(false)} />
          <MessageList messages={messages} messagesEndRef={messagesEndRef} />
          <ChatInput
            onSubmit={handleSubmit}
            onLocationRequest={handleLocationRequest}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            isRecording={isRecording}
          />
        </div>
      )}
    </>
  );
}