import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { trailController } from "./controllers/trail-controller.js";

export const webRoutes = [

    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },
    { method: "GET", path: "/about", config: aboutController.index },

    { method: "GET", path: "/trails", config: trailController.index },
    { method: "GET", path: "/trails/{id}", config: trailController.showTrail },
    { method: "GET", path: "/trails/{id}/edit", config: trailController.showEditTrail },
    { method: "POST", path: "/trails/{id}/edit", config: trailController.updateTrail },
    { method: "POST", path: "/trails/{id}/delete", config: trailController.deleteTrail },
    { method: "POST", path: "/trails/add", config: trailController.addTrail },
    { method: "POST", path: "/trails/{id}/uploadimage", config: trailController.uploadImage, },

    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }

];
