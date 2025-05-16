import React, { useEffect, useState } from "react";
import "./positivityBooth.css";

const PositivityBooth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getTimePeriod = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    return "evening";
  };

  const fetchAffirmation = async () => {
    try {
      const res = await fetch("https://avyrie.github.io/affirmations-api/affirmations.json");
      const data = await res.json();
      return data.affirmations[Math.floor(Math.random() * data.affirmations.length)];
    } catch {
      return "You're doing your best, and that’s enough.";
    }
  };

  const fetchJoke = async () => {
    try {
      const res = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      return data.joke;
    } catch {
      return "Why don't scientists trust atoms? Because they make up everything!";
    }
  };

  const getStretchReminder = () => {
    const reminders = [
      "Time to move! Take a short walk.",
      "Stretch your body and reset your mind. ",
      "Stand up, roll your shoulders, breathe in deeply!",
    ];
    return reminders[Math.floor(Math.random() * reminders.length)];
  };

  const loadMessage = async () => {
    setLoading(true);
    const period = getTimePeriod();
    const msg =
      period === "morning"
        ? await fetchJoke()
        : period === "afternoon"
        ? getStretchReminder()
        : await fetchAffirmation();
    setMessage(msg);
    setLoading(false);
  };

  return (
    <div className="booth-wrapper">
      <div className={`booth-container ${isOpen ? "open" : ""}`}>
        <div className="booth-tab" onClick={() => setIsOpen(!isOpen)}>
          Positivity Booth
        </div>
        <div className="booth-panel">
          <p className="booth-title">“Want a quick moment of positivity?”</p>
          <button onClick={loadMessage} className="booth-button" disabled={loading}>
            {loading ? "Loading..." : "View message"}
          </button>
          <p className="booth-message">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default PositivityBooth;
