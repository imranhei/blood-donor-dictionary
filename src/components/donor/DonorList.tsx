"use client";

import { Donor } from "@/types/donor";
import DonorCard from "./DonorCard";

type DonorListProps = {
  donors: Donor[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  lastDonorRef: (node: HTMLDivElement | null) => void;
};

export default function DonorList({
  donors,
  loading,
  loadingMore,
  hasMore,
  lastDonorRef,
}: DonorListProps) {
  return (
    <div id="donor-list">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">
            Available Donors
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Search and contact available blood donors
          </p>
        </div>

        <p className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
          {donors.length} donors loaded
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border bg-white p-10 text-center text-slate-500 shadow-sm">
          Loading donors...
        </div>
      ) : donors.length === 0 ? (
        <div className="rounded-3xl border bg-white p-10 text-center text-slate-500 shadow-sm">
          No donor found.
        </div>
      ) : (
        <>
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {donors.map((donor, index) => {
              const isLastDonor = index === donors.length - 1;

              return (
                <div
                  key={donor._id}
                  ref={isLastDonor ? lastDonorRef : null}
                  className="h-full"
                >
                  <DonorCard donor={donor} />
                </div>
              );
            })}
          </div>

          {loadingMore && (
            <div className="mt-8 rounded-3xl border bg-white p-6 text-center text-slate-500 shadow-sm">
              Loading more donors...
            </div>
          )}

          {!hasMore && donors.length > 0 && (
            <div className="mt-8 text-center text-sm text-slate-500">
              You have reached the end of the donor list.
            </div>
          )}
        </>
      )}
    </div>
  );
}
