import "./Topbar.css";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <div className="topbar">

      <div>
        <h2>Welcome Back 👋</h2>
        <p>Track your sustainability journey.</p>
      </div>

      <div className="topbar-right">

        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <FaBell className="icon" />

        <FaUserCircle className="profile" />

      </div>

    </div>
  );
}

export default Topbar;