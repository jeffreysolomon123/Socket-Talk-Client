import React from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useChatStore } from '../store/useChatStore.js';
import { ImCross } from "react-icons/im";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
      <div className="bg-surface-light text-main flex justify-between rounded-t-xl border-b border-surface">
        <div className="flex p-3 gap-3">
          <img
              src={selectedUser.profilePic || "/profile-pic.jpg"}
              className="size-10 rounded-full border border-muted p-[0.1rem]"
          />
          <div>
            <h2 className="inter-very-large">{selectedUser.fullName}</h2>

              {onlineUsers.includes(selectedUser._id) ? (
                  <h2 className="inter-large text-xs text-left text-green-600">Online</h2>
              ) : (<h2 className="inter-small text-xs text-muted text-left ">Offline</h2>)}

          </div>
        </div>

        <button onClick={() => setSelectedUser(null)} className="cursor-pointer mr-5 text-muted">
          <ImCross />
        </button>
      </div>
  );
};

export default ChatHeader;
