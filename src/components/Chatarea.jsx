import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import { formatMessageTime } from "../lib/utils.js";
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import { useAuthStore } from "../store/useAuthStore.js";

const Chatarea = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeToMessages
    } = useChatStore();

    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeToMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeToMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex flex-col items-center justify-center text-main">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[85vh] border border-surface rounded-xl bg-panel text-main">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                        ref={messageEndRef}
                    >
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border border-muted">
                                <img
                                    src={
                                        message.senderId === authUser._id
                                            ? authUser.profilePic || "/profile-pic.jpg"
                                            : selectedUser.profilePic || "/profile-pic.jpg"
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>

                        <div className="chat-header mb-1">
                            <time className="text-xs text-muted ml-1">
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>

                        <div className="chat-bubble flex flex-col bg-surface-dark text-main">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-muted">
                <MessageInput />
            </div>
        </div>
    );
};

export default Chatarea;
