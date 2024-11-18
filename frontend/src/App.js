import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  useEffect(() => {
    fetch('http://localhost:3000/thread')
      .then((res) => res.json())
      .then((data) => setThreadId(data.threadId));
  }, []);

  const handleLiveSupport = () => {
    console.log('Redirecting to live support...');
  };

  const handleSendMessage = async (message) => {
    const newUserMessage = {
      role: 'user',
      content: message,
    };
  
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true); // Start loading animation
  
    try {
      const res = await fetch('http://localhost:3000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, threadId }),
      });
      const data = await res.json();
  
      const newAssistantMessages = data.messages.length > 0
        ? data.messages[0].map((msg) => ({
            role: 'assistant',
            content: msg.text.value,
          }))
        : [];
  
      // Check if any assistant message contains 'live support'
      const containsLiveSupport = newAssistantMessages.some((msg) =>
        msg.content.toLowerCase().includes('live support')
      );
  
      setMessages((prevMessages) => [
        ...prevMessages,
        ...newAssistantMessages.map((msg) => ({
          ...msg,
          requiresLiveSupport: containsLiveSupport, // Add live support flag to the message
        })),
      ]);
  
      setIsLoading(false); // Stop loading animation when response is received
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); // Stop loading animation if an error occurs
    }
  };
  

  return (
    <div className="App">
      <div className="chat-window">
        <ChatWindow
          messages={messages}
          handleLiveSupport={handleLiveSupport}
          isLoading={isLoading} // Pass loading state to ChatWindow
        />
      </div>
      <div className="message-input-container">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
