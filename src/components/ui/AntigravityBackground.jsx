import React from 'react';

const AntigravityBackground = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 0,
        backgroundColor: '#0a0a0c',
        backgroundImage: `
          radial-gradient(ellipse at 70% 30%, rgba(45, 52, 68, 0.18) 0%, transparent 65%),
          linear-gradient(to right, rgba(255, 255, 255, 0.055) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.055) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 36px 36px, 36px 36px',
      }}
    />
  );
};

export default React.memo(AntigravityBackground);
