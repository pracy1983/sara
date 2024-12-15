import React from 'react';
import { MessageSquare, X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        <h2 className="font-semibold">SARA - Assistente Virtual SUS</h2>
      </div>
      <button onClick={onClose} className="text-white hover:text-gray-200">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}