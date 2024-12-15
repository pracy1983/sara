import React, { useState } from 'react';
import { Send, Mic, MapPin } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (text: string) => void;
  onLocationRequest: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
}

export function ChatInput({ 
  onSubmit, 
  onLocationRequest, 
  onStartRecording, 
  onStopRecording,
  isRecording 
}: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onLocationRequest}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Compartilhar localização"
        >
          <MapPin className="w-5 h-5" />
        </button>
        
        <button
          type="button"
          onClick={isRecording ? onStopRecording : onStartRecording}
          className={`p-2 rounded-full transition-colors ${
            isRecording 
              ? 'text-red-600 hover:bg-red-50' 
              : 'text-blue-600 hover:bg-blue-50'
          }`}
          title={isRecording ? 'Parar gravação' : 'Gravar mensagem'}
        >
          <Mic className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}