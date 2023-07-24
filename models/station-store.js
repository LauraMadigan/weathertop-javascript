import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { beaufort, CelsiusToFarenheit, describeConditions } from "../utils/conversions.js";
import { readingStore } from "./reading-store.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  async addStation(station) {
    await db.read();
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getStationById(id) {
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    list.readings = await readingStore.getReadingsByStationId(list._id);
    list.latestReading = await readingStore.getLatestReadingByStationId(list._id);
    list.latestReading.beaufort = beaufort(list.latestReading.windSpeed);
    list.latestReading.tempF = CelsiusToFarenheit(list.latestReading.temp);
    list.latestReading.condition = describeConditions(list.latestReading.code);
    return list;
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },
};
