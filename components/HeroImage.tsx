"use client";

import { useState } from "react";

export default function HeroImage() {
  const [err, setErr] = useState(false);
  if (err) return null;
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        onError={() => setErr(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
    </>
  );
}
