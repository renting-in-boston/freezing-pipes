import * as dotenv from "dotenv";
import { singleton } from "tsyringe";

dotenv.config();

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

    getGoogleOAuthRedirectUrl(): string {
        return process.env.GOOGLE_OAUTH_REDIRECT_URL;
    }

    getImageDirectory(): string {
        return process.env.IMAGE_DIRECTORY;
    }
}
