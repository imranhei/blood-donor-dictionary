"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import DonorForm, { DonorFormData } from "./DonorForm";

type RegisterModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export default function RegisterModal({
  open,
  onOpenChange,
  onSuccess,
}: RegisterModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleRegister(data: DonorFormData) {
    try {
      setLoading(true);

      const res = await fetch("/api/donors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error(result.message || "Registration failed");
        return;
      }

      toast.success("Donor registered successfully");

      onOpenChange(false);
      onSuccess();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold text-lg mb-4">
            Register as Blood Donor
          </DialogTitle>
        </DialogHeader>

        <DonorForm
          submitLabel="Register"
          loading={loading}
          onSubmit={handleRegister}
        />
      </DialogContent>
    </Dialog>
  );
}
