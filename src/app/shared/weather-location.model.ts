export interface Weather {
    name: string;
    currentConditions: string;
    currentTemp?: number;
    maxTemp: number;
    minTemp: number;
    date?: Date;
    imgSrc: string;
}
