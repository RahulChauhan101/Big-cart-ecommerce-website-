import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const ProfileUpdate = ({ user }) => {
  const [fullName, setFullName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        setFullName(profile.full_name || "");
        setAvatarUrl(profile.avatar_url || "");
      }
    };

    fetchProfile();
  }, [user]);

  const uploadAvatar = async (file, userId) => {
    const ext = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${ext}`;
    const filePath = `avatars/${fileName}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);

    try {
      let newAvatarUrl = avatarUrl;

      if (avatarFile) {
        newAvatarUrl = await uploadAvatar(avatarFile, user.id);
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          avatar_url: newAvatarUrl,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      setAvatarUrl(newAvatarUrl);
      setAvatarFile(null);

      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      alert("❌ Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-80">
        <h2 className="text-2xl font-semibold text-center mb-6 dark:text-white">
          Update Profile
        </h2>

        <div className="flex justify-center mb-4">
          <img
            src={avatarUrl || "https://via.placeholder.com/120"}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        <label className="block mb-4">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Full Name
          </span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 mt-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Upload New Avatar
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            className="w-full mt-2"
          />
        </label>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
