import { FaUserCircle } from "react-icons/fa";

export const Sidebar = ({ room, setRoom }) => {
  return (
    <div className="w-64 bg-gray-800 p-4 border-r border-gray-700">
      <h2 className="text-lg font-bold mb-6 flex items-center">
        <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
        ChatSecure
      </h2>
      
      <div className="mb-8">
        <h3 className="text-xs uppercase text-gray-400 mb-2">Rooms</h3>
        {["General", "Tech", "Gaming"].map((roomName) => (
          <div
            key={roomName}
            className={`flex items-center p-2 rounded-lg cursor-pointer ${
              room === roomName ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setRoom(roomName)}
          >
            <span className="text-gray-400 mr-2">#</span>
            {roomName}
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xs uppercase text-gray-400 mb-2">Online Now</h3>
        <div className="flex items-center p-2">
          <FaUserCircle className="text-gray-400 mr-2" />
          <span>{username}</span>
        </div>
      </div>
    </div>
  );
};