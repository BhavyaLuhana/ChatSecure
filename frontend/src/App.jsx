import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">ChatSecure</h1>
      <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded mb-2">Login</Link>
      <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded">Register</Link>
      <Link to="/chat" className="bg-purple-500 text-white px-4 py-2 rounded">Go to Chat</Link>
    </div>
  );
};

export default App;


// pQUV9t6xb7E9hnwG -- key
// mongodb+srv://shayamsundarluhana609:pQUV9t6xb7E9hnwG@cluster1.6c8f4az.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1