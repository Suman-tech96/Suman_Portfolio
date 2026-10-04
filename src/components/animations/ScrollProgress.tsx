import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-white/5 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#FF4D00] via-[#FF6A00] to-[#00F0FF] shadow-[0_0_10px_#FF4D00]"
        style={{ width: `${scrollProgress}%`, transition: 'width 0.1s linear' }}
      />
    </div>
  );
};
