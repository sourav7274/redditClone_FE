// Sidebar.jsx
import { Link } from "react-router-dom";
import { userSlice } from "../features/userSlice";

const Sidebar = ({user}) => {
  return (
    <div
      style={{ width: "350px" }}
      className="bg-redditBlack text-white p-4"
    >
      <nav className="flex min-w-[200px] flex-col gap-1 p-2 text-base text-gray-300">
        <Link to={`/user/${user._id}`} className="p-3 hover:bg-gray-700 cursor-pointer rounded">Home</Link>
        <Link to="/inbox" className="p-3 hover:bg-gray-700 cursor-pointer rounded">Inbox</Link>
        <Link to={`/userDetails/${user._id}`} className="p-3 hover:bg-gray-700 cursor-pointer rounded">Profile</Link>
        <Link title="Not Implemented yet" className="p-3 hover:bg-gray-700 cursor-pointer rounded">Settings</Link>
        <Link to="/" className="p-3 hover:bg-gray-700 cursor-pointer rounded">
          Log Out
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
