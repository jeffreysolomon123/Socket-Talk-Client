import React from 'react'
import { useChatStore } from '../store/useChatStore.js'
import Sidebar from '../components/Sidebar.jsx';
import Chatarea from '../components/Chatarea.jsx';
import NoChatScreen from '../components/NoChatScreen.jsx';
import { SidebarSkeleton } from '../components/SidebarSkeleton.jsx';


const HomePage = () => {
  const { selectedUser, users } = useChatStore();
  return (
        <div className=" m-2 mt-6 sm:mt-3 md:m-5 flex gap-3 justify-center h-[85vh]">
          <div className="">
            {users ? <Sidebar /> : <SidebarSkeleton />}
          </div>
          <div className="w-4xl chat-bg ">
            {selectedUser ? <Chatarea /> : <NoChatScreen />}
          </div>
        </div>
  );
}

export default HomePage