"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Donor } from "@/types/donor";
import {
  CalendarDays,
  CheckCircle2,
  MapPin,
  Phone,
  StickyNote,
  UserRound,
  XCircle,
} from "lucide-react";

type DonorCardProps = {
  donor: Donor;
};

function formatDate(date?: string) {
  if (!date) return "Not provided";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DonorCard({ donor }: DonorCardProps) {
  return (
    <Card className="group h-full overflow-hidden rounded-3xl border border-red-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 py-0 hover:border-red-400 hover:shadow-[0_10px_30px_rgba(220,38,38,0.22)]">
      <CardContent className="flex h-full flex-col p-0">
        <div className="relative bg-linear-to-br from-red-600 to-rose-700 p-4 text-white">
          <div className="absolute right-4 top-4 rounded-2xl bg-white px-4 py-2 text-xl font-black text-red-600 shadow-sm">
            {donor.bloodGroup}
          </div>

          <div className="pr-24">
            <div className="mb-2 flex size-10 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
              <UserRound className="size-5" />
            </div>

            <h3 className="line-clamp-1 text-lg font-bold">{donor.name}</h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Phone className="size-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Phone
                </p>
                <a
                  href={`tel:${donor.phone}`}
                  className="text-sm font-semibold text-slate-900 transition hover:text-red-600"
                >
                  {donor.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <MapPin className="size-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Address
                </p>
                <p className="line-clamp-2 text-sm font-semibold text-slate-900">
                  {donor.address}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <CalendarDays className="size-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Last Donate
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {donor.lastDonate
                    ? formatDate(donor.lastDonate)
                    : "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="my-4 border-t" />

          <div className="min-h-14 rounded-2xl bg-slate-50 p-3">
            <div className="mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              <StickyNote className="size-3.5" />
              Note
            </div>

            <p className="line-clamp-2 text-sm font-medium text-slate-700">
              {donor.note?.trim() ? donor.note : "No additional note."}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            {donor.available ? (
              <Badge className="gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs hover:bg-emerald-600">
                <CheckCircle2 className="size-3" />
                Available
              </Badge>
            ) : (
              <Badge
                variant="destructive"
                className="gap-1 rounded-full px-3 py-1 text-xs"
              >
                <XCircle className="size-3" />
                Not Available
              </Badge>
            )}

            <a
              href={`tel:${donor.phone}`}
              className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
            >
              Call Now
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
