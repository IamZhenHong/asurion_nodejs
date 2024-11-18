import React from 'react';
import ChatBubble from './ChatBubble';

const ChatWindow = ({ messages, handleLiveSupport, isLoading }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index}>
          <ChatBubble message={msg.content} isUser={msg.role === 'user'} />
          
          {/* Render the live support button if the message requires it */}
          {msg.requiresLiveSupport && (
            <button
              onClick={handleLiveSupport}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Contact Live Support
            </button>
          )}
        </div>
      ))}

      {/* Show loading spinner while waiting for the response */}
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
