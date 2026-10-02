import "./StatCards.css";
import {
  FaLeaf,
  FaBolt,
  FaTint,
  FaAward,
} from "react-icons/fa";

function StatCards({
  carbon,
  electricity,
  water
}) {

  const ecoScore = Math.max(
    0,
    Math.min(
      100,
      100 - Number(carbon)
    )
  );

  return (

    <div className="stats">

      <div className="stat-card">

        <FaLeaf className="stat-icon" />

        <h4>Carbon Footprint</h4>

        <h2>{carbon} kg</h2>

      </div>

      <div className="stat-card">

        <FaAward className="stat-icon" />

        <h4>Eco Score</h4>

        <h2>{ecoScore}/100</h2>

      </div>

      <div className="stat-card">

        <FaBolt className="stat-icon" />

        <h4>Electricity</h4>

        <h2>{electricity || 0} kWh</h2>

      </div>

      <div className="stat-card">

        <FaTint className="stat-icon" />

        <h4>Water Usage</h4>

        <h2>{water || 0} L</h2>

      </div>

    </div>

  );
}

export default StatCards;