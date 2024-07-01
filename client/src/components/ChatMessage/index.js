import React from "react";
import ProfileAvatar from "../../assets/images/profile-avatar.png";

const ChatMessage = ({ chat, userId, currentUser }) => {
  return (
    <div
      className={`p-1 my-1 flex ${
        chat.from._id === userId ? "justify-end " : "justify-start"
      }`}
    >
      {chat.to._id === userId && (
        <img
          src={chat.from.profilePic || ProfileAvatar}
          alt="avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      <div className="flex flex-col max-w-xs">
        <div
          className={`inline-block p-2 rounded-lg ${
            chat.from._id === userId
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {chat.content}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {new Date(parseInt(chat.createdAt)).toLocaleString()}
        </div>
      </div>
      {chat.from._id === userId && (
        <img
          src={currentUser.profilePic || ProfileAvatar}
          alt="avatar"
          className="w-8 h-8 rounded-full ml-2"
        />
      )}
    </div>
  );
};

export default ChatMessage;
