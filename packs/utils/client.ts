import { Bag, BagItems } from "../types.ts";
export default interface Ammo {
  "GET /bag": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
    };
  };
  "PUT /bag/item": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
    };
    body: BagItems[];
  };
  "DELETE /bag/sku/:skuToRemove": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
    };
  };
  "POST /bag/coupon/remove": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
    };
  };
  "POST /bag/coupon": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
    };
    body: {
      coupon: string;
    };
  };
}
