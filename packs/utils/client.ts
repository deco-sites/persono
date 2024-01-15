import { Bag, BagItems } from "$store/packs/types.ts";
export default interface Ammo {
  "GET /api/bag": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
    };
  };
  "PUT /api/bag/item": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
    };
    body: BagItems[];
  };
  "DELETE /api/bag/sku/:skuToRemove": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
    };
  };
  "POST /api/bag/coupon/remove": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
    };
  };
  "POST /api/bag/coupon": {
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
