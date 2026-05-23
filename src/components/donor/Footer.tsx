"use client";

import { HeartPulse, Mail, GraduationCap, User, Send } from "lucide-react";
import { useState } from "react";
import SuggestionModal from "./SuggestionModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import profilePic from "@/assets/eayashen.jpeg";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import poster from "@/assets/poster.png";

export default function Footer() {
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* MAIN GRID */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          {/* LEFT SECTION */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => setOpenSuggestion(true)}
              className="mt-2 w-fit bg-teal-600 hover:bg-teal-700"
            >
              Give Suggestion <Send className="ml-2 size-4" />
            </Button>

            <div className="flex items-center gap-2 font-bold text-red-600">
              <HeartPulse className="size-6" />
              Life Savers of Palashnagar
            </div>

            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Life Savers of Palashnagar.
            </p>
          </div>

          {/* RIGHT PROFILE CARD */}
          <div
            onClick={() => setOpenProfile(true)}
            className="flex w-full max-w-md cursor-pointer items-center gap-4 rounded-2xl border bg-slate-50 p-4 shadow-sm transition hover:shadow-md sm:w-auto"
          >
            {/* PROFILE IMAGE */}
            <div className="relative size-24 shrink-0 overflow-hidden rounded-full border">
              <Image
                src={profilePic}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>

            {/* INFO */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <User className="size-4 text-slate-500" />
                Eayashen Arafat
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-600">
                <GraduationCap className="mt-0.5 size-4 text-slate-500" />
                BSc in Information & Communication Engineering,
              </div>

              <div className="text-xs text-slate-600">
                Bangladesh University of Professionals (BUP)
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Mail className="size-4 text-slate-500" />
                md.eayashen@icddrb.org
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <SuggestionModal open={openSuggestion} onOpenChange={setOpenSuggestion} />

      <Dialog open={openProfile} onOpenChange={setOpenProfile}>
        <DialogContent className="w-fit max-w-none border-0 bg-transparent p-0 shadow-none">
          <div className="relative inline-block">
            <Image
              src={poster}
              alt="Profile Full View"
              width={poster.width}
              height={poster.height}
              className="h-auto w-auto rounded-xl"
            />
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
