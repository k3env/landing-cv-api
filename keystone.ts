import { config } from "@keystone-6/core";
import { lists } from "./schema";
import { withAuth, session } from "./auth";
import { DatabaseProvider } from "@keystone-6/core/types";
import dotenv from "dotenv";

dotenv.config();

const {
  ASSET_BASE_URL: baseUrl = `http://localhost:3001`,
  DATABASE_URL: dbUri,
  SHADOW_DATABASE_URL: dbShadow,
} = process.env;

if (dbUri === undefined) {
  throw new Error("DATABASE_URL not specified");
}

export default withAuth(
  config({
    server: {
      cors: {
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE".split(","),
        credentials: true,
        allowedHeaders: ["*"],
      },
    },
    db: {
      provider: "mysql",
      url: dbUri,
      shadowDatabaseUrl: dbShadow,
      enableLogging: false,
    },
    lists,
    session,
    storage: {
      local: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${baseUrl}/images${path}`,
        serverRoute: {
          path: "/images",
        },
        storagePath: "public/images",
      },
    },
  })
);
