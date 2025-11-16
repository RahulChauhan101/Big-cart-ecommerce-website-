import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import ProfileUpdate from "./ProfileUpdate";

const Auth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        navigate("/");
      }
    });
  }, [navigate]);

  const uploadAvatar = async (file, userId) => {
    const ext = file.name.split(".").pop();
    const fileName = `${userId}.${ext}`;
    const filePath = `avatars/${fileName}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setUser(data.user);
        navigate("/");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        let avatarUrl = "";

        if (avatarFile && data.user) {
          avatarUrl = await uploadAvatar(avatarFile, data.user.id);
        }

        if (data.user) {
          await supabase.from("profiles").insert([
            {
              user_id: data.user.id,
              full_name: fullName,
              avatar_url: avatarUrl,
            },
          ]);

          setUser(data.user);
        }

        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start gap-6 min-h-screen bg-gray-100 p-6">

      {/* LOGIN / SIGNUP FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-80">
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
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              className="w-full mb-4"
            />
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        {errorMsg && <p className="text-red-500 mb-4 text-center">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 ml-1 underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>

      {/* PROFILE UPDATE ONLY IF LOGGED IN */}
      {user && <ProfileUpdate user={user} />}
    </div>
  );
};

export default Auth;
