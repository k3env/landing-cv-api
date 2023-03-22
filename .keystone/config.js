"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
function authOnly({ session: session2 }) {
  if (session2 === void 0)
    return false;
  return true;
}
var lists = {
  User: (0, import_core.list)({
    access: {
      operation: {
        query: import_access.allowAll,
        create: authOnly,
        update: authOnly,
        delete: authOnly
      }
    },
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Tag: (0, import_core.list)({
    access: {
      operation: {
        query: import_access.allowAll,
        create: authOnly,
        update: authOnly,
        delete: authOnly
      }
    },
    fields: {
      name: (0, import_fields.text)(),
      projects: (0, import_fields.relationship)({ ref: "Project.tags", many: true })
    }
  }),
  Image: (0, import_core.list)({
    access: {
      operation: {
        query: import_access.allowAll,
        create: authOnly,
        update: authOnly,
        delete: authOnly
      }
    },
    ui: {
      isHidden: false
    },
    fields: {
      image: (0, import_fields.image)({
        storage: "local"
      }),
      label: (0, import_fields.text)(),
      projects: (0, import_fields.relationship)({ ref: "Project.images", many: true })
    }
  }),
  Profile: (0, import_core.list)({
    isSingleton: true,
    access: {
      operation: {
        query: import_access.allowAll,
        create: authOnly,
        update: authOnly,
        delete: authOnly
      }
    },
    fields: {
      name: (0, import_fields.text)(),
      profilePhoto: (0, import_fields.image)({ storage: "local" }),
      labels: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      bioPhoto: (0, import_fields.image)({ storage: "local" }),
      bioHeader: (0, import_fields.text)(),
      bioProfile: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1, 1],
          [1, 1, 2],
          [1, 2, 1],
          [1, 1, 1, 1]
        ],
        links: true,
        dividers: true
      }),
      degree: (0, import_fields.select)({
        type: "enum",
        options: [
          { label: "Intern", value: "Intern" },
          { label: "Junior", value: "Junior" },
          { label: "Middle", value: "Middle" },
          { label: "Senior", value: "Senior" },
          { label: "Lead", value: "Lead" }
        ]
      }),
      birth: (0, import_fields.timestamp)({}),
      experience: (0, import_fields.text)(),
      phone: (0, import_fields.text)({}),
      email: (0, import_fields.text)({}),
      address: (0, import_fields.text)({}),
      freelancer: (0, import_fields.checkbox)({})
    }
  }),
  Project: (0, import_core.list)({
    access: {
      operation: {
        query: import_access.allowAll,
        create: authOnly,
        update: authOnly,
        delete: authOnly
      }
    },
    fields: {
      title: (0, import_fields.text)({}),
      description: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      images: (0, import_fields.relationship)({
        ref: "Image.projects",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["image"],
          inlineEdit: { fields: ["image"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["image"] }
        }
      }),
      tags: (0, import_fields.relationship)({
        // we could have used 'Tag', but then the relationship would only be 1-way
        ref: "Tag.projects",
        // a Post can have many Tags, not just one
        many: true,
        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var {
  ASSET_BASE_URL: baseUrl = `http://localhost:3001`,
  DATABASE_URL: dbUri,
  SHADOW_DATABASE_URL: dbShadow
} = process.env;
if (dbUri === void 0) {
  throw new Error("DATABASE_URL not specified");
}
var keystone_default = withAuth(
  (0, import_core2.config)({
    server: {
      cors: {
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE".split(","),
        credentials: true,
        allowedHeaders: ["*"]
      }
    },
    db: {
      provider: "mysql",
      url: dbUri,
      shadowDatabaseUrl: dbShadow,
      enableLogging: false
    },
    lists,
    session,
    storage: {
      local: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${baseUrl}/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "public/images"
      }
    }
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
