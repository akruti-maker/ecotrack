import React, { useState } from "react";
import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  FaRobot,
  FaPaperPlane,
  FaLeaf,
} from "react-icons/fa";

function Assistant() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hi! 🌱 I'm EcoBot. I can help you with electricity, water, waste, transportation, carbon footprint and sustainable living.",
    },
  ]);

  const [input, setInput] = useState("");

  const getResponse = (question) => {
    const text = question.toLowerCase();

    if (
      text.includes("electricity") ||
      text.includes("energy")
    ) {
      return "You can save electricity by using LED bulbs, switching off unused appliances, using natural light and avoiding unnecessary standby power. 💡";
    }

    if (
      text.includes("water")
    ) {
      return "To save water, take shorter showers, repair leaking taps, turn off the tap while brushing and reuse water when possible. 💧";
    }

    if (
      text.includes("waste") ||
      text.includes("plastic")
    ) {
      return "Try following the 3Rs — Reduce, Reuse and Recycle. Carry reusable bags and bottles and avoid unnecessary single-use plastic. ♻️";
    }

    if (
      text.includes("carbon") ||
      text.includes("footprint")
    ) {
      return "A carbon footprint is the amount of greenhouse gases produced by our activities. Saving energy, using public transport and reducing waste can help lower it. 🌍";
    }

    if (
      text.includes("transport") ||
      text.includes("travel") ||
      text.includes("car")
    ) {
      return "Walking, cycling, public transport and carpooling can help reduce emissions from transportation. 🚲";
    }

    if (
      text.includes("goal")
    ) {
      return "Start with a small measurable goal, such as reducing electricity usage by 10% this month. Small habits become powerful when you stay consistent. 🎯";
    }

    if (
      text.includes("hello") ||
      text.includes("hi")
    ) {
      return "Hello! 🌿 What sustainability topic would you like to explore?";
    }

    return "I can help you with electricity, water, waste, transportation, carbon footprint and sustainability goals. Try asking me about one of these topics. 🌱";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const question = input.trim();

    const userMessage = {
      sender: "user",
      text: question,
    };

    const botMessage = {
      sender: "bot",
      text: getResponse(question),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const suggestions = [
    "How can I save electricity?",
    "How can I save water?",
    "How can I reduce plastic?",
    "What is carbon footprint?",
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div style={styles.header}>
          <div>
            <p style={styles.overline}>
              SMART SUSTAINABILITY ASSISTANT
            </p>

            <h1 style={styles.title}>
              AI Assistant
            </h1>

            <p style={styles.subtitle}>
              Get simple and practical sustainability advice.
            </p>
          </div>

          <div style={styles.robotIcon}>
            <FaRobot />
          </div>
        </div>

        <div style={styles.chatCard}>
          {/* CHAT HEADER */}

          <div style={styles.chatHeader}>
            <div style={styles.botCircle}>
              <FaRobot />
            </div>

            <div>
              <strong>EcoBot</strong>

              <span>
                Your sustainability assistant
              </span>
            </div>
          </div>

          {/* CHAT */}

          <div style={styles.messages}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    ...styles.message,
                    background:
                      message.sender === "user"
                        ? "#2e8b57"
                        : "white",
                    color:
                      message.sender === "user"
                        ? "white"
                        : "#35433b",
                    borderRadius:
                      message.sender === "user"
                        ? "15px 15px 3px 15px"
                        : "15px 15px 15px 3px",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* INPUT */}

          <div style={styles.inputArea}>
            <input
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask EcoBot something..."
              style={styles.input}
            />

            <button
              onClick={sendMessage}
              style={styles.sendButton}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* SUGGESTIONS */}

        <div style={styles.suggestions}>
          <p>Try asking:</p>

          <div style={styles.suggestionList}>
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => setInput(item)}
                style={styles.suggestion}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.tip}>
          <FaLeaf />

          <span>
            EcoBot provides general sustainability
            suggestions. Use your EcoTrack data to
            understand your personal environmental impact.
          </span>
        </div>
      </div>
    </div>
  );
}

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

  robotIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "#e3f3e7",
    color: "#32854c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },

  chatCard: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow:
      "0 4px 15px rgba(35,70,45,0.06)",
    maxWidth: "900px",
    margin: "0 auto",
  },

  chatHeader: {
    background: "#173c29",
    color: "white",
    padding: "18px 22px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  botCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#3e8e58",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  message: {
    maxWidth: "72%",
    padding: "12px 15px",
    fontSize: "12px",
    lineHeight: "1.6",
    boxShadow:
      "0 2px 7px rgba(0,0,0,0.04)",
  },

  messages: {
    height: "410px",
    overflowY: "auto",
    padding: "22px",
    background: "#f7faf8",
  },

  inputArea: {
    padding: "15px",
    display: "flex",
    gap: "10px",
    borderTop: "1px solid #edf1ee",
  },

  input: {
    flex: 1,
    padding: "13px",
    border: "1px solid #dbe5de",
    borderRadius: "9px",
    outline: "none",
    fontSize: "12px",
  },

  sendButton: {
    width: "46px",
    border: "none",
    borderRadius: "9px",
    background: "#2e8b57",
    color: "white",
    cursor: "pointer",
  },

  suggestions: {
    maxWidth: "900px",
    margin: "18px auto",
  },

  suggestionList: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  suggestion: {
    border: "1px solid #cfe1d4",
    background: "#f5faf6",
    color: "#347148",
    borderRadius: "20px",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "11px",
  },

  tip: {
    maxWidth: "900px",
    margin: "15px auto",
    background: "#edf7ef",
    color: "#467352",
    borderRadius: "10px",
    padding: "12px",
    display: "flex",
    gap: "9px",
    fontSize: "11px",
  },
};

export default Assistant;