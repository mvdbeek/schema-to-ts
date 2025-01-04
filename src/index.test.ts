import { OpenAPI3 } from 'openapi-typescript';
import { schemaToInterface } from './index';

describe('schemaToInterface', () => {
  const mockSchema = {
    openapi: '3.0.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
    paths: {},
    components: {
        schemas: {
          DataCollectionPaired: {
            additionalProperties: false,
            properties: {
              forward: { $ref: "#/components/schemas/DataInternalJson" },
              reverse: { $ref: "#/components/schemas/DataInternalJson" },
            },
            required: ["forward", "reverse"],
            title: "DataCollectionPaired",
            type: "object",
          },
          DataInternalJson: {
            additionalProperties: false,
            properties: {
              class: {
                const: "File",
                enum: ["File"],
                title: "Class",
                type: "string",
              },
              basename: { title: "Basename", type: "string" },
              location: { title: "Location", type: "string" },
              path: { title: "Path", type: "string" },
              listing: {
                anyOf: [
                  { items: { type: "string" }, type: "array" },
                  { type: "null" },
                ],
                title: "Listing",
              },
              nameroot: {
                anyOf: [{ type: "string" }, { type: "null" }],
                title: "Nameroot",
              },
              nameext: {
                anyOf: [{ type: "string" }, { type: "null" }],
                title: "Nameext",
              },
              checksum: {
                anyOf: [{ type: "string" }, { type: "null" }],
                title: "Checksum",
              },
              size: { title: "Size", type: "integer" },
            },
            required: [
              "class",
              "basename",
              "location",
              "path",
              "listing",
              "nameroot",
              "nameext",
              "checksum",
              "size",
            ],
            title: "DataInternalJson",
            type: "object",
          },
          RecursiveDataCollectionInternalJson: {
            additionalProperties: {
              anyOf: [
                { $ref: "#/components/schemas/DataInternalJson" },
                {
                  $ref: "#/components/schemas/RecursiveDataCollectionInternalJson",
                },
              ],
            },
            title: "RecursiveDataCollectionInternalJson",
            type: "object",
          },
          inputs: {
            additionalProperties: false,
            properties: {
              parameter: {
                anyOf: [
                  {
                    items: { $ref: "#/components/schemas/DataInternalJson" },
                    type: "array",
                  },
                  { $ref: "#/components/schemas/DataCollectionPaired" },
                  {
                    $ref: "#/components/schemas/RecursiveDataCollectionInternalJson",
                  },
                ],
                title: "Parameter",
              },
            },
            required: ["parameter"],
            title: "",
            type: "object",
          },
        },
      },
  };

  it('should transform schema to TypeScript interface string', async () => {
    const result = await schemaToInterface(mockSchema as OpenAPI3);
    await expect(result).toContain("export interface components {")
    await expect(result).toContain("readonly inputs: {")
  });

});
