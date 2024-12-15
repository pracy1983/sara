import React, { useState } from 'react';
import { Send, Mic, MapPin } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (text: string) => void;
  onLocationRequest: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
  isLoading: boolean;
}

export function ChatInput({ 
  onSubmit, 
  onLocationRequest, 
  onStartRecording, 
  onStopRecording,
  isRecording,
  isLoading
}: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onLocationRequest}
          disabled={isLoading}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50"
          title="Compartilhar localização"
        >
          <MapPin className="w-5 h-5" />
        </button>
        
        <button
          type="button"
          onClick={isRecording ? onStopRecording : onStartRecording}
          disabled={isLoading}
          className={`p-2 rounded-full transition-colors ${
            isRecording 
              ? 'text-red-600 hover:bg-red-50' 
              : 'text-blue-600 hover:bg-blue-50'
          } disabled:opacity-50`}
          title={isRecording ? 'Parar gravação' : 'Gravar mensagem'}
        >
          <Mic className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Digite sua mensagem..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50"
          title="Enviar mensagem"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
}