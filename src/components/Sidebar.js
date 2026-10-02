import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

import {
  FaLeaf,
  FaHome,
  FaChartPie,
  FaBullseye,
  FaRobot,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Analytics",
      icon: <FaChartPie />,
      path: "/analytics",
    },
    {
      name: "Goals",
      icon: <FaBullseye />,
      path: "/goals",
    },
    {
      name: "AI Assistant",
      icon: <FaRobot />,
      path: "/assistant",
    },
    {
      name: "Reports",
      icon: <FaFileAlt />,
      path: "/reports",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <aside className="sidebar">

      <div className="logo">

        <FaLeaf className="logo-icon" />

        <div>
          <h2>EcoTrack</h2>
          <p>Sustainability</p>
        </div>

      </div>

      <nav>

        {menu.map((item) => (

          <Link
            key={item.name}
            to={item.path}
            className={
              location.pathname === item.path
                ? "menu-item active"
                : "menu-item"
            }
          >
            {item.icon}

            <span>{item.name}</span>

          </Link>

        ))}

      </nav>

      <Link to="/" className="logout">

        <FaSignOutAlt />

        <span>Logout</span>

      </Link>

    </aside>
  );
}

export default Sidebar;