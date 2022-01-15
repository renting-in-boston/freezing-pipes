import * as dotenv from 'dotenv';
import { singleton } from 'tsyringe';

dotenv.config()

export interface Location {
    lat: number,
    long: number
};

@singleton()
export class ApplicationConfig {

    getGoogleOAuthClientId(): string {
        return process.env.GOOGLE_OAUTH_CLIENT_ID;
    }

    getGoogleOAuthClientSecret(): string {
        return process.env.GOOGLE_OAUTH_CLIENT_SECRET;
    }

    getOpenWeatherApiToken(): string {
        return process.env.OPEN_WEATHER_API_KEY;
    }

    getLocation(): Location {
        return {
            lat: parseFloat(process.env.WEATHER_LOCATION_LATITUDE),
            long: parseFloat(process.env.WEATHER_LOCATION_LONGITUDE),
        }
    }

    getGoogleOAuthRedirectUrl(): string {
        return process.env.GOOGLE_OAUTH_REDIRECT_URL;
    }

}
