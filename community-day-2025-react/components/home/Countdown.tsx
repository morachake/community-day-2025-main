"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-07-04T07:00:00+03:00").getTime();

function pad(n: number) {
  return n < 10 ? "0" + n : String(n);
}

function getTimeLeft() {
  const distance = EVENT_DATE - Date.now();
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    over: false,
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown-component">
      <div className="countdown-container">
        <div className="countdown-header">
          <h3>Event Countdown</h3>
        </div>
        <div className="countdown-timer">
          <div className="countdown-item">
            <div className="countdown-value" id="days">{pad(time.days)}</div>
            <div className="countdown-label">Days</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <div className="countdown-value" id="hours">{pad(time.hours)}</div>
            <div className="countdown-label">Hours</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <div className="countdown-value" id="minutes">{pad(time.minutes)}</div>
            <div className="countdown-label">Minutes</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <div className="countdown-value" id="seconds">{pad(time.seconds)}</div>
            <div className="countdown-label">Seconds</div>
          </div>
        </div>
        <div className="countdown-action">
          {time.over ? (
            <span className="event-live">Event in Progress</span>
          ) : (
            <a href="#subscribe" className="countdown-button">Get updates</a>
          )}
        </div>
      </div>
    </div>
  );
}
