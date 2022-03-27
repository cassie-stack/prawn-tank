import ControllerBase from "./ControllerBase";
import { Express } from "express";
import {
  assertArrayOptional,
  assertIntOptional,
  assertIntPositiveOptional,
  assertNonNull,
} from "../../Common/validation";
import { isNullOrUndefined } from "../../Common/predicates";
import { getLogger } from "../../Common/logging";

const logger = getLogger("ControllerModelBase");

export interface IControllerModelBaseOptions {
  baseUrl?: string;
  provideGet?: boolean;
  provideGetAll?: boolean;
  provideUpdate?: boolean;
  provideAdd?: boolean;
  provideRemove?: boolean;
}

export default abstract class ControllerModelBase<
  TRequest,
  TResponse
> extends ControllerBase {
  private static readonly controllerModelBaseOptionsDefaults: IControllerModelBaseOptions =
    {
      provideGet: true,
      provideGetAll: true,
      provideUpdate: true,
      provideAdd: true,
      provideRemove: true,
    };

  private readonly options: IControllerModelBaseOptions;

  public constructor(options: IControllerModelBaseOptions) {
    super();

    this.options = {
      ...ControllerModelBase.controllerModelBaseOptionsDefaults,
      ...options,
    };

    assertNonNull("baseUrl", this.options.baseUrl);
  }

  protected abstract getModels(
    id: number | undefined
  ): Promise<Iterable<TResponse>>;

  protected abstract updateModel(request: TRequest): Promise<void>;

  protected abstract addModel(request: TRequest): Promise<number>;

  protected abstract removeModel(id: number): Promise<void>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected abstract parseRequest(body: any): TRequest;

  private registerRouteGet(express: Express): void {
    if (this.options.provideGet) {
      let url: string;

      if (this.options.provideGetAll) {
        url = `${this.options.baseUrl}/get/:id?`;
      } else {
        url = `${this.options.baseUrl}/get/:id`;
      }

      express.get(url, async (req, res, next) => {
        try {
          const id = isNullOrUndefined(req.params.id)
            ? undefined
            : parseInt(req.params.id);

          assertIntPositiveOptional("id", id);

          logger.info(`Getting models by id ${JSON.stringify(id)}...`);

          if (!this.options.provideGetAll && isNullOrUndefined(id)) {
            throw new Error(
              `id cannot be null or undefined (provideGetAll is false)`
            );
          }

          const models = Array.from(await this.getModels(id));

          logger.info(`Got ${models.length} model(s).`);

          res.json({ status: true, models });
        } catch (e) {
          next(e);
        }
      });
    }
  }

  private registerRouteUpdate(express: Express): void {
    if (this.options.provideUpdate) {
      express.put(`${this.options.baseUrl}/update`, async (req, res, next) => {
        try {
          let requests: Array<TRequest> = [];

          if (Array.isArray(req.body)) {
            requests = req.body.map((i) => this.parseRequest(i));
            logger.info(`Updating ${requests.length} model(s)...`);
          } else {
            requests = [this.parseRequest(req.body)];
            logger.info(`Updating model... (${JSON.stringify(requests[0])})`);
          }

          for (const request of requests) {
            await this.updateModel(request);
          }

          logger.info(`Updated ${requests.length} model(s).`);

          res.json({ status: true });
        } catch (e) {
          next(e);
        }
      });
    }
  }

  private registerRouteAdd(express: Express): void {
    if (this.options.provideAdd) {
      express.post(`${this.options.baseUrl}/add`, async (req, res, next) => {
        try {
          let requests: Array<TRequest> = [];

          if (Array.isArray(req.body)) {
            requests = req.body.map((i) => this.parseRequest(i));
            logger.info(`Adding ${requests.length} model(s)...`);
          } else {
            requests = [this.parseRequest(req.body)];
            logger.info(`Adding model... (${JSON.stringify(requests[0])})`);
          }

          const ids: number[] = [];

          for (const request of requests) {
            ids.push(await this.addModel(request));
          }

          logger.info(`Added ${ids.length} model(s).`);

          res.json({ status: true, ids });
        } catch (e) {
          next(e);
        }
      });
    }
  }

  private registerRouteRemove(express: Express): void {
    if (this.options.provideRemove) {
      express.delete(
        `${this.options.baseUrl}/remove`,
        async (req, res, next) => {
          try {
            assertArrayOptional("body", req.body);

            logger.info(`Removing ${req.body.length} model(s) by id...`);

            for (const id of req.body) {
              assertNonNull("id", id);
              assertIntOptional("id", id);
              assertIntPositiveOptional("id", id);
              await this.removeModel(<number>id);
            }

            logger.info(`Removed ${req.body.length} model(s).`);

            res.json({ status: true });
          } catch (e) {
            next(e);
          }
        }
      );
    }
  }

  public registerRoutes(express: Express): void {
    this.registerRouteGet(express);
    this.registerRouteUpdate(express);
    this.registerRouteAdd(express);
    this.registerRouteRemove(express);
  }
}
