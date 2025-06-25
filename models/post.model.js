import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    // location: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    bedroomNumber: { type: Number, required: true },
    bathroomNumber: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    type: { type: String, required: true },
    property: { type: String, required: true },
    utilitiesPolicy: { type: String, required: true },
    petPolicy: { type: String, required: true },
    Kitchen: { type: Number, required: true },
    totalSize: { type: Number, required: true },
    school: { type: Number, required: true },
    images: { type: [String], required: true },
    previewImages: { type: [String], required: true },
    BusStop: { type: Number, required: true },
    Resturant: { type: Number, required: true },
    LoadShedding: { type: String, required: false },
    Water: { type: String, required: false },
    Gas: { type: String, required: false },
    Best: { type: String, required: false },
    Hospital: { type: String, required: false },
    Garden: { type: String, required: false },
    Gym: { type: String, required: false },
  },
  { timestamps: true }
);

export const postModel = mongoose.model("post", postSchema);
