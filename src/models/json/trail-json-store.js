import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const trailJsonStore = {
  async getAllTrails() {
    await db.read();
    return db.data.trails;
  },

  async addTrail(trail) {
    await db.read();
    trail._id = v4();
    db.data.trails.push(trail);
    await db.write();
    return trail;
  },

  async getTrailsByUserId(id) {
    await db.read();
    let foundTrails = db.data.trails.filter((trail) => trail.userid === id);
    if (!foundTrails) {
      foundTrails = null;
    }
    return foundTrails;
  },

  async getTrailById(id) {
    await db.read();
    let foundTrail = db.data.trails.find((trail) => trail._id === id);
    if (!foundTrail) {
      foundTrail = null;
    }
    return foundTrail;
  },

  async deleteTrail(id) {
    await db.read();
    const index = db.data.trails.findIndex((trail) => trail._id === id);
    if (index !== -1) db.data.trails.splice(index, 1);
    await db.write();
  },

  async deleteAllTrails() {
    db.data.trails = [];
    await db.write();
  },

  async updateTrail(trail, updatedTrail) {
    trail.name = updatedTrail.name;
    trail.category = updatedTrail.category;
    trail.format = updatedTrail.format;
    trail.difficulty = updatedTrail.difficulty;
    trail.location = updatedTrail.location;
    trail.latitude = updatedTrail.latitude;
    trail.longitude = updatedTrail.longitude;
    trail.distance = updatedTrail.distance;
    trail.duration = updatedTrail.duration;
    await db.write();
  }
};