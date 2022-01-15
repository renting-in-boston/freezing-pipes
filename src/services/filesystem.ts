import { injectable } from "tsyringe";
import { ApplicationConfig } from "../config";
import { readdir } from "fs/promises";
import { sample } from "lodash";

@injectable()
export class FilesystemService {
    constructor(private readonly config: ApplicationConfig) {}

    async pickRandomImageFile(): Promise<string> {
        return sample(await readdir(this.config.getImageDirectory()));
    }
}
