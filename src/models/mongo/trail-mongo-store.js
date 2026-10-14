import Mongoose from "mongoose";
import { Trail } from "./trail.js";

export const trailMongoStore = {
  async getAllTrails() {
    const trails = await Trail.find().lean();
    return trails;
  },

  async addTrail(trail) {
    const newTrail = new Trail(trail);
    const trailObj = await newTrail.save();
    return this.getTrailById(trailObj._id);
  },

  async getTrailById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const trail = await Trail.findOne({ _id: id }).lean();
      return trail;
    }
    return null;
  },

  async deleteTrail(id) {
    try {
      await Trail.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllTrails() {
    await Trail.deleteMany({});
  },

  async updateTrail(trail, updatedTrail) {
    const trailDoc = await Trail.findOne({ _id: trail._id });
    trailDoc.name = updatedTrail.name;
    trailDoc.category = updatedTrail.category;
    trailDoc.format = updatedTrail.format;
    trailDoc.difficulty = updatedTrail.difficulty;
    trailDoc.location = updatedTrail.location;
    trailDoc.latitude = updatedTrail.latitude;
    trailDoc.longitude = updatedTrail.longitude;
    trailDoc.distance = updatedTrail.distance;
    trailDoc.duration = updatedTrail.duration;
    await trailDoc.save();
  }
};
