export interface Webcam {
    name: string;
    providerName: string;
    providerImage: string;
    refreshInterval: number;
    delayTime: number;
    url: string;
}

export interface Peak {
    name: string;
    webcams: Webcam[];
}
