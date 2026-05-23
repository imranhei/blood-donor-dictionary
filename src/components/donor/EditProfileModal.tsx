"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Donor } from "@/types/donor";
import { Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import DonorForm, { DonorFormData } from "./DonorForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type EditProfileModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  onRegisterRedirect: () => void;
};

export default function EditProfileModal({
  open,
  onOpenChange,
  onSuccess,
  onRegisterRedirect,
}: EditProfileModalProps) {
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [verifiedDonor, setVerifiedDonor] = useState<Donor | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleVerify(e: FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/donors/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          dateOfBirth,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error(
          result.message || "Profile not found. Please check your information.",
        );
        return;
      }

      toast.success("Profile verified");
      setVerifiedDonor(result.data);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(data: DonorFormData) {
    if (!verifiedDonor) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/donors/${verifiedDonor._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error(result.message || "Update failed");
        return;
      }

      toast.success("Profile updated successfully");
      closeAndReset();
      onSuccess();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProfile() {
    if (!verifiedDonor) return;

    try {
      setDeleteLoading(true);

      const res = await fetch(`/api/donors/${verifiedDonor._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: verifiedDonor.phone,
          dateOfBirth: verifiedDonor.dateOfBirth,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error(result.message || "Delete failed");
        return;
      }

      toast.success("Profile deleted successfully");
      closeAndReset();
      onSuccess();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  }

  function closeAndReset() {
    onOpenChange(false);
    setVerifiedDonor(null);
    setPhone("");
    setDateOfBirth("");
  }

  function handleOpenChange(value: boolean) {
    if (!value) {
      closeAndReset();
      return;
    }

    onOpenChange(value);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Edit Donor Profile
          </DialogTitle>
        </DialogHeader>

        {!verifiedDonor ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-sm text-slate-600">
              Enter your phone number and date of birth to verify your profile.
              If no profile is found, you will be redirected to register.
            </p>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01712345678 or +8801712345678"
                required
                pattern="^(\+?88)?01[3-9][0-9]{8}$"
                title="Enter a valid Bangladeshi phone number"
              />
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {loading ? "Checking..." : "Verify Profile"}
              </Button>

              <div className="text-center">
                <p className="text-sm text-slate-600">Not registered yet?</p>

                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 w-full"
                  onClick={onRegisterRedirect}
                >
                  Register as Donor
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <DonorForm
              initialData={verifiedDonor}
              submitLabel="Update Profile"
              loading={loading}
              lockIdentity
              onSubmit={handleUpdate}
            />

            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <h4 className="font-semibold text-red-700">Danger Zone</h4>

              <p className="mt-1 text-sm text-red-600">
                Delete your donor profile permanently. This action cannot be
                undone.
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={deleteLoading || loading}
                    className="mt-4 w-full gap-2"
                  >
                    <Trash2 className="size-4" />
                    {deleteLoading ? "Deleting..." : "Delete Profile"}
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete donor profile?</AlertDialogTitle>

                    <AlertDialogDescription>
                      This will permanently delete your donor profile from the
                      donor list. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleteLoading}>
                      Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                      disabled={deleteLoading}
                      onClick={handleDeleteProfile}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {deleteLoading ? "Deleting..." : "Yes, Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
