export type Donor = {
  _id: string;
  name: string;
  phone: string;
  dateOfBirth: string;
  bloodGroup: string;
  address: string;
  lastDonate?: string;
  available: boolean;
  note?: string;
  createdAt: string;
  updatedAt: string;
};