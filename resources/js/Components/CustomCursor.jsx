import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isLink = target.tagName.toLowerCase() === 'a' || target.closest('a');
      const isButton = target.tagName.toLowerCase() === 'button' || target.closest('button');
      const isProjectCard = target.closest('.group');
      
      if (isLink || isButton) {
        setIsHovering(true);
        // Check for project cards specifically
        if (isLink && target.closest('[class*="aspect-"]')) {
          setHoverLabel('View');
        } else {
          setHoverLabel('');
        }
      } else {
        setIsHovering(false);
        setHoverLabel('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  const outerSpring = { damping: 20, stiffness: 200, mass: 0.5 };
  const innerSpring = { damping: 30, stiffness: 400, mass: 0.3 };

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
        animate={{
          x: mousePosition.x - (isHovering ? 32 : 16),
          y: mousePosition.y - (isHovering ? 32 : 16),
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0)',
          borderWidth: isHovering ? '0px' : '1px',
          borderColor: 'rgba(255, 255, 255, 0.4)',
          opacity: isVisible ? 1 : 0,
        }}
        style={{ borderStyle: 'solid' }}
        transition={{ type: "spring", ...outerSpring }}
      >
        {hoverLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[8px] font-mono uppercase tracking-widest text-black font-bold"
          >
            {hoverLabel}
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          opacity: isVisible && !isHovering ? 1 : 0,
        }}
        transition={{ type: "spring", ...innerSpring }}
      />
    </>
  );
}
