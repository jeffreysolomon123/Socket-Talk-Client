import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { Link } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image)
    }
  }

  const handleImageSave = async () => {
    setIsSubmitting(true)
    await updateProfile({ profilePic: selectedImage });
    window.location.reload();
    toast.success("Profile picture updated!");
  }

  return (
      <div className="bg-panel text-main flex h-screen justify-center items-center">
        <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
        />

        <div className="bg-surface border border-muted shadow-md pt-13 pb-13 flex flex-col items-center space-y-2 p-7 rounded-md w-90 md:w-lg">
          <h1 className="text-3xl inter-very-large">Profile</h1>
          <h2 className="text-md inter-small mb-6 text-muted">Your profile information</h2>

          <img
              src={
                  selectedImage ||
                  authUser.profilePic ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              }
              alt="Profile"
              className="size-32 rounded-full mb-3 border-4 border-highlight"
          />

          <div className="flex gap-3 items-center justify-center mt-4 mb-5">
            <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
            />

            {selectedImage ? (
                <button onClick={handleImageSave} className="inter-large w-20 h-7 bg-success text-white rounded-lg text-xs btn btn-ghost">
                  {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-md"></span>
                        Saving...
                      </>
                  ) : "Save"}
                </button>
            ) : (
                <label htmlFor="avatar-upload" className="inter-large w-30 h-7 bg-primary text-white btn btn-ghost rounded-md text-xs cursor-pointer">
                  Change image
                </label>
            )}
          </div>

          <div className="flex flex-col w-full">
            <h2 className="inter-small">Full Name</h2>
            <div className="cursor-not-allowed text-sm mt-3 inter-small bg-panel flex items-center border border-muted rounded-lg py-2 px-4">
              <BsPerson className="text-muted" />
              <input
                  type="text"
                  className="pointer-events-none ml-2 outline-none w-full bg-transparent text-main"
                  value={authUser?.fullName}
                  readOnly
              />
            </div>

            <h2 className="mt-5 inter-small">Email</h2>
            <div className="cursor-not-allowed text-sm mt-3 inter-small bg-panel flex items-center border border-muted rounded-lg py-2 px-4">
              <MdOutlineEmail className="text-muted" />
              <input
                  type="text"
                  className="pointer-events-none ml-2 outline-none w-full bg-transparent text-main"
                  value={authUser?.email}
                  readOnly
              />
            </div>
          </div>

          <div className="w-full mt-6">
            <h2 className="inter-large text-lg mb-6">Account information</h2>

            <div className="inter-small flex justify-between">
              <h3 className="text-muted">Member since:</h3>
              <h3 className="text-muted">{authUser.createdAt?.split("T")[0]}</h3>
            </div>

            <hr className="border-muted mt-3 mb-3" />

            <div className="inter-small flex justify-between">
              <h3 className="text-muted">Account status:</h3>
              <h3 className="text-success">Active</h3>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProfilePage;
