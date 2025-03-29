import {getStopsTimes} from "@/lib/crtm/widgetApi";

interface StopTimesProps {
  stopId: string
}

export default async function StopTimes({stopId}: StopTimesProps) {
  try {
    const stopTimes = await getStopsTimes(stopId);
    const lineStatuses = stopTimes.linesStatus.LineStatus;
    const lineNames = lineStatuses.map((lineStatus) => lineStatus.line.shortDescription);
    const times = stopTimes.times.Time || [];

    return (
      <div>
        {times.map((time, index) => (
          <div key={`${stopId}-${index}`}>
            <div>{new Date(time.time).toLocaleTimeString()} - {time.line.shortDescription} - {time.destination}</div>
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