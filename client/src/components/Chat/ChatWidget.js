import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from '@heroicons/react/24/solid';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[9998]">
      {/* Chat Window */}
      {isOpen && <ChatWindow closeChat={() => setIsOpen(false)} />}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <XMarkIcon className="h-8 w-8" />
        ) : (
          <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
