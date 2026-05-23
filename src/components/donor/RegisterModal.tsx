"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  const [successOpen, setSuccessOpen] = useState(false);

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
      setSuccessOpen(true);

      onSuccess();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="mb-4 text-center text-lg font-semibold">
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

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-green-600">
              Successfully Registered!
            </DialogTitle>

            <DialogDescription className="space-y-4 pt-4 text-center text-base text-slate-700">
              <p>
                Welcome to the <strong>Palashnagar Blood Donor Community</strong>!
              </p>

              <div className="rounded-xl bg-red-50 p-4 text-left">
                <p className="font-semibold text-red-700">
                  Important Suggestion:
                </p>

                <p className="mt-2 text-sm text-slate-700">
                  Whenever you donate blood, please update your last donation
                  date using the <strong>Edit Profile</strong> option.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <Button
            className="mt-4 w-full bg-red-600 hover:bg-red-700"
            onClick={() => setSuccessOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}