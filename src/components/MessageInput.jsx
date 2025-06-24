import React, { useRef, useState } from 'react';
import { useChatStore } from "../store/useChatStore.js";
import { ImCross } from "react-icons/im";
import { FaImage } from "react-icons/fa6";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text && !imageFile) {
      toast.error("Please type a message or select an image");
      return;
    }

    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
      <div className="p-4 w-full bg-panel text-main rounded-b-xl">
        {imagePreview && (
            <div className="mb-3 flex items-center gap-2">
              <div className="relative">
                <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border border-muted"
                />
                <button
                    onClick={removeImage}
                    className="p-1 cursor-pointer absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-surface flex items-center justify-center"
                    type="button"
                >
                  <ImCross />
                </button>
              </div>
            </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex-1 flex gap-2">
            <input
                type="text"
                className="w-full input input-bordered rounded-xl sm:input-md bg-surface-light text-main border-surface focus:outline-none"
                value={text}
                placeholder="Type a message..."
                onChange={(e) => setText(e.target.value)}
            />

            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
            />

            <button
                type="button"
                className={`sm:flex btn btn-circle ${
                    imagePreview ? "text-success" : "text-muted"
                }`}
                onClick={() => fileInputRef.current?.click()}
            >
              <FaImage />
            </button>
          </div>

          <button
              type="submit"
              className="btn btn-circle text-main"
              disabled={!text.trim() && !imagePreview}
          >
            <FiSend />
          </button>
        </form>
      </div>
  );
};

export default MessageInput;
