import {
  transformSchema,
  astToString,
  GlobalContext,
} from "openapi-typescript";
import { resolveRef } from "openapi-typescript";
import { scanDiscriminators } from "openapi-typescript";
import { type OpenAPI3 } from "openapi-typescript";

export async function schemaToInterface(openApiSchema: OpenAPI3) {
  const options = { silent: false };
  const ctx = {
    injectFooter: [],
    discriminators: scanDiscriminators(openApiSchema, options),
    resolve($ref: string) {
      return resolveRef(openApiSchema, $ref, { silent: false });
    },
    immutable: true,
    ...options,
  };
  const openapi = await transformSchema(
    openApiSchema,
    ctx as unknown as GlobalContext,
  );
  return await astToString(openapi);
}
