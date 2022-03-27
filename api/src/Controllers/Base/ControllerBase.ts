import { Express } from "express";

export default abstract class ControllerBase {
  public abstract registerRoutes(express: Express): void;
}
