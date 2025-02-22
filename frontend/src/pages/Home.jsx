import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import { FiLoader, FiSend } from 'react-icons/fi';
import axios from 'axios';
import ChatMessage from '../components/chatMessage';

const Home = () => {
    const navigate = useNavigate();
    const [activeChat, setActiveChat] = useState('1'); // Default active chat
    const [messages, setMessages] = useState([]); // Chat messages
    const [input, setInput] = useState(''); // User input
    const [loading, setLoading] = useState(false); // Loading state for API request

    const [chats, setChats] = useState([
        { id: '1', title: 'Chat 1' },
    ]);

    // Handle new chat creation
    const handleNewChat = () => {
        const newChat = {
            id: `${Date.now()}`,
            title: `New Chat ${chats.length + 1}`,
        };
        setChats([...chats, newChat]);
        setActiveChat(newChat.id);
        setMessages([]); // Clear messages for new chat
    };

    const handleDeleteChat = (chatId) => {
        setChats(chats.filter((chat) => chat.id !== chatId));
        if (activeChat === chatId) {
            setActiveChat(null); // Clear active chat if it was deleted
        }
    };

    // Handle chat selection
    const handleSelectChat = (chatId) => {
        setActiveChat(chatId);
        setMessages([]);
    };

    // Handle sending a message
    const handleSendMessage = async () => {
        if (!input.trim()) return; // Prevent sending empty messages

        // Add user message to the chat
        const userMessage = { role: 'user', content: input.trim() };
        setMessages([...messages, userMessage]);
        setInput('');
        console.log("Sending Message...");

        // Call the backend API
        try {
            console.log(userMessage);
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/chats/chat', {
                messages: [...messages, userMessage], // Chat history
            });

            const aiMessage = { role: 'assistant', content: response.data.message };
            setMessages((prevMessages) => [...prevMessages, aiMessage]); // Add AI response to chat
            setLoading(false);
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error);
            toast.error('Failed to get a response. Please try again.', {
                position: 'top-center',
                duration: 2000,
            });
            setLoading(false);
        }
    };

    //Logout
    const handleLogout = () => {
        toast.success('Logout Successful', {
            position: "top-right",
            duration: 1200,
        });
        // Clear the auth token from localStorage
        localStorage.removeItem('authToken');
        // Redirect to the Login page
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="relative w-full top-[61px] flex">
            {/* Sidebar */}
            <Sidebar
                chats={chats}
                onNewChat={handleNewChat}
                onSelectChat={handleSelectChat}
                onDeleteChat={handleDeleteChat}
                onLogout={handleLogout}
            />

            {/* Chat Messages */}
            <div className="flex-grow w-full md:px-[290px] px-5 overflow-y-auto py-4 h-[83vh] mx-auto flex flex-col">
                <ChatMessage messages={messages} />
                {loading && (
                    <div className="mb-4 p-3 rounded-lg bg-white text-black self-start">
                        Typing...
                    </div>
                )}
            </div>

            {/* Chat Input */}
            <div className="fixed bottom-0 py-4 px-5 md:px-0 w-full md:w-[60%] left-[50%] translate-x-[-50%] bg-white border-t">
                <div className="flex items-center">
                    <textarea
                        className="flex-grow border-2 max-h-64 rounded-lg text-justify p-2 pr-16 outline-none break-words resize-none"
                        placeholder="Message Promptly"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault(); // Prevent default newline behavior
                                if (!loading) {
                                    handleSendMessage();
                                }
                            } else if (e.key === 'Enter' && e.shiftKey) { }
                        }}
                        onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scrollHeight
                        }}>
                    </textarea>
                    <div className='absolute right-12 md:right-6 flex items-center justify-center bg-gray-600 text-white rounded-md bottom-8 text-xl p-2 cursor-pointer'
                        onClick={handleSendMessage}
                        disabled={loading}>
                        {loading ? <FiLoader /> : <FiSend />}
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Home;