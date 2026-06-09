"use client";

const CLOUDS = [
  { top: "8%", left: "-5%", size: 90, delay: 0, duration: 38 },
  { top: "18%", left: "70%", size: 70, delay: 8, duration: 42 },
  { top: "65%", left: "-8%", size: 110, delay: 4, duration: 45 },
  { top: "78%", left: "75%", size: 80, delay: 12, duration: 40 },
];

const HEARTS = [
  { top: "14%", left: "12%", size: 16, delay: 0 },
  { top: "72%", left: "88%", size: 18, delay: 1.2 },
  { top: "48%", left: "6%", size: 14, delay: 0.8 },
];

const STARS = [
  { top: "6%", left: "45%", delay: 0 },
  { top: "30%", left: "30%", delay: 0.5 },
  { top: "50%", left: "88%", delay: 1 },
  { top: "85%", left: "20%", delay: 1.5 },
  { top: "20%", left: "60%", delay: 0.8 },
];

function Cloud({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 120 66"
      fill="none"
      aria-hidden
    >
      <ellipse cx="60" cy="40" rx="55" ry="24" fill="white" opacity="0.85" />
      <ellipse cx="35" cy="32" rx="28" ry="22" fill="white" opacity="0.9" />
      <ellipse cx="80" cy="30" rx="32" ry="24" fill="white" opacity="0.9" />
      <ellipse cx="55" cy="22" rx="22" ry="18" fill="white" />
    </svg>
  );
}

export default function FloatingDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {CLOUDS.map((cloud, i) => (
        <div
          key={`cloud-${i}`}
          className="absolute animate-drift opacity-70"
          style={{
            top: cloud.top,
            left: cloud.left,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          <Cloud size={cloud.size} />
        </div>
      ))}

      {HEARTS.map((heart, i) => (
        <div
          key={`heart-${i}`}
          className="absolute animate-float text-[#ff4d6d]"
          style={{
            top: heart.top,
            left: heart.left,
            fontSize: heart.size,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ♡
        </div>
      ))}

      {STARS.map((star, i) => (
        <div
          key={`star-${i}`}
          className="absolute animate-sparkle text-[#5eb8f0]"
          style={{
            top: star.top,
            left: star.left,
            fontSize: 14,
            animationDelay: `${star.delay}s`,
          }}
        >
          ✦
        </div>
      ))}
    </div>
  );
}
