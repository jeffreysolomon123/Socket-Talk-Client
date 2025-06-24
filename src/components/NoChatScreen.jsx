import React from 'react'
import { BsChatDots } from "react-icons/bs";

const NoChatScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-5 border border-surface rounded-xl bg-panel text-main p-4 sm:p-8">

            <BsChatDots className="animate-bounce text-4xl text-primary" />

            <h1 className="inter-very-large text-2xl sm:text-3xl">Start a conversation!</h1>

            <h2 className="inter-large w-70 sm:w-1/2 text-center text-muted">
                Select a user from the list or find someone new to begin chatting. Your messages will appear here.
            </h2>
        </div>
    )
}

export default NoChatScreen;
