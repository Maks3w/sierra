import {GetStopsInformationResponse, GetStopsTimesResponse, Stop, StopTimes} from "@/components/crtm/types/Stop";

const TIMEOUT = 9000;

export const getLines = async (codLine: string): Promise<string[]> => {
  // codLine = 8__692___
  const response = await crtmFetch(`https://www.crtm.es/widgets/api/GetLines.php?codLine=${codLine}`);
  return await response.json();
}

export const getLinesInformation = async (codLine: string): Promise<string[]> => {
  // codLine = 8__692___
  const response = await crtmFetch(`https://www.crtm.es/widgets/api/GetLinesInformation.php?activeItinerary=1&codLine=${codLine}`);
  return await response.json();
}

export const getIncidentsAffectations = async (codLine: string): Promise<string[]> => {
  // codLine = 8__692___
  const response = await crtmFetch(`https://www.crtm.es/widgets/api/GetIncidentsAffectations.php?mode=8&codLine=${codLine}`);
  return await response.json();
}

export const getStopsInformation = async (stopId: string): Promise<Stop> => {
  const response = await crtmFetch(`https://www.crtm.es/widgets/api/GetStopsInformation.php?codStop=${stopId}`);
  const payload: GetStopsInformationResponse = await response.json();
  return payload.stops.StopInformation;
}

export const getStopsTimes = async (stopId: string): Promise<StopTimes> => {
  const response = await crtmFetch(`https://www.crtm.es/widgets/api/GetStopsTimes.php?codStop=${stopId}&type=1&orderBy=2&stopTimesByIti=3`);
  const payload: GetStopsTimesResponse = await response.json();
  // parse the time
  const {Time} = payload.stopTimes.times;
  if (Time) {
    Time.forEach((time) => {
      const date = new Date(time.time);
      time.time = date.toLocaleTimeString();
    });
  }
  // If stopTimes.linesStatus.LineStatus is not an array, make it an array
  if (!Array.isArray(payload.stopTimes.linesStatus.LineStatus)) {
    payload.stopTimes.linesStatus.LineStatus = [payload.stopTimes.linesStatus.LineStatus];
  }
  return payload.stopTimes;
}

const crtmFetch = async (url: string) => {
  return await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
}
