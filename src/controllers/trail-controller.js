import { db } from "../models/db.js";
import { TrailSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

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
      const loggedInUser = request.auth.credentials;
      
      if (!trail) {
        return h.redirect("/trails");
      }
      
      return h.view("trail-detail", {
        title: trail.name,
        trail: trail,
        isOwner: String(trail.userid) === String(loggedInUser._id),
      });
    },
  },
  
  addTrail: {
    validate: {
      payload: TrailSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const trails = await db.trailStore.getAllTrails();
        
        return h.view("trail-list", {
          title: "Add trail error",
          trails: trails,
          errors: error.details,
        }).takeover().code(400);
      },
    },
    
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      
      const newTrail = {
        ...request.payload,
        userid: loggedInUser._id,
      };
      
      await db.trailStore.addTrail(newTrail);
      return h.redirect("/trails");
    },
  },
  
  uploadImage: {
    handler: async function (request, h) {
      try {
        const trail = await db.trailStore.getTrailById(request.params.id);
        const file = request.payload.imagefile;

        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          trail.img = url;
          await db.trailStore.updateTrail(trail, trail);
        }

        return h.redirect(`/trails/${trail._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect("/trails");
      }
    },

    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  showEditTrail: {
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      const loggedInUser = request.auth.credentials;
      
      if (!trail || String(trail.userid) !== String(loggedInUser._id)) {
        return h.redirect("/trails");
      }
      
      return h.view("trail-edit", {
        title: "Edit trail",
        trail: trail,
      });
    },
  },
  
  updateTrail: {
    validate: {
      payload: TrailSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const trail = await db.trailStore.getTrailById(request.params.id);
        
        return h.view("trail-edit", {
          title: "Edit trail error",
          trail: trail,
          errors: error.details,
        }).takeover().code(400);
      },
    },
    
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      const loggedInUser = request.auth.credentials;
      
      if (!trail || String(trail.userid) !== String(loggedInUser._id)) {
        return h.redirect("/trails");
      }
      
      await db.trailStore.updateTrail(trail, request.payload);
      return h.redirect(`/trails/${trail._id}`);
    },
  },
  
  deleteTrail: {
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      const loggedInUser = request.auth.credentials;
      
      if (!trail || String(trail.userid) !== String(loggedInUser._id)) {
        return h.redirect("/trails");
      }
      
      await db.trailStore.deleteTrail(trail._id);
      return h.redirect("/trails");
    },
  },
};