"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { BLOOD_GROUPS } from "@/constants/bloodGroups";
import { Donor } from "@/types/donor";
import { FormEvent, useState } from "react";

export type DonorFormData = {
  name: string;
  phone: string;
  dateOfBirth: string;
  bloodGroup: string;
  address: string;
  lastDonate: string;
  available: boolean;
  note: string;
};

type DonorFormProps = {
  initialData?: Donor | null;
  submitLabel: string;
  loading?: boolean;
  lockIdentity?: boolean;
  onSubmit: (data: DonorFormData) => void;
};

const defaultData: DonorFormData = {
  name: "",
  phone: "",
  dateOfBirth: "",
  bloodGroup: "",
  address: "",
  lastDonate: "",
  available: true,
  note: "",
};

export default function DonorForm({
  initialData,
  submitLabel,
  loading,
  lockIdentity = false,
  onSubmit,
}: DonorFormProps) {
  const [form, setForm] = useState<DonorFormData>(
    initialData
      ? {
          name: initialData.name,
          phone: initialData.phone,
          dateOfBirth: initialData.dateOfBirth,
          bloodGroup: initialData.bloodGroup,
          address: initialData.address,
          lastDonate: initialData.lastDonate || "",
          available: initialData.available,
          note: initialData.note || "",
        }
      : defaultData,
  );

  function updateField<K extends keyof DonorFormData>(
    key: K,
    value: DonorFormData[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>
            Name<span className="text-red-500">*</span>
          </Label>
          <Input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>
            Phone<span className="text-red-500">*</span>
          </Label>
          <Input
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="01712345678 or +8801712345678"
            required
            disabled={lockIdentity}
            pattern="^(\+?88)?01[3-9][0-9]{8}$"
            title="Enter a valid Bangladeshi phone number"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>
            Date of Birth<span className="text-red-500">*</span>
          </Label>
          <Input
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
            required
            disabled={lockIdentity}
          />
        </div>

        <div className="space-y-2">
          <Label>
            Blood Group<span className="text-red-500">*</span>
          </Label>
          <Select
            value={form.bloodGroup}
            onValueChange={(value) => updateField("bloodGroup", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              {BLOOD_GROUPS.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Address<span className="text-red-500">*</span>
        </Label>
        <Textarea
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          placeholder="Area, city, district"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Last Donate</Label>
          <Input
            type="date"
            value={form.lastDonate}
            onChange={(e) => updateField("lastDonate", e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between rounded-xl border p-2">
          <div>
            <Label>Available</Label>
            <p className="text-sm text-slate-500">Can donate now?</p>
          </div>
          <Switch
            checked={form.available}
            onCheckedChange={(value) => updateField("available", value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Note</Label>
        <Textarea
          value={form.note}
          onChange={(e) => updateField("note", e.target.value)}
          placeholder="Optional note"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700"
      >
        {loading ? "Please wait..." : submitLabel}
      </Button>
    </form>
  );
}
