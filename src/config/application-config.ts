import * as dotenv from 'dotenv';

dotenv.config()

export class ApplicationConfig {

    getGoogleOAuthClientId(): string {
        return process.env.GOOGLE_OAUTH_CLIENT_ID;
    }

    getGoogleOAuthClientSecret(): string {
        return process.env.GOOGLE_OAUTH_CLIENT_SECRET;
    }

}