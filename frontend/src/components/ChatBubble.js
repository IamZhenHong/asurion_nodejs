import React from 'react';
import '../css/ChatBubble.css';

function ChatBubble({ message, isUser }) {
    return (
      <div className={`chat-bubble-container ${isUser ? 'user' : 'assistant'}`}>
        <div className={`chat-bubble ${isUser ? 'user' : 'assistant'}`}>
          <p>{message}</p>
        </div>
      </div>
    );
  }
  
  export default ChatBubble;