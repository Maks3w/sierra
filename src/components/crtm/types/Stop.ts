export interface GetStopsInformationResponse {
  stops: { StopInformation: Stop };
}

export interface Stop {
  codStop: string;
  name: string;
  lines: Line[];
  location: {
    lat: number;
    lng: number;
  };
  services: string[];
}

interface Line {
  lineId: string;
  destination: string;
  time: string;
}

export interface StopTimes {
  actualDate: string;
  stop: {
    codStop: string;
    shortCodStop: string;
    name: string;
    park: number;
    nightLinesService: number;
  };
  times: {
    Time?: Time[];
  };
  linesStatus: {
    LineStatus: LineStatus[];
  };
}

interface Time {
  line: {
    codLine: string;
    shortDescription: string;
    description: string;
    codMode: string;
    updateDate: string;
    updateKmlDate: string;
    nightService: number;
    active: boolean;
    shortItinerary: Record<string, unknown>;
    companyCode: string;
  };
  direction: number;
  destination: string;
  destinationStop: {
    codStop: string;
    shortCodStop: string;
    name: string;
    park: number;
    nightLinesService: number;
  };
  time: string;
  codVehicle: string;
  codIssue: string;
}

interface LineStatus {
  line: {
    codLine: string;
    shortDescription: string;
  };
  SAEStatus: boolean;
}

export interface GetStopsTimesResponse {
  stopTimes: StopTimes;
}