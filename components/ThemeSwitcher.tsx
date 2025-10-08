"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { WiStars } from "react-icons/wi";
import { motion } from "framer-motion";

const SIZE = 100; // Square size
const ICON_SIZE = 18; // Sun/Moon icon size

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Set initial angle: Moon at 90° (dark) or Sun at 90° (light)
    setAngle(resolvedTheme === "dark" ? 90 : 270);
  }, []);

  useEffect(() => {
    // Sync angle with theme if changed externally
    if (mounted && resolvedTheme === "dark" && angle % 360 !== 90) {
      setAngle((prev) => prev + (90 - (((prev % 360) + 360) % 360)));
    } else if (mounted && resolvedTheme === "light" && angle % 360 !== 270) {
      setAngle((prev) => prev + (270 - (((prev % 360) + 360) % 360)));
    }
  }, [resolvedTheme, mounted]);

  if (!mounted) return null;

  const handleToggle = () => {
    setRotating(true);
    // Rotate 180° clockwise
    setAngle((prev) => prev + 180);
    setTimeout(() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
      setTimeout(() => setRotating(false), 700); // Match animation duration
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[150px]">
      <button
        aria-label="Toggle theme"
        onClick={handleToggle}
        className="focus:outline-none"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Half-circle container (top half visible) */}
        <div
          className="relative overflow-hidden"
          style={{
            width: SIZE,
            height: SIZE / 2,
            borderTopLeftRadius: SIZE / 2,
            borderTopRightRadius: SIZE / 2,
            background: resolvedTheme === "dark" ? "#18181b" : "#60a5fa",
            borderBottom: "4px solid",
            borderColor: resolvedTheme === "dark" ? "#27272a" : "#22c55e",
            transition: "background 0.5s, border-color 0.5s",
          }}
        >
          {/* Stars in dark mode */}
          {resolvedTheme === "dark" && (
            <div className="absolute inset-0 pointer-events-none z-0">
              {[
                { top: 8, left: 12, size: 20, opacity: 0.5 },
                { top: 18, left: 60, size: 18, opacity: 0.5 },
                { top: 30, left: 35, size: 16, opacity: 0.6 },
                { top: 5, left: 80, size: 20, opacity: 0.4 },
                { top: 25, left: 8, size: 14, opacity: 0.5 },
              ].map((star, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-400"
                  style={{ top: star.top, left: star.left }}
                  animate={{
                    opacity: [
                      star.opacity,
                      star.opacity + 0.3,
                      star.opacity - 0.2,
                      star.opacity,
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5 + Math.random() * 1.5, // Random duration between 1.5s and 3s
                    ease: "easeInOut",
                  }}
                >
                  <WiStars style={{ fontSize: star.size }} />
                </motion.div>
              ))}
            </div>
          )}
          {/* Clouds in light mode */}
          {resolvedTheme === "light" && (
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full opacity-80"
                  style={{
                    width: "16px",
                    height: "8px",
                    top: Math.random() * 30 + 10 + "%",
                    left: Math.random() * 80 + "%",
                  }}
                  animate={{
                    x: [0, 8, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 4 + Math.random() * 4,
                      ease: "easeInOut",
                    },
                  }}
                />
              ))}
            </div>
          )}
          {/* Rotating inner square */}
          <motion.div
            className="absolute left-0 top-2"
            animate={{ rotate: angle }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{
              width: SIZE,
              height: SIZE,
              transformOrigin: "center center",
            }}
          >
            {/* Sun at -90° (left) initially, moves to 90° (right) in light mode */}
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(-90deg) translate(0, -${
                  SIZE / 2 - 8
                }px)`,
                transformOrigin: "center center",
              }}
            >
              <FaMoon
                className="text-blue-400"
                size={ICON_SIZE}
                style={{
                  filter: rotating ? "drop-shadow(0 0 6px #60a5fa)" : undefined,
                }}
              />
            </div>
            {/* Moon at 90° (right) initially, moves to -90° (left) in light mode */}
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(90deg) translate(0, -${
                  SIZE / 2 - 8
                }px)`,
                transformOrigin: "center center",
              }}
            >
              <FaSun
                className="text-yellow-400"
                size={ICON_SIZE}
                style={{
                  filter: rotating ? "drop-shadow(0 0 6px #facc15)" : undefined,
                }}
              />
            </div>
          </motion.div>
        </div>
      </button>
    </div>
  );
}

// CSS for star twinkle animation (retained for compatibility)
const styles = `
@keyframes twinkle {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.2; }
}
`;

export default ThemeSwitcher;
