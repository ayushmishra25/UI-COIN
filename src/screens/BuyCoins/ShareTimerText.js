import { useState, useEffect } from "react";

const ShareTimerText = ({ initialTime, postClaim, mailFeature }) => {
  const parseTime = (timeStr) => {
    const daysMatch = timeStr?.match(/(\d+)\s*days/); // Extract days
    const days = daysMatch ? parseInt(daysMatch[1], 10) : 0;

    const timeParts = timeStr?.split("days")[1]?.trim().split(":").map(Number); // Extract HH:MM:SS
    const [hours, minutes, seconds] = timeParts || [0, 0, 0];

    return days * 86400 + hours * 3600 + minutes * 60 + seconds; // Convert to total seconds
  };

  const formatTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return days > 0 ? `${days} days ${timeString}` : timeString; // Hide "0 days"
  };

  const [timeLeft, setTimeLeft] = useState(parseTime(initialTime));

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <span>
      {postClaim
        ? `Available in ${formatTime(timeLeft)}`
        : mailFeature
        ? "Claim Now"
        : "Share"}
    </span>
  );
};

export default ShareTimerText;
