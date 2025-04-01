import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { 
        email, 
        password 
      });
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      navigate("/chat");
    } catch (error) {
      console.error("Invalid credentials", error.response?.data || error.message);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email*</label>
            <input
              type="email"
              placeholder="courtneyhenry11@gmail.com"
              className="w-full p-3 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password*</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right mt-2">
              <Link to="/forgot-password" className="text-xs text-blue-600">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            LOGIN
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">Register</Link>
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button className="flex items-center justify-center border rounded-lg py-2 px-4 w-full">
            Login with Google
          </button>
          <button className="flex items-center justify-center border rounded-lg py-2 px-4 w-full">
            Login with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;