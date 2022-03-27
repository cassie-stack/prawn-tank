import { Express } from "express";
import express from "express";
import ControllerBase from "./Controllers/Base/ControllerBase";
import ControllerTags from "./Controllers/Models/ControllerTags";
import { PrismaClient } from "@prisma/client";
import { configuration } from "./Common/Configuration";
import { getLogger } from "./Common/logging";

const logger = getLogger("Application");

export default class Application {
  private express: Express | undefined;
  private prismaClient: PrismaClient | undefined;
  private readonly controllers: Array<ControllerBase> = [];

  public init(): Application {
    logger.info("Initializing application...");
    this.initExpress();
    this.initPrisma();
    this.initControllers();
    logger.info("Initialized.");

    return this;
  }

  public run(): Application {
    if (!this.express) {
      throw new Error("run init() first");
    }

    this.express.listen(configuration.apiPort, () => {
      logger.info(`Listening at http://localhost:${configuration.apiPort}...`);
      console.log(`Listening at http://localhost:${configuration.apiPort}...`);
    });

    return this;
  }

  private initExpress(): void {
    this.express = express();
    this.express.use(express.json());

    this.express.use((req, res, next) => {
      const requestLogger = logger.child({
        requestIP: req.ip,
        moduleName: "request",
      });
      requestLogger.info(`${req.method} ${req.originalUrl}`);
      next();
    });
  }

  private initPrisma(): void {
    this.prismaClient = new PrismaClient();
  }

  private initControllers(): void {
    if (!this.prismaClient) {
      throw new Error("run initPrisma() first");
    }

    this.registerController(new ControllerTags(this.prismaClient));
  }

  private registerController<T extends ControllerBase>(instance: T): void {
    if (!this.express) {
      throw new Error("run initExpress() first");
    }

    this.controllers.push(instance);
    instance.registerRoutes(this.express);
  }
}
