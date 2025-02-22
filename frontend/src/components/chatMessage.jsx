import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // For Markdown rendering
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // For syntax highlighting
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Code block theme
import { FiCopy, FiCheck } from 'react-icons/fi';

// Custom renderer for ReactMarkdown
const renderers = {
    code: ({ language, value }) => (
        <SyntaxHighlighter language={language || 'plaintext'} style={oneDark}>
            {value}
        </SyntaxHighlighter>
    ),
};

const ChatMessage = ({ messages }) => {
    const [copiedStates, setCopiedStates] = useState({}); // Track copied state for each code block
    const handleCopy = async (code, key) => {
        try {
            if (!document.hasFocus()) {
                console.error('Clipboard action failed: Document is not focused.');
                return;
            }

            await navigator.clipboard.writeText(code);

            // Set copied state for the specific code block
            setCopiedStates((prev) => ({ ...prev, [key]: true }));

            // Reset copy state after 2 seconds for only this block
            setTimeout(() => {
                setCopiedStates((prev) => ({ ...prev, [key]: false }));
            }, 1000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };


    const parseContent = (content, key) => {
        return (
            <ReactMarkdown
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const code = String(children).replace(/\n$/, ''); // Extract the code block content
                        return !inline ? (
                            <div className='relative'>
                                <SyntaxHighlighter
                                    style={oneDark}
                                    language={match?.[1] || 'plaintext'}
                                    PreTag="div"
                                    {...props}
                                    className='relative'
                                >
                                    {code}
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                                <button className='absolute top-3 right-2 bg-gray-300 hover:bg-gray-400 text-black text-center px-2 py-2 rounded-md text-sm flex justify-center items-center'
                                    onClick={() => handleCopy(code, key)}>
                                    {copiedStates[key] ? (
                                        <>
                                            <FiCheck size={16} />
                                        </>
                                    ) : (
                                        <>
                                            <FiCopy size={16} />
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        );
    };

    return (
        <div className="chat-messages flex flex-col pl-4 pr-[2px]">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`mb-4 md:p-3 p-3 rounded-md md:rounded-lg text-justify ${message.role === 'user'
                            ? 'bg-gray-500 text-white self-end max-w-[65%]'
                            : 'text-black self-start w-full'
                        }`}
                >
                    {/* Render content with Markdown and Code block support */}
                    {parseContent(message.content, `${index}`)}
                </div>
            ))}
        </div>
    );
};

export default ChatMessage;
