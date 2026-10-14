import { v4 } from "uuid";

let trails = [];

export const trailMemStore = {
  async getAllTrails() {
    return trails;
  },

  async addTrail(trail) {
    trail._id = v4();;
    trails.push(trail);
    return trail;
  },

  async getTrailsByPlaylistId(id) {
    return trails.filter((trail) => trail.playlistid === id);
  },

  async getTrailById(id) {
    let foundTrail = trails.find((trail) => trail._id === id);
    if (!foundTrail) {
      foundTrail = null;
    }
    return foundTrail;
  },

  async getUserTrails(userId) {
    let foundTrails = trails.filter((trail) => trail.userid === userId);
    if (!foundTrails) {
      foundTrails = null;
    }
    return foundTrails;
  },

  async deleteTrail(id) {
    const index = trails.findIndex((trail) => trail._id === id);
    if (index !== -1) trails.splice(index, 1);
  },

  async deleteAllTrails() {
    trails = [];
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
  },
};
