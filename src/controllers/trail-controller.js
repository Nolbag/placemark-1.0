import { db } from "../models/db.js";

export const trailController = {
  index: {
    handler: async function (request, h) {
      const trails = await db.trailStore.getAllTrails();
      return h.view("trail-list", {
        title: "Placemark Trails",
        user: request.auth.credentials,
        trails: trails,
      });
    },
  },
};