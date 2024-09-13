import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaCopy, FaPaperPlane } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const [greetingSent, setGreetingSent] = useState(false);

  useEffect(() => {
    if (isModalOpen && !greetingSent) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Hello! How can I assist you today?", user: false },
      ]);
      setGreetingSent(true);
    }
  }, [isModalOpen, greetingSent]);

  useEffect(() => {
    if (isModalOpen) {
      setAnimateModal(true);
    }
  }, [isModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input.trim();
    const wordLimitRegex = /\bmax\sword\s\d+\b/;
    if (!userMessage || !wordLimitRegex.test(userMessage)) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Please enter your blog content followed by a maximum word limit, e.g., 'Content for blog max word 300'.", user: false }
      ]);
      setInput("");
      return;
    }

    setMessages(prevMessages => [...prevMessages, { text: userMessage, user: true }]);
    setInput("");
    setIsLoading(true);

    try {
      const initialResponse = await axios.post("/api/chat", { prompt: userMessage, clearContext: false });
      const botResponse = initialResponse.data.message;

      const formatPrompt = `
      Generate a blog post based on the following user input. Ensure that:
      - The blog post is well-structured and engaging.
      - Use a clear and concise writing style appropriate for a blog audience.
      - Provide a catchy title for the blog post.
      - Include an introduction that hooks the reader.
     - Structure the content into logical sections with headings (e.g., Introduction, Main Content, Conclusion).
    - Apply Tailwind CSS utility classes for all HTML elements to ensure a visually appealing layout. Examples:
    - Use <h1 class="font-bold text-4xl text-center mb-4"> for titles.
    - Use <h2 class="font-semibold text-2xl mt-6 mb-3"> for section headings.
    - Use <p class="text-lg leading-relaxed mb-4"> for paragraph content.
    - Use <ul class="list-disc ml-6"> and <li class="text-lg mb-2"> for lists.
    - Ensure all content is relevant to the user's input and adheres to the word limit.
    - Return the formatted blog post in HTML.   - Avoid any disclaimers or extraneous statements.
        - Ensure the blog post content is relevant to the input and formatted as HTML.
      - Adhere to a maximum word limit based on the user input. Provide a short and concise blog post.
    
      Response:
      ${botResponse}
    `;

      const htmlResponse = await axios.post("/api/chat", { prompt: formatPrompt, clearContext: false });
      const formattedHtml = htmlResponse.data.message;

      setMessages(prevMessages => [...prevMessages, { text: formattedHtml, user: false }]);
    } catch (error) {
      console.error("Error processing chatbot response:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "<div style='font-size: 16px; font-family: sans-serif;'>There was an error processing your request. Please try again later.</div>", user: false }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearContext = async () => {
    try {
      await axios.post("/api/chat/clear-context");
      setMessages([]);
      setGreetingSent(false);
      setMessages((prevMessages) => [
        { text: "Hello! How can I assist you today?", user: false },
      ]);
    } catch (error) {
      console.error("Error clearing chatbot context:", error);
    }
  };

  const copyToClipboard = (html) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const text = tempElement.textContent || tempElement.innerText || '';

    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch(() => {
      toast.error("Failed to copy!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  return (
    <>
      <button
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full text-3xl shadow-md transition-colors duration-300 hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        💬
      </button>

      {isModalOpen && (
        <div
          style={{
            transform: animateModal ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
          }}
          onAnimationEnd={() => setAnimateModal(false)}
        >
          <div className="bg-blue-500 text-white p-4 text-xl font-bold text-center border-t border-blue-600 flex flex-col sm:flex-row relative fixed top-0 left-0 w-full z-50">
            <button
              className="absolute top-4 left-4 text-gray-200 hover:text-red-600 text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="flex-grow">Blog Generator</h2>
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col relative pt-16">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 p-3 rounded-lg max-w-[80%] ${msg.user ? "bg-green-100 self-end text-right text-black" : "bg-gray-100 self-start text-left text-black"}`}>
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                {!msg.user && (
                  <button
                    className="mt-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                    onClick={() => copyToClipboard(msg.text)}
                  >
                    <FaCopy className="text-xl" />
                  </button>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center items-center my-2">
                <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce mx-1"></div>
                <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce mx-1"></div>
                <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce mx-1"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="sticky bottom-0 left-0 w-full flex border-t border-gray-300 bg-gray-100 p-3 flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-grow px-2 py-1 border border-gray-300 rounded-lg text-lg text-black resize-none"
              rows="3"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full transition-colors duration-300 hover:bg-blue-600"
            >
              <FaPaperPlane className="text-xl" />
            </button>
          </form>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Chatbot;
