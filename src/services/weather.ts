import { injectable } from "tsyringe";
import { ApplicationConfig } from "../config";

import axios from "axios";

export interface Location {
    lat: number;
    long: number;
}

@injectable()
export default class WeatherService {
    constructor(private readonly config: ApplicationConfig) {}
    async isDailyTempMinBelowPropertyThreshold(
        loc: Location,
        minTempDegrees: number
    ): Promise<boolean> {
        const WEATHER_UNITS = "imperial";
        const EXCLUDE_SECTIONS: string = "current,minutely,hourly,alerts";

        const apiToken = this.config.getOpenWeatherApiToken();
        const url =
            `http://api.openweathermap.org/data/2.5/onecall?` +
            `lat=${loc.lat}&lon=${loc.long}&units=${WEATHER_UNITS}` +
            `&exclude=${EXCLUDE_SECTIONS}&appid=${apiToken}`;

        try {
            const response = await axios.get(url);
            const dailyMinDegrees = response.data.daily[0].temp.min;
            return dailyMinDegrees <= minTempDegrees;
        } catch (error) {
            console.error("Unable to retrieve weather forecast");
        }
    }
}
