import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { playlistController } from "./controllers/playlist-controller.js";

export const router = express.Router();

router.get("/", dashboardController.index);
router.get("/dashboard", dashboardController.index);
router.post("/dashboard/addplaylist", dashboardController.addPlaylist);
router.get("/about", aboutController.index);
router.get("/playlist/:id", playlistController.index);
router.post("/playlist/:id/addtrack", playlistController.addTrack);
