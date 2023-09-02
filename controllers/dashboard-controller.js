import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { accountsController } from "./accounts-controller.js";
import { stationController, getGeneratedReading } from "./station-controller.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    let stations = await stationStore.getStationsByUserId(loggedInUser._id);
    const viewData = {
      title: "Station Dashboard",
      stations: stations,
      user: loggedInUser
    };
    console.log("dashboard rendering");
    if (stations.length > 0) {
      response.render("dashboard-view", viewData);
    } else {
      // no stations
      response.render("dashboard-view-no-stations", viewData);
    }
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      name: request.body.name,
      lat: request.body.lat,
      long: request.body.long,
      userid: loggedInUser._id
    };
    console.log(`adding station ${newStation.name}`);
    let station = await stationStore.addStation(newStation);
    let generatedReading = await getGeneratedReading(station);
    await readingStore.addReading(station._id, generatedReading);
    response.redirect("/dashboard");
  },
};
