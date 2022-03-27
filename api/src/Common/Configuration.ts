import { assertNonNull, assertStringOptional } from "./validation";
import { getLogger } from "./logging";

const logger = getLogger("Configuration");

export class Configuration {
  public readonly apiPort: number;
  public readonly apiDebug: boolean;

  public constructor() {
    assertNonNull("API_PORT", process.env.API_PORT);
    assertStringOptional("API_PORT", process.env.API_PORT);
    this.apiPort = parseInt(<string>process.env.API_PORT);
    logger.info(`apiPort = ${JSON.stringify(this.apiPort)}`);

    assertNonNull("API_DEBUG", process.env.API_DEBUG);
    assertStringOptional("API_DEBUG", process.env.API_DEBUG);
    this.apiDebug = process.env.API_DEBUG === "true";
    logger.info(`apiDebug = ${JSON.stringify(this.apiDebug)}`);
  }
}

export const configuration = new Configuration();
