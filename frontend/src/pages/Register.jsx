import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasNumber, setHasNumber] = useState(false);
  const [minLength, setMinLength] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setHasNumber(/\d/.test(value));
    setMinLength(value.length >= 8);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", { 
        username, 
        email, 
        password 
      });
      console.log("Registration successful:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      navigate("/chat");
    } catch (error) {
      console.error("Registration failed", error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Join Now for Success</h1>
        
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name*</label>
            <input
              type="text"
              placeholder="Courtney Henry"
              className="w-full p-3 border rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password*</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border rounded-lg"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <div className="mt-2 text-xs">
              <p>You password need to include:</p>
              <ul className="list-disc list-inside ml-3">
                <li className={hasNumber ? "text-green-500" : "text-gray-500"}>
                  Must contain one number
                </li>
                <li className={minLength ? "text-green-500" : "text-gray-500"}>
                  Min 8 characters
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the <a href="#" className="text-blue-600">Term&Privacy</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            SIGN ME UP!
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">Login</Link>
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button className="flex items-center justify-center border rounded-lg py-2 px-4 w-full">
            Sign Up with Google
          </button>
          <button className="flex items-center justify-center border rounded-lg py-2 px-4 w-full">
            Sign Up with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;