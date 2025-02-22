import React, { useState, useEffect } from 'react';
import { FiMenu, FiPlus, FiLogOut, FiMoreVertical } from 'react-icons/fi';
import axios from 'axios';

const Sidebar = ({ chats, onNewChat, onSelectChat, onDeleteChat, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(true); // State for sidebar toggle
    const [showMenuFor, setShowMenuFor] = useState(null); // Tracks which chat's menu is open
    const [activeChatId, setActiveChatId] = useState(null); // Track active chat
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("authToken"); // Get JWT token
                if (!token) return; // Ensure user is logged in

                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUser(response.data); // Store user data in state
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, []);

    // Toggle sidebar collapse
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Toggle the options menu for a specific chat
    const toggleMenu = (chatId) => {
        setShowMenuFor((prev) => (prev === chatId ? null : chatId));
    };

    return (
        <div
            className={`${isCollapsed ? 'w-0' : 'md:w-64 w-72 fixed z-40 bg-white'
                } text-black flex flex-col h-[92vh] rounded-r-xl items-start transition-all duration-300 border-r-2 font-mont`}
        >
            {/* Sidebar Toggle Icon */}
            <div className="fixed top-0 md:top-14 flex items-center justify-center z-30 p-4">
                <button
                    onClick={toggleSidebar}
                    className="text-black"
                >
                    <FiMenu size={24} />
                </button>
            </div>

            {/* Render content only when sidebar is not collapsed */}
            {!isCollapsed && (
                <>
                    <div className='w-full p-4 mt-12'>
                        {/* New Chat Button */}
                        <button
                            onClick={onNewChat}
                            className="flex items-center w-full text-gray-700 hover:border-gray-700 hover:text-white font-semibold border-2 p-2 rounded-md hover:bg-gray-700 transition duration-200"
                        >
                            <FiPlus size={20} className="mr-2" />
                            <span>New Chat</span>
                        </button>
                    </div>
                    {/* Top Section */}
                    <div className="w-full flex items-center justify-between p-4">
                        <h1 className="text-lg font-bold">Your Chats</h1>
                    </div>

                    {/* Chat List */}
                    <div className="w-full flex-grow overflow-y-auto">
                        <ul>
                            {chats.map((chat, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        onSelectChat(chat.id);
                                        setActiveChatId(chat.id); // Set active chat
                                    }}
                                    className={`relative py-2 px-4 mx-4 my-2 rounded-lg flex justify-between 
                                hover:bg-gray-600 hover:text-white cursor-pointer transition duration-150 ease-in-out
                                ${activeChatId === chat.id ? "border-2 border-transparent bg-gray-600 text-white" : "border-2 border-gray-600 text-black"}`}
                                >
                                    <div className="truncate">{chat.title}</div>

                                    {/* Three-dot Menu */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering `onSelectChat`
                                            toggleMenu(chat.id);
                                        }}
                                        className={`${activeChatId === chat.id ? "text-white" : "text-black"}`}
                                    >
                                        <FiMoreVertical size={20} />
                                    </button>

                                    {/* Options Menu */}
                                    {showMenuFor === chat.id && (
                                        <div className="absolute right-10 top-1 bg-gray-900 shadow-lg rounded-md text-white w-32 z-10">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent triggering `onSelectChat`
                                                    onDeleteChat(chat.id);
                                                    setShowMenuFor(null);
                                                }}
                                                className="block w-full text-left px-4 py-2 hover:bg-red-600 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Bottom Section */}
                    <div className="w-full p-4 border-t border-gray-300">
                        {/* User Info */}
                        {user && (
                            <div className="mb-2">
                                <p className="text-lg font-semibold font-plaster">{user.name}</p>
                                <p className="text-sm text-gray-400">{user.email}</p>
                            </div>
                        )}

                        {/* Logout Button */}
                        <button
                            onClick={onLogout}
                            className="flex items-center w-full text-red-500 hover:border-red-500 hover:text-white font-semibold border-2 border-red-300 p-2 rounded-md hover:bg-red-500 transition duration-200 mt-2"
                        >
                            <FiLogOut size={20} className="mr-2" />
                            <span className='w-[75%]'>Logout</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
