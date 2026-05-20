"use client";

import Image from "next/image";
import bloodHero from "@/assets/blood_hero.jpeg";
import { Button } from "@/components/ui/button";
import { Droplet, Search, Users } from "lucide-react";

type HeroProps = {
  onRegisterClick: () => void;
};

export default function Hero({ onRegisterClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-28">
      <Image
        src={bloodHero}
        alt="Blood donation hero background"
        fill
        priority
        className="object-cover opacity-100"
      />

      <div className="absolute inset-0 bg-linear-to-br from-red-50/95 via-white/90 to-rose-50/95" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm font-medium text-red-600 shadow-sm backdrop-blur">
            <Droplet className="size-4" />
            Donate blood, save lives
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Find blood donors quickly and easily.
          </h1>

          <p className="mt-5 max-w-xl text-lg text-slate-600">
            Search donors by name, phone, address, or filter by blood group.
            Register yourself as a donor and help people in emergency situations.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              onClick={onRegisterClick}
              size="lg"
              className="bg-red-600 hover:bg-red-700"
            >
              Become a Donor
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-white/80 backdrop-blur"
              onClick={() =>
                document
                  .getElementById("donor-list")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Find Donors
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur">
            <Users className="mb-4 size-10 text-red-600" />
            <h3 className="text-xl font-semibold">Community Donors</h3>
            <p className="mt-2 text-slate-600">
              Build a local donor database for emergency needs.
            </p>
          </div>

          <div className="rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur sm:mt-10">
            <Search className="mb-4 size-10 text-red-600" />
            <h3 className="text-xl font-semibold">Fast Search</h3>
            <p className="mt-2 text-slate-600">
              Search by name, address, or phone number instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}