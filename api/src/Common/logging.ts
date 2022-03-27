import bunyan from "bunyan";

let logger: bunyan | undefined;

export function getLogger(moduleName: string): bunyan {
  if (!logger) {
    logger = bunyan.createLogger({
      name: "prawn-tank",
      src: process.env.API_DEBUG === "true",
      streams: [
        {
          type: "rotating-file",
          path: "prawn-tank-api.log",
          period: "1d",
          count: 30,
        },
      ],
    });
  }

  return logger.child({ moduleName });
}
