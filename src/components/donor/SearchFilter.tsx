"use client";

import { Search } from "lucide-react";
import { BLOOD_GROUPS } from "@/constants/bloodGroups";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SearchFilterProps = {
  search: string;
  bloodGroup: string;
  bloodGroupCounts: Record<string, number>;
  onSearchChange: (value: string) => void;
  onBloodGroupChange: (value: string) => void;
};

export default function SearchFilter({
  search,
  bloodGroup,
  bloodGroupCounts,
  onSearchChange,
  onBloodGroupChange,
}: SearchFilterProps) {
  function getCount(group: string) {
    return bloodGroupCounts[group] || 0;
  }

  return (
    <div className="mb-8 rounded-3xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col space-y-4 items-center justify-between">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, address, or phone..."
            className="h-12 rounded-2xl pl-10 border-red-400"
          />
        </div>

        <div className="w-full">
  <div className="mb-3 flex items-center justify-between">
    <h3 className="text-sm font-semibold text-slate-700">
      Filter by Blood Group
    </h3>

    <span className="text-xs font-medium text-slate-400">
      {getCount("ALL")} total donors
    </span>
  </div>

  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
    <button
      type="button"
      onClick={() => onBloodGroupChange("ALL")}
      className={`rounded-2xl border p-3 text-left transition-all duration-200 ${
        bloodGroup === "ALL"
          ? "border-red-600 bg-red-600 text-white shadow-md shadow-red-200"
          : "border-slate-200 bg-white text-slate-700 hover:border-red-300 hover:bg-red-50"
      }`}
    >
      <span className="block text-sm font-bold">All</span>
      <span
        className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
          bloodGroup === "ALL"
            ? "bg-white/20 text-white"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {getCount("ALL")}
      </span>
    </button>

    {BLOOD_GROUPS.map((group) => {
      const active = bloodGroup === group;

      return (
        <button
          key={group}
          type="button"
          onClick={() => onBloodGroupChange(group)}
          className={`rounded-2xl border p-3 text-left transition-all duration-200 ${
            active
              ? "border-red-600 bg-red-600 text-white shadow-md shadow-red-200"
              : "border-slate-200 bg-white text-slate-700 hover:border-red-300 hover:bg-red-50"
          }`}
        >
          <span className="block text-lg font-black leading-none">
            {group}
          </span>

          <span
            className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
              active
                ? "bg-white/20 text-white"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {getCount(group)}
          </span>
        </button>
      );
    })}
  </div>
</div>
      </div>
    </div>
  );
}