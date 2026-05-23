import { Schema, model, models } from "mongoose";

const suggestionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  },
);

const Suggestion =
  models.Suggestion || model("Suggestion", suggestionSchema);

export default Suggestion;