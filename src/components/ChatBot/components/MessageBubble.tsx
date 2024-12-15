import React from 'react';
import { Message } from '../types';
import { HealthUnitDisplay } from './HealthUnitDisplay';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-in`}>
      <div
        className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {message.healthUnits ? (
          <HealthUnitDisplay units={message.healthUnits} />
        ) : (
          message.content
        )}
      </div>
    </div>
  );
}