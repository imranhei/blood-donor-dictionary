"use client";

import { HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2 font-bold text-red-600">
          <HeartPulse className="size-6" />
          BloodConnect
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Life Savers of Palashnagar.
        </p>
      </div>
    </footer>
  );
}