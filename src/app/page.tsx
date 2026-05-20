"use client";

import DonorList from "@/components/donor/DonorList";
import EditProfileModal from "@/components/donor/EditProfileModal";
import Footer from "@/components/donor/Footer";
import Header from "@/components/donor/Header";
import Hero from "@/components/donor/Hero";
import RegisterModal from "@/components/donor/RegisterModal";
import SearchFilter from "@/components/donor/SearchFilter";
import { Donor } from "@/types/donor";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const LIMIT = 10;

type BloodGroupCounts = Record<string, number>;

export default function HomePage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("ALL");
  const [bloodGroupCounts, setBloodGroupCounts] = useState<BloodGroupCounts>(
    {},
  );

  const [registerOpen, setRegisterOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchDonors = useCallback(
    async (pageNumber = 1, replace = false) => {
      try {
        if (pageNumber === 1) {
          setInitialLoading(true);
        } else {
          setLoadingMore(true);
        }

        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (bloodGroup) params.set("bloodGroup", bloodGroup);

        params.set("page", String(pageNumber));
        params.set("limit", String(LIMIT));

        const res = await fetch(`/api/donors?${params.toString()}`, {
          cache: "no-store",
        });

        const result = await res.json();

        if (!result.success) {
          toast.error(result.message || "Failed to fetch donors");
          return;
        }

        setDonors((prev) => {
          if (replace) return result.data;

          const existingIds = new Set(prev.map((donor) => donor._id));
          const newDonors = result.data.filter(
            (donor: Donor) => !existingIds.has(donor._id),
          );

          return [...prev, ...newDonors];
        });

        setBloodGroupCounts(result.counts || {});
        setHasMore(result.pagination.hasMore);
        setPage(pageNumber);
      } catch {
        toast.error("Something went wrong");
      } finally {
        setInitialLoading(false);
        setLoadingMore(false);
      }
    },
    [search, bloodGroup],
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      fetchDonors(1, true);
    }, 300);

    return () => clearTimeout(delay);
  }, [search, bloodGroup, fetchDonors]);

  const lastDonorRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (initialLoading || loadingMore) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchDonors(page + 1, false);
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [initialLoading, loadingMore, hasMore, page, fetchDonors],
  );

  function refreshDonors() {
    setPage(1);
    setHasMore(true);
    fetchDonors(1, true);
  }

  function refreshAfterRegister() {
    setSearch("");
    setBloodGroup("ALL");
    setPage(1);
    setHasMore(true);
    fetchDonors(1, true);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main id="top" className="min-h-screen bg-slate-50 text-slate-950">
      <Header
        onLogoClick={scrollToTop}
        onRegisterClick={() => setRegisterOpen(true)}
        onEditClick={() => setEditOpen(true)}
      />

      <Hero onRegisterClick={() => setRegisterOpen(true)} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SearchFilter
          search={search}
          bloodGroup={bloodGroup}
          bloodGroupCounts={bloodGroupCounts}
          onSearchChange={setSearch}
          onBloodGroupChange={setBloodGroup}
        />

        <DonorList
          donors={donors}
          loading={initialLoading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          lastDonorRef={lastDonorRef}
        />
      </section>

      <Footer />

      <RegisterModal
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        onSuccess={refreshAfterRegister}
      />

      <EditProfileModal
        open={editOpen}
        onOpenChange={setEditOpen}
        onSuccess={refreshDonors}
        onRegisterRedirect={() => {
          setEditOpen(false);
          setRegisterOpen(true);
        }}
      />
    </main>
  );
}
