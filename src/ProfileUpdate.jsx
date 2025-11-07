import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const ProfileUpdate = ({ user }) => {
  const [fullName, setFullName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  // Fetch current profile info
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (profile) {
          setFullName(profile.full_name || "");
          setAvatarUrl(profile.avatar_url || "");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, [user]);

  // Upload avatar
  const uploadAvatar = async (file, userId) => {
    const ext = file.name.split(".").pop();
    const fileName = `${userId}.${ext}`;
    const filePath = `avatars/${fileName}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return publicData.publicUrl;
  };

  // Update profile
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
        .upsert([
          {
            user_id: user.id,
            full_name: fullName,
            avatar_url: newAvatarUrl,
          },
        ]);

      if (error) throw error;

      setAvatarUrl(newAvatarUrl);
      alert("✅ Profile updated successfully!");
      setAvatarFile(null);
    } catch (err) {
      console.error("Profile update error:", err);
      alert("❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-80">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Update Profile
        </h2>

        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
        )}

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Full Name</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 mt-2 border rounded"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
