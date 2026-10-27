import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trailSchema = new Schema({
  name: String,
  img: String,
  category: {
    type: String,
    enum: ["Woodland/Forest",
      "Hill/Mountain",
      "Lakeside/Riverside",
      "Bog/Moorland",
      "Countryside/Farmland",
      "Urban/Park",
      "Mixed/Other",
    ],
  },
  format: String,
  difficulty: String,
  location: String,
  latitude: Number,
  longitude: Number,
  distance: Number,
  duration: Number,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Trail = Mongoose.model("Trail", trailSchema);