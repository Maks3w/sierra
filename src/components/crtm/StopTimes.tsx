import {getStopsTimes} from "@/lib/crtm/widgetApi";
import {formatTime} from "@/lib/viewHelpers/dateHelpers";

interface StopTimesProps {
  stopId: string
}

async function fetchStopTimes(stopId: string) {
  const stopTimes = await getStopsTimes(stopId);
  const lineStatuses = stopTimes.linesStatus.LineStatus;
  const lineNames = lineStatuses.map((lineStatus) => lineStatus.line.shortDescription);
  const times = stopTimes.times.Time || [];
  return { times, lineNames };
}

function getLastStop(destination: string) {
  const stops = destination.split('-');
  return stops[stops.length - 1];
}

export default async function StopTimes({stopId}: StopTimesProps) {
  try {
    const { times, lineNames } = await fetchStopTimes(stopId);

    return (
      <div>
        {times.map((time, index) => (
          <div key={`${stopId}-${index}`}>
            <div>{formatTime(new Date(time.time))} - {time.line.shortDescription} - {getLastStop(time.destination)}</div>
          </div>
        ))}
        {times.length === 0 && (
          <div>No hay tiempos de paso para las lineas {lineNames.join(', ')}</div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch stop times:", error);
    return <div>Error fetching stop times. Please try again later.</div>;
  }
}
