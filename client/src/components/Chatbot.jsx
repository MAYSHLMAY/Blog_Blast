import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const basicResponses = {
  "what are your hours?": "Our office hours are Monday to Friday, 9 AM to 5 PM.",
  "what is your address?": "We are located at 123 Health Street, Wellness City.",
  "how can I contact support?": "You can contact support via email at support@health.com or call us at (123) 456-7890.",
  // Add more predefined questions and answers here
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isModalOpen) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Hello! How can I assist you today?", user: false },
      ]);
    }
  }, [isModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    const userMessage = input;
    setMessages(prevMessages => [...prevMessages, { text: userMessage, user: true }]);
    setInput("");
    setIsLoading(true); // Start loading animation

    try {
      // Step 1: Retrieve the initial bot response
      const initialResponse = await axios.post("/api/chat", { prompt: userMessage, clearContext: false });
      const botResponse = initialResponse.data.message;

      // Step 2: Format the bot response in HTML
      const formatPrompt = `
      Generate a blog post based on the following user input. Ensure that:
      - The blog post is well-structured and engaging.
      - Use a clear and concise writing style appropriate for a blog audience.
      - Provide a catchy title for the blog post.
      - Include an introduction that hooks the reader.
      - Structure the content into logical sections with headings (e.g., Introduction, Main Content, Conclusion).
      - Apply inline CSS styling directly in the HTML tags to enhance readability (e.g., headings, paragraphs, lists).
      - Avoid any disclaimers or extraneous statements.
      - Ensure the blog post content is relevant to the input and formatted as HTML.
      - Adhere to a maximum word limit based on the user input. Provide a short and concise blog post.
    
      User Input:
      ${userInput}
    `;

      const htmlResponse = await axios.post("/api/chat", { prompt: formatPrompt, clearContext: false });
      const formattedHtml = htmlResponse.data.message;

      setMessages(prevMessages => [...prevMessages, { text: formattedHtml, user: false }]);
    } catch (error) {
      console.error("Error processing chatbot response:", error);
      setMessages(prevMessages => [...prevMessages, { text: "<div style='font-size: 16px; font-family: sans-serif;'>There was an error processing your request. Please try again later.</div>", user: false }]);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  const handleClearContext = async () => {
    try {
      await axios.post("/api/chat/clear-context");
      setMessages([]);
      setMessages((prevMessages) => [
        { text: "Hello! How can I assist you today?", user: false },
      ]);
    } catch (error) {
      console.error("Error clearing chatbot context:", error);
    }
  };

  return (
    <>
      <button
        className="fixed bottom-5 right-5 bg-primary text-white p-2 rounded-full text-3xl shadow-md transition-colors duration-300 hover:bg-secondary"
        onClick={() => setIsModalOpen(true)}
      >
        💬
      </button>

      <div
        className={`fixed top-20 right-0 h-[calc(100%-70px)] w-80 bg-gray-100 rounded-l-lg shadow-lg transform transition-transform duration-300 ${isModalOpen ? "translate-x-0 animate-slideIn" : "translate-x-full"}`}
      >
        <div className="bg-primary text-white p-4 text-xl font-bold text-center border-b border-secondary">
          <button
            className="absolute left-2 text-2xl transition-colors duration-300 hover:text-red-600"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
          <h2>Medical-chatbot</h2>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded text-sm font-medium ml-auto mr-4 hover:bg-red-600"
            onClick={handleClearContext}
          >
            Clear Context
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto flex flex-col">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-3 p-3 rounded-lg max-w-[80%] ${msg.user ? "bg-message-user-bg self-end text-right" : "bg-message-bot-bg self-start text-left"}`}>
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center my-2">
              <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animation-loading mx-1"></div>
              <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animation-loading mx-1"></div>
              <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animation-loading mx-1"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex border-t border-gray-300 bg-gray-100 p-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-lg mr-3 text-lg"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-white rounded-lg text-lg transition-colors duration-300 hover:bg-secondary"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
