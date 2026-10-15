import { userMemStore } from "./mem/user-mem-store.js";
import { trailMemStore } from "./mem/trail-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { trailJsonStore } from "./json/trail-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { trailMongoStore } from "./mongo/trail-mongo-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";

export const db = {
  userStore: null,
  trailStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.trailStore = trailJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.trailStore = trailMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.trailStore = trailMemStore;
    }
  },
};