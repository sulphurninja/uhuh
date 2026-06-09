"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const NO_DODGE_MESSAGES = [
  "nope!",
  "nice try lol",
  "can't click that 🏃",
  "uh uh",
  "nope nope nope",
  "not today 😌",
  "you wish",
  "nah fam",
  "keep trying lol",
  "absolutely not",
  "wrong button bestie",
  "nope nope nope nope",
  "the no said no",
  "try again 😭",
  "so close… jk no",
  "missed me",
  "nope ❌",
  "not happening",
  "denied lol",
  "no shot",
  "yeah… no",
  "nope not allowed",
  "click faster next time lol",
  "the audacity",
  "still no",
  "nope × 1000",
  "you really thought",
  "nope nope nope nope nope",
  "give up yet? lol",
  "never gonna happen",
];

const YES_DODGE_MESSAGES = [
  "nope!",
  "you don't hate me lol",
  "nice try",
  "can't say that 🏃",
  "uh uh",
  "you wish 😌",
  "nah you don't",
  "wrong answer bestie",
  "keep trying lol",
  "absolutely not",
  "you don't mean that",
  "nice try though",
  "the yes said no",
  "you don't hate me fr",
  "so close… jk no",
  "missed me",
  "nope ❌",
  "not happening",
  "denied lol",
  "no shot you hate me",
  "yeah… no you don't",
  "you're lying lol",
  "click faster next time",
  "the audacity",
  "still no",
  "you don't hate me × 1000",
  "you really thought",
  "give up yet? lol",
  "never gonna happen",
  "we both know you don't",
  "that's cap",
  "be fr you don't",
  "stop lying lol",
  "you like me admit it",
  "can't click hate 😭",
  "not today hater",
  "you're not slick",
  "try again bestie",
  "nope nope nope",
  "hate me? couldn't be you",
];

const DODGE_ZONES = [
  "top-left",
  "top-right",
  "top-center",
  "left",
  "right",
  "bottom-left",
  "bottom-right",
] as const;

type DodgeZone = (typeof DODGE_ZONES)[number] | "below-static";

type Props = {
  variant: "yes" | "no";
  questionKey: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  staticButtonRef: React.RefObject<HTMLButtonElement | null>;
};

function getZonePosition(
  zone: DodgeZone,
  containerW: number,
  containerH: number,
  btnW: number,
  btnH: number,
  padding: number
) {
  switch (zone) {
    case "top-left":
      return { x: padding, y: padding + 16 };
    case "top-right":
      return { x: containerW - btnW - padding, y: padding + 16 };
    case "top-center":
      return { x: (containerW - btnW) / 2, y: padding + 16 };
    case "left":
      return { x: padding, y: containerH * 0.45 - btnH / 2 };
    case "right":
      return {
        x: containerW - btnW - padding,
        y: containerH * 0.45 - btnH / 2,
      };
    case "bottom-left":
      return { x: padding, y: containerH - btnH - padding };
    case "bottom-right":
      return {
        x: containerW - btnW - padding,
        y: containerH - btnH - padding,
      };
    default:
      return { x: (containerW - btnW) / 2, y: padding + 16 };
  }
}

function getBelowStaticPosition(
  staticRect: DOMRect,
  containerRect: DOMRect,
  btnW: number,
  padding: number
) {
  const x =
    staticRect.left -
    containerRect.left +
    staticRect.width / 2 -
    btnW / 2;
  const y = staticRect.bottom - containerRect.top + padding;

  return { x, y };
}

function overlapsStatic(
  x: number,
  y: number,
  btnW: number,
  btnH: number,
  staticRect: DOMRect,
  containerRect: DOMRect,
  margin = 14
) {
  const runaway = {
    left: x,
    top: y,
    right: x + btnW,
    bottom: y + btnH,
  };
  const block = {
    left: staticRect.left - containerRect.left - margin,
    top: staticRect.top - containerRect.top - margin,
    right: staticRect.right - containerRect.left + margin,
    bottom: staticRect.bottom - containerRect.top + margin,
  };

  return !(
    runaway.right < block.left ||
    runaway.left > block.right ||
    runaway.bottom < block.top ||
    runaway.top > block.bottom
  );
}

export default function RunawayButton({
  variant,
  questionKey,
  containerRef,
  staticButtonRef,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastDodge = useRef(0);
  const usedBelow = useRef(false);
  const lastZone = useRef<DodgeZone | null>(null);
  const homePos = useRef({ left: 0, top: 0 });
  const initialLabel = variant === "yes" ? "yes!! ❤️" : "no";
  const [message, setMessage] = useState(initialLabel);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const dodgeCount = useRef(0);
  const dodgeMessages =
    variant === "yes" ? YES_DODGE_MESSAGES : NO_DODGE_MESSAGES;

  const captureHome = useCallback(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    const cRect = container.getBoundingClientRect();
    const bRect = button.getBoundingClientRect();

    homePos.current = {
      left: bRect.left - cRect.left - offsetRef.current.x,
      top: bRect.top - cRect.top - offsetRef.current.y,
    };
  }, [containerRef]);

  useEffect(() => {
    setMessage(initialLabel);
    offsetRef.current = { x: 0, y: 0 };
    setOffset({ x: 0, y: 0 });
    dodgeCount.current = 0;
    usedBelow.current = false;
    lastZone.current = null;
  }, [questionKey, variant, initialLabel]);

  useLayoutEffect(() => {
    captureHome();
    window.addEventListener("resize", captureHome);
    return () => window.removeEventListener("resize", captureHome);
  }, [questionKey, captureHome]);

  const dodge = useCallback(() => {
    const now = Date.now();
    if (now - lastDodge.current < 300) return;
    lastDodge.current = now;

    const container = containerRef.current;
    const button = buttonRef.current;
    const staticButton = staticButtonRef.current;
    if (!container || !button) return;

    captureHome();

    const cRect = container.getBoundingClientRect();
    const padding = 10;
    const btnW = button.offsetWidth;
    const btnH = button.offsetHeight;
    const { left: homeLeft, top: homeTop } = homePos.current;

    type ZoneOption = { id: DodgeZone; pos: { x: number; y: number } };

    const zoneOptions: ZoneOption[] = DODGE_ZONES.map((zone) => ({
      id: zone,
      pos: getZonePosition(
        zone,
        cRect.width,
        cRect.height,
        btnW,
        btnH,
        padding
      ),
    }));

    if (!usedBelow.current && staticButton) {
      zoneOptions.push({
        id: "below-static",
        pos: getBelowStaticPosition(
          staticButton.getBoundingClientRect(),
          cRect,
          btnW,
          padding
        ),
      });
    }

    const availableZones = zoneOptions.filter(({ id, pos }) => {
      if (
        staticButton &&
        id !== "below-static" &&
        overlapsStatic(
          pos.x,
          pos.y,
          btnW,
          btnH,
          staticButton.getBoundingClientRect(),
          cRect
        )
      ) {
        return false;
      }

      const fitsInContainer =
        pos.x >= padding &&
        pos.y >= padding &&
        pos.x + btnW <= cRect.width - padding &&
        pos.y + btnH <= cRect.height - padding;

      return fitsInContainer;
    });

    let pool = availableZones.filter((zone) => zone.id !== lastZone.current);
    if (pool.length === 0) pool = availableZones;
    if (pool.length === 0) return;

    const picked = pool[Math.floor(Math.random() * pool.length)];
    if (picked.id === "below-static") usedBelow.current = true;
    lastZone.current = picked.id;

    const target = picked.pos;

    const nextOffset = {
      x: target.x - homeLeft,
      y: target.y - homeTop,
    };
    offsetRef.current = nextOffset;
    setOffset(nextOffset);
    dodgeCount.current += 1;
    setMessage(
      dodgeMessages[dodgeCount.current % dodgeMessages.length] ?? "nope!"
    );
  }, [containerRef, staticButtonRef, captureHome, dodgeMessages]);

  const baseClass =
    variant === "yes"
      ? "runaway-yes-btn relative z-10 shrink-0 cursor-pointer rounded-full px-12 py-4 text-lg font-bold text-white shadow-lg select-none"
      : "runaway-no-btn relative z-10 shrink-0 cursor-pointer rounded-full px-8 py-3.5 text-base font-bold text-[#c45d82] shadow-lg select-none";

  return (
    <button
      ref={buttonRef}
      type="button"
      className={baseClass}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.2s ease-out",
      }}
      onClick={(e) => {
        e.preventDefault();
        dodge();
      }}
      tabIndex={-1}
      aria-hidden
    >
      {message}
    </button>
  );
}
