import React, {
  useEffect,
  useState,
} from "react";

import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { getData } from "../utils/storage";

import {
  FaBolt,
  FaTint,
  FaGasPump,
  FaRecycle,
  FaLeaf,
} from "react-icons/fa";


function Analytics() {

  const [data, setData] =
    useState([]);


  useEffect(() => {

    const savedData =
      getData();

    setData(savedData);

  }, []);


  const totalElectricity =
    data.reduce(
      (sum, item) =>
        sum +
        Number(item.electricity || 0),
      0
    );


  const totalWater =
    data.reduce(
      (sum, item) =>
        sum +
        Number(item.water || 0),
      0
    );


  const totalFuel =
    data.reduce(
      (sum, item) =>
        sum +
        Number(item.fuel || 0),
      0
    );


  const totalWaste =
    data.reduce(
      (sum, item) =>
        sum +
        Number(item.waste || 0),
      0
    );


  const totalCarbon =
    data.reduce(
      (sum, item) =>
        sum +
        Number(item.carbon || 0),
      0
    );


  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        <div style={styles.header}>

          <div>

            <p style={styles.overline}>
              YOUR ENVIRONMENTAL DATA
            </p>

            <h1 style={styles.title}>
              Analytics
            </h1>

            <p style={styles.subtitle}>
              Understand your sustainability
              performance.
            </p>

          </div>

          <FaLeaf
            style={styles.headerIcon}
          />

        </div>


        {data.length === 0 ? (

          <div style={styles.empty}>

            <FaLeaf
              style={styles.emptyIcon}
            />

            <h2>
              No Data Available
            </h2>

            <p>
              Go to Dashboard and calculate
              your carbon footprint first.
            </p>

          </div>

        ) : (

          <>

            <div style={styles.grid}>

              <Card
                icon={<FaBolt />}
                title="Electricity"
                value={totalElectricity}
                unit="kWh"
              />

              <Card
                icon={<FaTint />}
                title="Water"
                value={totalWater}
                unit="Litres"
              />

              <Card
                icon={<FaGasPump />}
                title="Fuel"
                value={totalFuel}
                unit="Litres"
              />

              <Card
                icon={<FaRecycle />}
                title="Waste"
                value={totalWaste}
                unit="Kg"
              />

            </div>


            <div style={styles.carbonCard}>

              <FaLeaf
                style={styles.carbonIcon}
              />

              <div>

                <p style={styles.carbonLabel}>
                  TOTAL CARBON FOOTPRINT
                </p>

                <h1>
                  {totalCarbon.toFixed(2)}
                  {" "}kg CO₂
                </h1>

                <p>
                  Total carbon footprint
                  from your saved records.
                </p>

              </div>

            </div>


            <div style={styles.recordsCard}>

              <h2>
                Recent Records
              </h2>

              {data
                .slice()
                .reverse()
                .map((item) => (

                  <div
                    key={item.id}
                    style={styles.row}
                  >

                    <span>
                      {item.date}
                    </span>

                    <span>
                      {item.electricity} kWh
                    </span>

                    <span>
                      {item.water} L
                    </span>

                    <span>
                      {item.fuel} L
                    </span>

                    <span>
                      {item.waste} Kg
                    </span>

                    <strong>
                      {item.carbon} kg
                    </strong>

                  </div>

                ))}

            </div>

          </>

        )}

      </div>

    </div>
  );
}


function Card({
  icon,
  title,
  value,
  unit,
}) {

  return (

    <div style={styles.card}>

      <div style={styles.icon}>
        {icon}
      </div>

      <p style={styles.label}>
        {title}
      </p>

      <h2 style={styles.value}>
        {value.toFixed(2)}
      </h2>

      <span style={styles.unit}>
        {unit}
      </span>

    </div>

  );
}


const styles = {

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },

  overline: {
    color: "#4f9365",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
  },

  title: {
    color: "#173c29",
    fontSize: "30px",
    margin: "5px 0",
  },

  subtitle: {
    color: "#7b857e",
    fontSize: "13px",
  },

  headerIcon: {
    color: "#42955a",
    fontSize: "35px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    gap: "15px",
  },

  card: {
    background: "white",
    borderRadius: "14px",
    padding: "20px",
    boxShadow:
      "0 4px 15px rgba(35,70,45,0.06)",
  },

  icon: {
    color: "#42955a",
    fontSize: "20px",
  },

  label: {
    color: "#7b857e",
    fontSize: "11px",
  },

  value: {
    color: "#173c29",
    margin: 0,
  },

  unit: {
    color: "#9aa49d",
    fontSize: "10px",
  },

  carbonCard: {
    background: "#173c29",
    color: "white",
    borderRadius: "15px",
    padding: "25px",
    marginTop: "20px",
    display: "flex",
    gap: "18px",
    alignItems: "center",
  },

  carbonIcon: {
    color: "#8bd39c",
    fontSize: "35px",
  },

  carbonLabel: {
    color: "#b8cbbb",
    fontSize: "10px",
    letterSpacing: "1px",
  },

  recordsCard: {
    background: "white",
    borderRadius: "15px",
    padding: "20px",
    marginTop: "20px",
  },

  row: {
    display: "grid",
    gridTemplateColumns:
      "1.2fr 1fr 1fr 1fr 1fr 1fr",
    padding: "13px",
    borderBottom:
      "1px solid #edf1ee",
    fontSize: "10px",
    color: "#536158",
  },

  empty: {
    background: "white",
    borderRadius: "15px",
    padding: "60px",
    textAlign: "center",
  },

  emptyIcon: {
    color: "#42955a",
    fontSize: "40px",
  },
};


export default Analytics;