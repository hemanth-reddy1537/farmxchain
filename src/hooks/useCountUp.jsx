import { useEffect, useState } from "react";

export const useCountUp = (target, duration = 600) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === undefined || target === null) return;

    let current = 0;
    const step = Math.max(1, Math.floor(target / (duration / 16)));

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [target, duration]); // ✅ fixed warning

  return count;
};
