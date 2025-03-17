export interface Webcam {
    name: string;
    providerName: string;
    providerImage: string;
    refreshInterval: number;
    delayTime: number;
    url: string;
}

export interface SocialNetwork {
  twitter?: string;
}

export interface Place {
  name: string;
  webcams: Webcam[];
  infoNieve?: number;
  socialNetwork?: SocialNetwork;
}
