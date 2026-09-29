import React, { useState, useEffect, useRef } from 'react';

const TypewriterText = ({ text, delay = 0, speed = 30, className = "", once = true }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  const isComplete = hasStarted && displayedText.length >= text.length;

  useEffect(() => {
    let timeout;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasStarted)) {
          timeout = setTimeout(() => setHasStarted(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, [delay, hasStarted, once]);

  useEffect(() => {
    if (!hasStarted || displayedText.length >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayedText, hasStarted, text, speed]);

  return (
    <span ref={elementRef} className={className}>
      {displayedText}
      {!isComplete && hasStarted && (
        <span className="inline-block w-[2px] h-[1em] bg-current ml-0.5 animate-pulse" />
      )}
    </span>
  );
};

export default TypewriterText;
