import React, { useEffect, useState } from "react";

import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  getData,
  getGoals,
  saveGoals,
} from "../utils/storage";

import {
  FaBolt,
  FaTint,
  FaGasPump,
  FaRecycle,
  FaLeaf,
  FaBullseye,
} from "react-icons/fa";


function Goals() {
  const [data, setData] = useState([]);

  const [targets, setTargets] = useState({
    electricity: 100,
    water: 1000,
    fuel: 50,
    waste: 20,
    carbon: 100,
  });


  // ==========================================
  // LOAD CURRENT USER DATA
  // ==========================================

  useEffect(() => {
    const savedData = getData();

    setData(savedData);


    const savedGoals = getGoals();

    if (savedGoals) {
      setTargets(savedGoals);
    }
  }, []);


  // ==========================================
  // CALCULATE TOTAL USAGE
  // ==========================================

  const totalElectricity = data.reduce(
    (sum, item) =>
      sum + Number(item.electricity || 0),
    0
  );


  const totalWater = data.reduce(
    (sum, item) =>
      sum + Number(item.water || 0),
    0
  );


  const totalFuel = data.reduce(
    (sum, item) =>
      sum + Number(item.fuel || 0),
    0
  );


  const totalWaste = data.reduce(
    (sum, item) =>
      sum + Number(item.waste || 0),
    0
  );


  const totalCarbon = data.reduce(
    (sum, item) =>
      sum + Number(item.carbon || 0),
    0
  );


  // ==========================================
  // CALCULATE PROGRESS
  // ==========================================

  const calculateProgress = (
    actual,
    target
  ) => {
    if (!target || target <= 0) {
      return 0;
    }

    return Math.min(
      Math.round(
        (actual / target) * 100
      ),
      100
    );
  };


  // ==========================================
  // CHANGE TARGET
  // ==========================================

  const handleTargetChange = (
    name,
    value
  ) => {
    setTargets((previous) => ({
      ...previous,
      [name]: Number(value),
    }));
  };


  // ==========================================
  // SAVE GOALS
  // ==========================================

  const handleSaveGoals = () => {
    saveGoals(targets);

    alert(
      "Goals saved successfully!"
    );
  };


  // ==========================================
  // GOAL DATA
  // ==========================================

  const goals = [
    {
      name: "electricity",
      title: "Reduce Electricity Usage",
      icon: <FaBolt />,
      actual: totalElectricity,
      target: targets.electricity,
      unit: "kWh",
    },

    {
      name: "water",
      title: "Reduce Water Usage",
      icon: <FaTint />,
      actual: totalWater,
      target: targets.water,
      unit: "Litres",
    },

    {
      name: "fuel",
      title: "Reduce Fuel Usage",
      icon: <FaGasPump />,
      actual: totalFuel,
      target: targets.fuel,
      unit: "Litres",
    },

    {
      name: "waste",
      title: "Reduce Waste",
      icon: <FaRecycle />,
      actual: totalWaste,
      target: targets.waste,
      unit: "Kg",
    },

    {
      name: "carbon",
      title: "Reduce Carbon Footprint",
      icon: <FaLeaf />,
      actual: totalCarbon,
      target: targets.carbon,
      unit: "kg CO₂",
    },
  ];


  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="main-content">

        <Topbar />


        {/* =========================
            HEADER
        ========================== */}

        <div style={styles.header}>

          <div>

            <p style={styles.overline}>
              SUSTAINABILITY TARGETS
            </p>

            <h1 style={styles.title}>
              Goals
            </h1>

            <p style={styles.subtitle}>
              Set targets and track your
              environmental progress.
            </p>

          </div>


          <FaBullseye
            style={styles.headerIcon}
          />

        </div>


        {/* =========================
            NO DATA MESSAGE
        ========================== */}

        {data.length === 0 && (

          <div style={styles.warning}>

            <FaLeaf
              style={styles.warningIcon}
            />

            <div>

              <strong
                style={styles.warningTitle}
              >
                No dashboard data available
              </strong>

              <p
                style={styles.warningText}
              >
                Go to Dashboard and calculate
                your carbon footprint first.
                Your goal progress will then
                update automatically.
              </p>

            </div>

          </div>

        )}


        {/* =========================
            GOAL CARDS
        ========================== */}

        <div style={styles.goalGrid}>

          {goals.map((goal) => {

            const progress =
              calculateProgress(
                goal.actual,
                goal.target
              );


            return (

              <div
                key={goal.name}
                style={styles.goalCard}
              >

                {/* Goal heading */}

                <div style={styles.goalTop}>

                  <div
                    style={styles.iconBox}
                  >
                    {goal.icon}
                  </div>


                  <div>

                    <h2
                      style={styles.goalTitle}
                    >
                      {goal.title}
                    </h2>

                    <p
                      style={styles.goalSubtitle}
                    >
                      Target: {goal.target}{" "}
                      {goal.unit}
                    </p>

                  </div>

                </div>


                {/* Current value */}

                <div
                  style={styles.progressInfo}
                >

                  <span>

                    Current:{" "}

                    <strong>
                      {goal.actual.toFixed(2)}{" "}
                      {goal.unit}
                    </strong>

                  </span>


                  <strong>
                    {progress}%
                  </strong>

                </div>


                {/* Progress bar */}

                <div
                  style={
                    styles.progressBackground
                  }
                >

                  <div
                    style={{
                      ...styles.progressBar,
                      width: `${progress}%`,
                    }}
                  />

                </div>


                {/* Status */}

                <p
                  style={styles.progressText}
                >

                  {goal.actual <=
                  goal.target

                    ? "You are within your target."

                    : "Your usage is above the target."}

                </p>


                {/* Target input */}

                <div
                  style={styles.targetBox}
                >

                  <label
                    style={styles.targetLabel}
                  >
                    Set Target
                  </label>


                  <div
                    style={styles.inputWrapper}
                  >

                    <input
                      type="number"
                      min="0"
                      value={goal.target}
                      onChange={(e) =>
                        handleTargetChange(
                          goal.name,
                          e.target.value
                        )
                      }
                      style={styles.input}
                    />


                    <span
                      style={styles.inputUnit}
                    >
                      {goal.unit}
                    </span>

                  </div>

                </div>

              </div>

            );

          })}

        </div>


        {/* =========================
            SAVE BUTTON
        ========================== */}

        <div
          style={styles.saveSection}
        >

          <button
            onClick={handleSaveGoals}
            style={styles.saveButton}
          >

            <FaBullseye />

            Save Goals

          </button>

        </div>


        {/* =========================
            INFORMATION CARD
        ========================== */}

        <div
          style={styles.summaryCard}
        >

          <FaLeaf
            style={styles.summaryIcon}
          />


          <div>

            <h2
              style={styles.summaryTitle}
            >
              Keep Going!
            </h2>

            <p
              style={styles.summaryText}
            >
              Your goals are connected to
              your Dashboard data. When you
              add new sustainability records,
              your progress will update
              automatically.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


// ==========================================
// STYLES
// ==========================================

const styles = {

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


  headerIcon: {
    color: "#42955a",
    fontSize: "35px",
  },


  warning: {
    background: "#fffaf0",
    border: "1px solid #f0e1bc",
    borderRadius: "14px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
    color: "#66552e",
  },


  warningIcon: {
    fontSize: "25px",
    color: "#d19a27",
    flexShrink: 0,
  },


  warningTitle: {
    fontSize: "13px",
  },


  warningText: {
    margin: "5px 0 0",
    fontSize: "11px",
  },


  goalGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "18px",
  },


  goalCard: {
    background: "white",
    borderRadius: "16px",
    padding: "22px",
    boxShadow:
      "0 4px 15px rgba(35, 70, 45, 0.06)",
  },


  goalTop: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "20px",
  },


  iconBox: {
    width: "42px",
    height: "42px",
    borderRadius: "11px",
    background: "#eaf6ed",
    color: "#42955a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },


  goalTitle: {
    margin: 0,
    color: "#173c29",
    fontSize: "15px",
  },


  goalSubtitle: {
    margin: "5px 0 0",
    color: "#8a948d",
    fontSize: "10px",
  },


  progressInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#657169",
    fontSize: "10px",
    marginBottom: "7px",
  },


  progressBackground: {
    width: "100%",
    height: "9px",
    background: "#e9efeb",
    borderRadius: "10px",
    overflow: "hidden",
  },


  progressBar: {
    height: "100%",
    background: "#42955a",
    borderRadius: "10px",
    transition: "width 0.3s ease",
  },


  progressText: {
    color: "#8a948d",
    fontSize: "10px",
    margin: "8px 0 18px",
  },


  targetBox: {
    borderTop: "1px solid #edf1ee",
    paddingTop: "15px",
  },


  targetLabel: {
    color: "#607066",
    fontSize: "10px",
    fontWeight: "600",
  },


  inputWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: "7px",
    border: "1px solid #dfe7e1",
    borderRadius: "8px",
    padding: "0 10px",
  },


  input: {
    border: "none",
    outline: "none",
    width: "100%",
    padding: "9px 0",
    fontSize: "12px",
    color: "#173c29",
    background: "transparent",
  },


  inputUnit: {
    color: "#8a948d",
    fontSize: "10px",
    whiteSpace: "nowrap",
  },


  saveSection: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },


  saveButton: {
    border: "none",
    background: "#2e8b57",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
  },


  summaryCard: {
    marginTop: "20px",
    marginBottom: "30px",
    background: "#173c29",
    color: "white",
    borderRadius: "15px",
    padding: "22px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },


  summaryIcon: {
    fontSize: "30px",
    color: "#8bd39c",
    flexShrink: 0,
  },


  summaryTitle: {
    margin: 0,
    fontSize: "17px",
  },


  summaryText: {
    margin: "5px 0 0",
    color: "#c4d1c7",
    fontSize: "11px",
  },
};


export default Goals;