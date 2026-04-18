import { useState, useEffect } from "react";

const TimerButton = ({ initialTime, isDailyLoginClaim }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if(initialTime){
      let [hours, minutes, seconds] = initialTime?.split(":").map(Number);
      let remainingSeconds = hours * 3600 + minutes * 60 + seconds;
  
      const interval = setInterval(() => {
        if (remainingSeconds <= 0) {
          clearInterval(interval);
          return;
        }
  
        remainingSeconds--;
  
        let remainingHours = Math.floor(remainingSeconds / 3600);
        let remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);
        let remainingSecs = remainingSeconds % 60;
  
        setTimeLeft(
          `${remainingHours.toString().padStart(2, "0")}:${remainingMinutes
            .toString()
            .padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`
        );
      }, 1000);
      return () => clearInterval(interval);
    }

  }, [initialTime]);

  return (
    <span>{isDailyLoginClaim ? `Available in  ${timeLeft}` : "Claim Now"}</span>
  );
};

export default TimerButton;
