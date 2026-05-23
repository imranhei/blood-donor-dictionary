import { Schema, model, models } from "mongoose";

const donorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"],
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    lastDonate: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "",
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  },
);

donorSchema.index({ phone: 1, dateOfBirth: 1 }, { unique: true });

const Donor = models.Donor || model("Donor", donorSchema);

export default Donor;
