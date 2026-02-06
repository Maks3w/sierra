export interface Webcam {
    name: string;
    providerName: string;
    providerImage: string;
    refreshInterval: number;
    delayTime: number;
    url: string;
    needsProxy?: boolean;
    headers?: Record<string, string>;
}

export interface SocialNetwork {
    twitter?: string;
}

export enum PublicTransportType {
    BUS = "bus",
    TRAIN = "train",
}

export enum PublicTransportDirection {
    BOTH = "both",
    UP = "up",
    DOWN = "down",
}

export interface PublicTransport {
    type: PublicTransportType;
    id: string;
    direction: string;
}

export interface Weather {
  type: string;
  value: string;
}

export interface Place {
    name: string;
    webcams: Webcam[];
    infoNieve?: number;
    socialNetwork: SocialNetwork;
    publicTransport: PublicTransport[];
    weather: Weather[];
}
