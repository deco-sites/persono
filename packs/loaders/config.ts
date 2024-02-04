// deno-lint-ignore-file no-explicit-any
import { AppContext } from "$store/apps/site.ts";
import { Config } from "$store/packs/types.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";

export interface Props {
  fields: string[];
}

function getConfigValues(obj: Config, propertyList: string[][]): Config {
  return propertyList.reduce((newConfig, properties) => {
    const currentValue = getPropertyValue(obj, properties);

    if (currentValue !== undefined) {
      assignProperty(newConfig, properties, currentValue);
    }

    return newConfig;
  }, {} as Config);
}

function getPropertyValue(obj: any, properties: string[]): any {
  return properties.reduce((currentValue, property) => {
    return currentValue && currentValue[property];
  }, obj);
}

function assignProperty(obj: any, properties: string[], value: any): void {
  properties.reduce((currentObj, property, index, arr) => {
    if (!currentObj[property]) {
      currentObj[property] = index === arr.length - 1 ? value : {};
    }

    return currentObj[property];
  }, obj);
}

const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Partial<Config>> => {
  const { ammoc, apiKey } = ctx;

  const headers = getHeaders(req, apiKey);

  const storeConfigs = props.fields.map((item) => item.split("."));
  try {
    const response = await ammoc
      ["GET /api/config"](
        {
          headers: headers,
        },
      );

    const config = await response.json();

    const selectedFields = getConfigValues(config, storeConfigs);

    return selectedFields;
  } catch (error) {
    throw new Error(error);
  }
};

export default loader;
