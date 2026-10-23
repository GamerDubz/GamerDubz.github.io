"use client";

import { useSyncExternalStore } from "react";

const CLOCK_REFRESH_MS = 15_000;

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Johannesburg",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function subscribe(onChange: () => void) {
  const intervalId = setInterval(onChange, CLOCK_REFRESH_MS);
  return () => clearInterval(intervalId);
}

const getSnapshot = () => timeFormatter.format(new Date());

// Empty during SSR and the first client render so the static markup and
// hydration agree; the time fills in right after.
const getServerSnapshot = () => "";

export function LocalClock({ location }: { location: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <>
      {location}
      {time && (
        <>
          , <time className="tabular-nums">{time}</time> local time
        </>
      )}
    </>
  );
}
