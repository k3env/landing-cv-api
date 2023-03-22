// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image,
  checkbox,
} from "@keystone-6/core/fields";

// the document field is a more complicated field, so it has it's own package
import { document } from "@keystone-6/fields-document";
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from ".keystone/types";

function authOnly({ session }: { session?: unknown }) {
  if (session === undefined) return false;
  return true;
}

export const lists: Lists = {
  User: list({
    access: {
      operation: {
        query: allowAll,
        create: authOnly,
        update: authOnly,
        delete: authOnly,
      },
    },
    fields: {
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
      }),
      password: password({ validation: { isRequired: true } }),
      createdAt: timestamp({
        defaultValue: { kind: "now" },
      }),
    },
  }),
  Tag: list({
    access: {
      operation: {
        query: allowAll,
        create: authOnly,
        update: authOnly,
        delete: authOnly,
      },
    },
    fields: {
      name: text(),
      projects: relationship({ ref: "Project.tags", many: true }),
    },
  }),
  Image: list({
    access: {
      operation: {
        query: allowAll,
        create: authOnly,
        update: authOnly,
        delete: authOnly,
      },
    },
    ui: {
      isHidden: false,
    },
    fields: {
      image: image({
        storage: "local",
      }),
      label: text(),
      projects: relationship({ ref: "Project.images", many: true }),
    },
  }),
  Profile: list({
    isSingleton: true,
    access: {
      operation: {
        query: allowAll,
        create: authOnly,
        update: authOnly,
        delete: authOnly,
      },
    },
    fields: {
      name: text(),
      profilePhoto: image({ storage: "local" }),
      labels: text({ ui: { displayMode: "textarea" } }),
      bioPhoto: image({ storage: "local" }),
      bioHeader: text(),
      bioProfile: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1, 1],
          [1, 1, 2],
          [1, 2, 1],
          [1, 1, 1, 1],
        ],
        links: true,
        dividers: true,
      }),
      degree: select({
        type: "enum",
        options: [
          { label: "Intern", value: "Intern" },
          { label: "Junior", value: "Junior" },
          { label: "Middle", value: "Middle" },
          { label: "Senior", value: "Senior" },
          { label: "Lead", value: "Lead" },
        ],
      }),
      birth: timestamp({}),
      experience: text(),
      phone: text({}),
      email: text({}),
      address: text({}),
      freelancer: checkbox({}),
    },
  }),
  Project: list({
    access: {
      operation: {
        query: allowAll,
        create: authOnly,
        update: authOnly,
        delete: authOnly,
      },
    },
    fields: {
      title: text({}),
      description: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      images: relationship({
        ref: "Image.projects",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["image"],
          inlineEdit: { fields: ["image"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["image"] },
        },
      }),
      tags: relationship({
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
          inlineCreate: { fields: ["name"] },
        },
      }),
    },
  }),
};
