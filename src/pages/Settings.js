import React, { useState } from "react";
import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  FaUser,
  FaBell,
  FaLeaf,
  FaSave,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  getCurrentUser,
  logoutUser,
} from "../utils/storage";

function Settings() {
  const user = getCurrentUser();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [notifications, setNotifications] =
    useState(true);

  const [saved, setSaved] = useState(false);

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const saveSettings = () => {
    const updatedUser = {
      ...user,
      name: name,
      email: email,
    };

    localStorage.setItem(
      "ecoCurrentUser",
      JSON.stringify(updatedUser)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  // ==========================================
  // CLEAR ECO DATA
  // ==========================================

  const resetData = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all your EcoTrack records?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("ecoData");

    alert(
      "All EcoTrack tracking data has been deleted."
    );
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    logoutUser();

    window.location.href = "/login";
  };

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="main-content">

        <Topbar />

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div style={styles.header}>

          <div>
            <p style={styles.overline}>
              ACCOUNT PREFERENCES
            </p>

            <h1 style={styles.title}>
              Settings
            </h1>

            <p style={styles.subtitle}>
              Manage your EcoTrack account and preferences.
            </p>
          </div>

          <div style={styles.settingsIcon}>
            <FaUser />
          </div>

        </div>


        {/* =====================================
            PROFILE SECTION
        ====================================== */}

        <div style={styles.card}>

          <div style={styles.cardHeader}>

            <div style={styles.icon}>
              <FaUser />
            </div>

            <div>
              <h2 style={styles.cardTitle}>
                Profile
              </h2>

              <p style={styles.cardSubtitle}>
                Update your personal information.
              </p>
            </div>

          </div>


          <div style={styles.formGrid}>

            {/* NAME */}

            <div>
              <label style={styles.label}>
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your name"
                style={styles.input}
              />
            </div>


            {/* EMAIL */}

            <div>
              <label style={styles.label}>
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                style={styles.input}
              />
            </div>

          </div>


          {/* SAVE BUTTON */}

          <button
            onClick={saveSettings}
            style={styles.saveButton}
          >
            <FaSave />

            Save Changes
          </button>


          {/* SUCCESS MESSAGE */}

          {saved && (
            <span style={styles.saved}>
              ✓ Changes saved successfully
            </span>
          )}

        </div>


        {/* =====================================
            NOTIFICATION SECTION
        ====================================== */}

        <div style={styles.card}>

          <div style={styles.cardHeader}>

            <div style={styles.icon}>
              <FaBell />
            </div>

            <div>
              <h2 style={styles.cardTitle}>
                Notifications
              </h2>

              <p style={styles.cardSubtitle}>
                Manage your sustainability reminders.
              </p>
            </div>

          </div>


          <div style={styles.preference}>

            <div>
              <strong style={styles.preferenceTitle}>
                Sustainability reminders
              </strong>

              <p style={styles.preferenceText}>
                Receive reminders to check your
                environmental progress.
              </p>
            </div>


            {/* TOGGLE */}

            <button
              onClick={() =>
                setNotifications(!notifications)
              }
              style={{
                ...styles.toggle,
                backgroundColor: notifications
                  ? "#2e8b57"
                  : "#c7d0ca",
              }}
            >

              <span
                style={{
                  ...styles.toggleCircle,
                  transform: notifications
                    ? "translateX(20px)"
                    : "translateX(0)",
                }}
              />

            </button>

          </div>

        </div>


        {/* =====================================
            DATA MANAGEMENT
        ====================================== */}

        <div style={styles.card}>

          <div style={styles.cardHeader}>

            <div style={styles.icon}>
              <FaLeaf />
            </div>

            <div>
              <h2 style={styles.cardTitle}>
                EcoTrack Data
              </h2>

              <p style={styles.cardSubtitle}>
                Manage your saved sustainability records.
              </p>
            </div>

          </div>


          <div style={styles.dataActions}>

            <div>

              <strong style={styles.preferenceTitle}>
                Clear all tracking data
              </strong>

              <p style={styles.preferenceText}>
                Delete all saved electricity, water,
                fuel and waste records.
              </p>

            </div>


            <button
              onClick={resetData}
              style={styles.deleteButton}
            >
              <FaTrash />

              Clear Data
            </button>

          </div>

        </div>


        {/* =====================================
            LOGOUT SECTION
        ====================================== */}

        <div style={styles.logoutCard}>

          <div>

            <strong style={styles.logoutTitle}>
              Sign out of EcoTrack
            </strong>

            <p style={styles.logoutText}>
              You can sign back in whenever you want.
            </p>

          </div>


          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            <FaSignOutAlt />

            Logout
          </button>

        </div>

      </div>

    </div>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles = {

  // PAGE HEADER

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  overline: {
    color: "#4f9365",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
    margin: 0,
  },

  title: {
    color: "#173c29",
    fontSize: "30px",
    margin: "5px 0",
  },

  subtitle: {
    color: "#7b857e",
    fontSize: "13px",
    margin: 0,
  },

  settingsIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "#e4f3e7",
    color: "#358b51",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },


  // CARD

  card: {
    background: "white",
    borderRadius: "15px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow:
      "0 4px 15px rgba(35,70,45,0.06)",
  },


  // CARD HEADER

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    marginBottom: "22px",
  },

  icon: {
    width: "43px",
    height: "43px",
    borderRadius: "11px",
    background: "#e5f4e8",
    color: "#42955a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },

  cardTitle: {
    color: "#173c29",
    fontSize: "17px",
    margin: 0,
  },

  cardSubtitle: {
    color: "#7f8982",
    fontSize: "11px",
    margin: "4px 0 0",
  },


  // FORM

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
  },

  label: {
    display: "block",
    color: "#66736b",
    fontSize: "11px",
    marginBottom: "7px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #dce5df",
    borderRadius: "8px",
    outline: "none",
    fontSize: "12px",
    background: "white",
  },


  // SAVE BUTTON

  saveButton: {
    marginTop: "20px",
    border: "none",
    background: "#2e8b57",
    color: "white",
    padding: "11px 17px",
    borderRadius: "8px",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "12px",
  },

  saved: {
    color: "#419357",
    fontSize: "11px",
    marginLeft: "12px",
  },


  // NOTIFICATION

  preference: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f7faf8",
    padding: "15px",
    borderRadius: "10px",
  },

  preferenceTitle: {
    color: "#30463a",
    fontSize: "12px",
  },

  preferenceText: {
    color: "#7f8982",
    fontSize: "11px",
    margin: "5px 0 0",
  },


  // TOGGLE

  toggle: {
    width: "45px",
    height: "25px",
    border: "none",
    borderRadius: "20px",
    padding: "3px",
    cursor: "pointer",
    transition: "0.2s",
  },

  toggleCircle: {
    display: "block",
    width: "19px",
    height: "19px",
    background: "white",
    borderRadius: "50%",
    transition: "0.2s",
  },


  // DATA MANAGEMENT

  dataActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff9f8",
    padding: "15px",
    borderRadius: "10px",
    gap: "20px",
  },

  deleteButton: {
    flexShrink: 0,
    border: "none",
    background: "#fff0ee",
    color: "#c75e51",
    padding: "10px 14px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "7px",
    cursor: "pointer",
    fontSize: "11px",
  },


  // LOGOUT

  logoutCard: {
    background: "#173c29",
    color: "white",
    borderRadius: "15px",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  logoutTitle: {
    fontSize: "14px",
  },

  logoutText: {
    color: "#b8cbbb",
    fontSize: "11px",
    margin: "5px 0 0",
  },

  logoutButton: {
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "white",
    padding: "10px 15px",
    borderRadius: "8px",
    display: "flex",
    gap: "7px",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "11px",
  },

};

export default Settings;