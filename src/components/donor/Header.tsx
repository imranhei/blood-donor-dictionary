"use client";

import { HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  onLogoClick: () => void;
  onRegisterClick: () => void;
  onEditClick: () => void;
};

export default function Header({
  onLogoClick,
  onRegisterClick,
  onEditClick,
}: HeaderProps) {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 font-bold text-red-600"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-red-100">
            <HeartPulse className="size-6" />
          </span>
          <span className="text-xl">Life Savers of Palashnagar</span>
        </button>

        <nav className="flex items-center gap-2">
          <Button variant="outline" onClick={onEditClick}>
            Edit Profile
          </Button>
          <Button onClick={onRegisterClick} className="bg-red-600 hover:bg-red-700">
            Register
          </Button>
        </nav>
      </div>
    </header>
  );
}