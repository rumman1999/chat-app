import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Stack } from "react-bootstrap";
import InputEmoji from "react-input-emoji";
import styled from 'styled-components';
import "../../css/test.css"


// Styled components for the chat box
const ChatContainer = styled(Stack)`
  width: 50%;
  height: 100%;
  background: #2c2c2c; /* Dark background */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background: #1f1f1f; /* Slightly lighter background */
  color: #ffffff;
  padding: 1rem;
  border-bottom: 1px solid #333;
  font-size: 1.2rem;
  font-weight: 600;
`;

const MessagesContainer = styled(Stack)`
  width:auto;
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #2c2c2c; /* Dark background for messages */
  color: #e0e0e0; /* Light text color */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none;  /* Hide scrollbar for Internet Explorer and Edge */
  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
  }
`;

const Message = styled.div`
  background: ${({ isSelf }) => (isSelf ? '#4a4a4a' : '#3c3c3c')}; /* Different color for self and others */
  border-radius: 12px;
  padding: 0.75rem 1rem;
  max-width: 80%; /* Limit the width to 80% of the container */
  margin-bottom: 0.5rem;
  align-self: ${({ isSelf }) => (isSelf ? 'flex-end' : 'flex-start')}; /* Align based on sender */
  position: relative;
  word-wrap: break-word;
  display: inline-block; /* Allows for text wrapping and proper alignment */
`;



// Ensure to use a secure way to handle API keys, such as environment variables

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
console.log(API_KEY,"API_KEY")
const genAI = new GoogleGenerativeAI(API_KEY);

const AIBot = () => {
  const [result, setResult] = useState([{
    message:"Hi This is built by Rumman , lets get started with AI",
    ai:true
  }]);
  const [loading, setLoading] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  const fetchContent = async (textMessage) => {
    if (!textMessage.trim()) return; 
    setResult(prevResult => [
        ...prevResult,
        { message:textMessage, ai: false }
      ]);
      setTextMessage("")
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const res = await model.generateContent(textMessage);
      const response = await res.response;
      const text = await response.text();
      console.log("text",text , result)
      setResult(prevResult => [
        ...prevResult,
        { message: text, ai: true }
      ]);
    } catch (error) {
      console.error('Error generating content:', error);
      setResult('Failed to generate content.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <ChatContainer >
      <ChatHeader>AI Chat Bot</ChatHeader>
      <MessagesContainer gap={3}>
        {result && result.map((message, index) => (
          <Message key={index} isSelf={!message.ai}>
            <span>{message.message}</span>
          </Message>
        ))}
      </MessagesContainer>
      <input type="text" onChange={(e)=>setTextMessage(e.target.value)} value={textMessage} placeholder='ask me something'/>
   
                
        <button className='button' onClick={() => fetchContent(textMessage)}>
          Send
        </button>
    </ChatContainer>
  );
};

export default AIBot

;
