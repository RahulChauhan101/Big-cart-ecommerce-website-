import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import ProfileUpdate from "./ProfileUpdate";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null); // For profile image
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Redirect if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/");
    });
  }, [navigate]);

  // Upload avatar to Supabase Storage
  const uploadAvatar = async (file, userId) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data: publicData } = supabase.storage.from("avatars").getPublicUrl(filePath);
    return publicData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    const cleanFullName = fullName.trim();

    if (!cleanEmail || !cleanPassword || (!isLogin && !cleanFullName)) {
      setErrorMsg("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // LOGIN
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });
        if (error) throw error;

        navigate("/");
      } else {
        // SIGNUP
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPassword,
        });

        console.log("Signup data:", data);
        
        if (error) throw error;

        let avatarUrl = "";
        if (avatarFile && data.user) {
          avatarUrl = await uploadAvatar(avatarFile, data.user.id);
        }

        if (data.user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([
              {
                user_id: data.user.id,
                full_name: cleanFullName,
                avatar_url: avatarUrl,
              },
            ]);
          if (profileError) console.error("Profile insert error:", profileError);
        }

        alert("✅ Signup successful! You can now log in.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth error:", err.message);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />

            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700">
                Upload Avatar (optional)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files[0])}
                className="w-full mt-2"
              />
            </label>
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        {errorMsg && <p className="text-red-500 mb-4 text-center">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 ml-1 underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
      <ProfileUpdate/>
    </div>
  );
};

export default Auth;
