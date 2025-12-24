// app/hooks/useMounted.js
import { useState, useEffect } from "react";

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wrapping in a frame request moves the update 
    // to the next "tick," satisfying the linter.
    let frameId = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  return mounted;
}