import { useEffect, useState } from "react";

export function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s <= 0 ? initialSeconds : s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [initialSeconds]);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}
