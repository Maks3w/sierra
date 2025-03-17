import {GetStopsInformationResponse, GetStopsTimesResponse, Stop, StopTimes} from "@/components/crtm/types/Stop";

const TIMEOUT = 9000;

export const getStopsInformation = async (stopId: string): Promise<Stop> => {
  const response = await fetch(`https://www.crtm.es/widgets/api/GetStopsInformation.php?codStop=${stopId}`, { signal: AbortSignal.timeout(TIMEOUT) });
  const payload: GetStopsInformationResponse = await response.json();
  return payload.stops.StopInformation;
}

export const getStopsTimes = async (stopId: string): Promise<StopTimes> => {
  const response = await fetch(`https://www.crtm.es/widgets/api/GetStopsTimes.php?codStop=${stopId}&type=1&orderBy=2&stopTimesByIti=3`, { signal: AbortSignal.timeout(TIMEOUT) });
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
