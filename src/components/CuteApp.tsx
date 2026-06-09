"use client";

import { useCallback, useRef, useState } from "react";
import FloatingDecorations from "./FloatingDecorations";
import RunawayButton from "./RunawayButton";

const QUESTIONS = [
  {
    emoji: "🦋",
    text: "heart goes faster when my name pops up?",
    flipButtons: false,
  },
  {
    emoji: "✨",
    text: "would you go out with me again?",
    flipButtons: false,
  },
  {
    emoji: "👀",
    text: "do you really hate me?",
    flipButtons: true,
  },
  {
    emoji: "😭",
    text: "you kinda still like me? hahaha",
    flipButtons: false,
  },
];

const REACTIONS = [
  "hehe okay noted ❤️",
  "wait really?? 👀",
  "see? told you haha",
  "knew it 😭❤️",
];

type Screen = "welcome" | "questions" | "final";

function HeartBurst({ show }: { show: boolean }) {
  if (!show) return null;

  const hearts = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const dist = 50 + Math.random() * 35;
    return {
      id: i,
      tx: `${Math.cos(angle) * dist}px`,
      ty: `${Math.sin(angle) * dist}px`,
      delay: Math.random() * 0.2,
      emoji: ["❤️", "♥", "💕"][i % 3],
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute text-xl"
          style={
            {
              "--tx": h.tx,
              "--ty": h.ty,
              animation: `heart-burst 0.8s ease-out ${h.delay}s forwards`,
            } as React.CSSProperties
          }
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

export default function CuteApp() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [reaction, setReaction] = useState("");
  const [showBurst, setShowBurst] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const staticBtnRef = useRef<HTMLButtonElement>(null);

  const advance = useCallback(() => {
    if (isTransitioning) return;

    setShowBurst(true);
    setReaction(REACTIONS[questionIndex] ?? "yay!!");

    setIsTransitioning(true);
    setTimeout(() => {
      setShowBurst(false);

      if (questionIndex < QUESTIONS.length - 1) {
        setQuestionIndex((i) => i + 1);
        setReaction("");
        setIsTransitioning(false);
      } else {
        setScreen("final");
        setIsTransitioning(false);
      }
    }, 2500);
  }, [questionIndex, isTransitioning]);

  const startQuestions = () => setScreen("questions");

  if (screen === "welcome") {
    return (
      <div className="relative flex min-h-screen items-center justify-center p-6">
        <FloatingDecorations />
        <div className="glass-card animate-pop-in relative z-10 w-full max-w-md rounded-3xl px-8 py-10 text-center">
          <div className="mb-4 text-5xl animate-wiggle">😎🫵🏻</div>
          <h1 className="mb-3 text-2xl font-extrabold text-[#2d5a7b]">
            yooo wasssupp
          </h1>
          <p className="mb-2 text-[#4a7a9b] leading-relaxed">
            i made you something kinda silly
          </p>
          <p className="mb-8 text-sm text-[#7aa3c4]">
            answer honestly, cooool?
          </p>
          <button
            type="button"
            onClick={startQuestions}
            className="yes-btn animate-pulse-glow rounded-full px-10 py-4 text-lg font-bold text-white shadow-lg"
          >
            bet lemme see 👀
          </button>
        </div>
      </div>
    );
  }

  if (screen === "final") {
    return (
      <div className="relative flex min-h-screen items-center justify-center p-6">
        <FloatingDecorations />
        <div className="glass-card animate-pop-in relative z-10 w-full max-w-md rounded-3xl px-8 py-10 text-center">
          <div className="mb-4 text-5xl">😎🫶🏻✨</div>
          <h1 className="mb-4 text-2xl font-extrabold text-[#2d5a7b]">
            okay soooo…
          </h1>
          <p className="mb-3 text-lg font-semibold text-[#4a7a9b]">
            you kinda still like me huh 😭
          </p>
          <p className="mb-3 text-[#4a7a9b] leading-relaxed">
            6 years since we met and we&apos;re still here talking
          </p>
          <p className="mb-3 text-[#4a7a9b] leading-relaxed">
            kinda crazy how some people just find their way back huh 😎🫵🏻
          </p>
          <p className="mt-6 text-lg font-bold text-[#5eb8f0]">
            anyways… really glad you&apos;re here, thank you soooo much muaaah😙🫶🏻
          </p>
          <div className="mt-6 flex justify-center gap-2 text-2xl">
            <span className="animate-float" style={{ animationDelay: "0s" }}>
              ♡
            </span>
            <span className="animate-float text-[#ff4d6d]" style={{ animationDelay: "0.3s" }}>
              ❤️
            </span>
            <span className="animate-float" style={{ animationDelay: "0.6s" }}>
              ♡
            </span>
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[questionIndex];
  const flipped = question.flipButtons;

  return (
    <div className="relative flex min-h-screen items-center justify-center p-6">
      <FloatingDecorations />

      <div className="relative z-10 w-full max-w-lg">
        <div className="mb-6 flex justify-center gap-2.5">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`progress-dot h-3 w-3 rounded-full ${
                i < questionIndex
                  ? "done bg-[#7ec8f5]"
                  : i === questionIndex
                    ? "active bg-[#5eb8f0]"
                    : "bg-white/60"
              }`}
            />
          ))}
        </div>

        <div
          key={questionIndex}
          ref={cardRef}
          className="glass-card animate-pop-in relative min-h-[17rem] overflow-visible rounded-3xl px-8 pb-14 pt-10 text-center"
        >
          <div className="mb-4 text-4xl">{question.emoji}</div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#7aa3c4]">
            question {questionIndex + 1} of {QUESTIONS.length}
          </p>
          <h2 className="mb-6 text-xl font-bold leading-relaxed text-[#2d5a7b]">
            {question.text}
          </h2>

          {reaction && (
            <p className="mb-4 text-sm font-semibold text-[#5eb8f0] animate-pop-in">
              {reaction}
            </p>
          )}

          <HeartBurst show={showBurst} />

          <div className="relative mx-auto mt-4 flex min-h-[4.5rem] w-full items-center justify-center gap-4 sm:gap-5">
            {flipped ? (
              <>
                <RunawayButton
                  variant="yes"
                  questionKey={questionIndex}
                  containerRef={cardRef}
                  staticButtonRef={staticBtnRef}
                />
                <button
                  ref={staticBtnRef}
                  type="button"
                  onClick={advance}
                  disabled={isTransitioning}
                  className="no-btn relative z-20 shrink-0 rounded-full px-8 py-3.5 text-base font-bold text-[#c45d82] shadow-lg disabled:opacity-70"
                >
                  no
                </button>
              </>
            ) : (
              <>
                <button
                  ref={staticBtnRef}
                  type="button"
                  onClick={advance}
                  disabled={isTransitioning}
                  className="yes-btn relative z-20 shrink-0 rounded-full px-12 py-4 text-lg font-bold text-white shadow-lg disabled:opacity-70"
                >
                  yes!! ❤️
                </button>
                <RunawayButton
                  variant="no"
                  questionKey={questionIndex}
                  containerRef={cardRef}
                  staticButtonRef={staticBtnRef}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
