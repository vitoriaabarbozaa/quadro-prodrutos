import { useState, useEffect } from "react";

export function useRecifeTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  // Recife is UTC-3 always (no DST)
  const offset = -3 * 60;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const recife = new Date(utc + offset * 60000);
  return recife;
}

export function formatTime(date: Date) {
  return date.toTimeString().slice(0, 8);
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Recife",
  });
}

export function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function currentMinutes(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function countdown(targetTime: string, now: Date): string {
  const target = toMinutes(targetTime);
  const curr = currentMinutes(now);
  let diff = target - curr;
  if (diff < 0) diff += 24 * 60;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h > 0) return `${h}h ${m.toString().padStart(2, "0")}m`;
  return `${m}m`;
}
