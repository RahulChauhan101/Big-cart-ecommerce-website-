import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // new field
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // 🔹 Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        alert("✅ Logged in successfully!");
        console.log("User session:", data.session);

      } else {
        // 🔹 Signup
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        // Insert a row into the profiles table
        if (data.user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([{ user_id: data.user.id, full_name: fullName }]);

          if (profileError) console.error("Profile insert error:", profileError);
          else console.log("Profile created for user:", data.user.id);
        }

        if (data.user?.confirmation_sent_at) {
          alert(
            "✅ Signup successful! Check your email for verification link."
          );
        } else {
          alert("✅ Signup successful! You can log in now.");
        }

        console.log("New user:", data.user);
      }
    } catch (error) {
      console.error("Auth error:", error.message);
      alert(`⚠️ ${error.message}`);
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
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 ml-1 underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Auth;
