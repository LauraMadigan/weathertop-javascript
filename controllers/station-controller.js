import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      title: "Station",
      station: station
    };
    if (station.readings.length > 0) {
      response.render("station-view", viewData);
    } else {
      response.render("station-view-no-readings", viewData);
    }
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      code:  Number(request.body.code),
      temp:  Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    console.log(`adding reading ${newReading.code}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },

  async deleteReading(request, response) {
    const station = await stationStore.getStationById(request.params.stationid);
    const reading = await readingStore.getReadingById(request.params.readingid);
    readingStore.deleteReading(reading._id);
    response.redirect("/station/" + station._id);
  },

  async delete(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    stationStore.deleteStationById(station._id);
    response.redirect("/dashboard/");
  },
};
