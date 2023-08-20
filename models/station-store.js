import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { beaufort, labelWindDirection, windChill, CelsiusToFarenheit, describeConditions } from "../utils/conversions.js";
import { min, max, getValuesForKey } from "../utils/analytics.js";

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

    if (list.latestReading) {
      list.latestReading.beaufort = beaufort(list.latestReading.windSpeed);
      list.latestReading.labelWindDirection = labelWindDirection(list.latestReading.windDirection);
      list.latestReading.windChill = windChill(list.latestReading.temp, list.latestReading.windSpeed);
      list.latestReading.tempF = CelsiusToFarenheit(list.latestReading.temp);
      list.latestReading.condition = describeConditions(list.latestReading.code);
      list.latestReading.maxTemp = max(getValuesForKey(list.readings, 'temp'));
      list.latestReading.minTemp = min(getValuesForKey(list.readings, 'temp'));
      list.latestReading.maxWindSpeed = max(getValuesForKey(list.readings, 'windSpeed'));
      list.latestReading.minWindSpeed = min(getValuesForKey(list.readings, 'windSpeed'));
      list.latestReading.maxPressure = max(getValuesForKey(list.readings, 'pressure'));
      list.latestReading.minPressure = min(getValuesForKey(list.readings, 'pressure'));
    }

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
