import { useState, useEffect } from "react";
import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCards from "../components/StatCards";

import {
  saveData,
  getData,
} from "../utils/storage";

import {
  FaLeaf,
  FaBolt,
  FaTint,
  FaRecycle,
  FaGasPump,
} from "react-icons/fa";

function Dashboard() {
  const [electricity, setElectricity] =
    useState("");

  const [water, setWater] =
    useState("");

  const [fuel, setFuel] =
    useState("");

  const [waste, setWaste] =
    useState("");

  const [carbon, setCarbon] =
    useState(0);


  // Load current user's latest data
  useEffect(() => {
    const data = getData();

    if (data.length > 0) {
      const latest =
        data[data.length - 1];

      setElectricity(
        latest.electricity || ""
      );

      setWater(
        latest.water || ""
      );

      setFuel(
        latest.fuel || ""
      );

      setWaste(
        latest.waste || ""
      );

      setCarbon(
        latest.carbon || 0
      );
    }
  }, []);


  const calculateCarbon = () => {
    const electricityValue =
      Number(electricity) || 0;

    const waterValue =
      Number(water) || 0;

    const fuelValue =
      Number(fuel) || 0;

    const wasteValue =
      Number(waste) || 0;


    const total =
      electricityValue * 0.85 +
      waterValue * 0.001 +
      fuelValue * 2.31 +
      wasteValue * 0.45;


    const carbonValue =
      Number(total.toFixed(2));


    setCarbon(carbonValue);


    const newRecord = {
      id: Date.now(),

      date:
        new Date().toLocaleDateString(),

      electricity:
        electricityValue,

      water:
        waterValue,

      fuel:
        fuelValue,

      waste:
        wasteValue,

      carbon:
        carbonValue,
    };


    // Get ONLY current user's data
    const oldData = getData();


    // Save ONLY current user's data
    saveData([
      ...oldData,
      newRecord,
    ]);
  };


  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        <StatCards
          carbon={carbon}
          electricity={electricity}
          water={water}
        />


        <div className="dashboard-grid">

          {/* INPUT CARD */}

          <div className="input-card">

            <h2>
              Resource Tracker
            </h2>


            <div className="input-box">

              <FaBolt />

              <input
                type="number"
                placeholder="Electricity (kWh)"
                value={electricity}
                onChange={(e) =>
                  setElectricity(
                    e.target.value
                  )
                }
              />

            </div>


            <div className="input-box">

              <FaTint />

              <input
                type="number"
                placeholder="Water (Litres)"
                value={water}
                onChange={(e) =>
                  setWater(
                    e.target.value
                  )
                }
              />

            </div>


            <div className="input-box">

              <FaGasPump />

              <input
                type="number"
                placeholder="Fuel (Litres)"
                value={fuel}
                onChange={(e) =>
                  setFuel(
                    e.target.value
                  )
                }
              />

            </div>


            <div className="input-box">

              <FaRecycle />

              <input
                type="number"
                placeholder="Waste (Kg)"
                value={waste}
                onChange={(e) =>
                  setWaste(
                    e.target.value
                  )
                }
              />

            </div>


            <button
              onClick={calculateCarbon}
            >
              Calculate Carbon Footprint
            </button>

          </div>


          {/* RESULT CARD */}

          <div className="result-card">

            <FaLeaf className="leaf" />

            <h2>
              Your Carbon Footprint
            </h2>

            <h1>
              {carbon} kg CO₂
            </h1>

            <p>
              Track your daily consumption
              and make eco-friendly choices
              to reduce your carbon footprint.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;