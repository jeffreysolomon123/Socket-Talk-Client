import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import { useAuthStore } from '../store/useAuthStore.js';

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div className="overflow-auto overflow-x-hidden h-[85vh] bg-surface-light border border-surface rounded-xl">
            <div className="sticky top-0 bg-surface-light p-5 pb-0">
                <h1 className="inter-large text-lg hidden sm:inline text-main">Contacts</h1>
                <hr className="border-muted w-full mt-3 mb-3 hidden sm:block" />
            </div>

            <div className="sm:ml-4 overflow-auto m-2">
                {users.map((user) => (
                    <div key={user._id} className="mb-3">
                        <button
                            onClick={() => setSelectedUser(user)}
                            className={`cursor-pointer h-14 sm:h-auto flex items-center transition-all hover-highlight w-10 sm:w-[275px] ${
                                selectedUser?._id === user._id ? "border border-highlight bg-highlight" : ""
                            } rounded-lg p-0 sm:p-2`}

                        >
                            <div className="flex">
                                <img
                                    src={user.profilePic || "/profile-pic.jpg"}
                                    alt={user.fullName}
                                    className="size-10 rounded-full border border-muted p-[0.1rem]"
                                />

                                <div className="hidden sm:inline-flex flex-col">
                                    <h2 className="inter-large ml-4 text-main">{user.fullName}</h2>

                                    {onlineUsers.includes(user._id) ? (
                                        <h2 className="inter-small text-xs text-left ml-4 text-success">Online</h2>
                                    ) : (
                                        <h2 className="inter-small text-xs text-left ml-4 text-muted">Offline</h2>
                                    )}
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
