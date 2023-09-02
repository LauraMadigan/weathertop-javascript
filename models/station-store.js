import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { beaufort, labelWindDirection, windChill, CelsiusToFarenheit, describeConditions } from "../utils/conversions.js";
import { min, max, getValuesForKey, getTrendIcon } from "../utils/analytics.js";
import { iconForCode } from "../utils/icons.js";

import { readingStore } from "./reading-store.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    let stations = db.data.stations;
    stations.forEach(async station => {
      await latestReadingsForStation(station);
    });
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
    let station = db.data.stations.find((station) => station._id === id);
    await latestReadingsForStation(station);
    return station;
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);

    let readings = await readingStore.getReadingsByStationId(id);
    readings.forEach(reading => {
      readingStore.deleteReading(reading._id);
    });

    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteStationsForUser(userId) {
    await db.read();
    let userStations = db.data.stations.filter((station) => station.userid === userId);
    userStations.forEach(station => {
      this.deleteStationById(station._id);
    });
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },

  async getStationsByUserId(userid) {
    await db.read();
    let stations = db.data.stations.filter((station) => station.userid === userid);
    stations = sortStationsAlphabetically(stations);
    stations.forEach(async station => {
      await latestReadingsForStation(station);
    });
    return stations;
  }

};

async function latestReadingsForStation(station) {
  station.readings = await readingStore.getReadingsByStationId(station._id);
  station.latestReading = await readingStore.getLatestReadingByStationId(station._id);
  station.graphData = await generateGraphData(station.readings);

  if (station.latestReading) {
    station.latestReading.beaufort = beaufort(station.latestReading.windSpeed);
    station.latestReading.labelWindDirection = labelWindDirection(station.latestReading.windDirection);
    station.latestReading.windChill = windChill(station.latestReading.temp, station.latestReading.windSpeed);
    station.latestReading.tempF = CelsiusToFarenheit(station.latestReading.temp);
    station.latestReading.condition = describeConditions(station.latestReading.code);
    station.latestReading.iconClass = iconForCode(station.latestReading.code);
    station.latestReading.maxTemp = max(getValuesForKey(station.readings, 'temp'));
    station.latestReading.minTemp = min(getValuesForKey(station.readings, 'temp'));
    station.latestReading.maxWindSpeed = max(getValuesForKey(station.readings, 'windSpeed'));
    station.latestReading.minWindSpeed = min(getValuesForKey(station.readings, 'windSpeed'));
    station.latestReading.maxPressure = max(getValuesForKey(station.readings, 'pressure'));
    station.latestReading.minPressure = min(getValuesForKey(station.readings, 'pressure'));
    station.latestReading.pressureTrendIcon = getTrendIcon('pressure', station.readings);
    station.latestReading.temperatureTrendIcon = getTrendIcon('temp', station.readings);
    station.latestReading.windTrendIcon = getTrendIcon('windSpeed', station.readings);
  }
  return station;
}

async function generateGraphData(readings) {
  let report = {};
  report.tempTrend = [];
  report.trendLabels = [];
  readings.forEach(reading => {
    report.tempTrend.push(reading.temp);
    const date = new Date(reading.timeStamp);
    report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` );
  });
  // console.log('report', report);
  return report;
}

function sortStationsAlphabetically(stations) {
  stations.sort(function (a, b) {
    // here a , b is whole object, you can access its property
    //convert both to lowercase
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();

    //compare the word which is comes first
    if (x > y) { return 1; }
    if (x < y) { return -1; }
    return 0;
  });

  return stations;
}