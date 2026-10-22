import { db } from "../models/db.js";

export const trailController = {
  index: {
    handler: async function (request, h) {
      const trails = await db.trailStore.getAllTrails();
      const { category, format, difficulty } = request.query;

      const filteredTrails = trails.filter((trail) => (
        (!category || trail.category === category)
        && (!format || trail.format === format)
        && (!difficulty || trail.difficulty === difficulty)
      ));

      return h.view("trail-list", {
        title: "Placemark Trails",
        user: request.auth.credentials,
        trails: filteredTrails,
        selectedCategory: category,
        selectedFormat: format,
        selectedDifficulty: difficulty,
      });
    },
  },

  showTrail: {
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      if (!trail) {
        return h.redirect("/trails");
      }

      return h.view("trail-detail", {
        title: trail.name,
        trail: trail,
      });
    },
  },
};