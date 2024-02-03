import {
  Bag,
  BagItems,
  Config,
  ProductDetails,
  ShippingSimulation,
  UserInfo,
  VMDetails,
  VMDetailsRedirect,
} from "$store/packs/types.ts";
export default interface Ammo {
  "GET /api/bag": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-ammo-token"?: string;
      "x-api-key": string;
    };
  };
  "GET /api/config": {
    response: Config;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
      "x-ammo-token"?: string;
    };
  };
  "PUT /api/bag/item": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
      "x-ammo-token"?: string;
    };
    body: BagItems[];
  };
  "DELETE /api/bag/sku/:sku": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
      "x-ammo-token"?: string;
    };
  };
  "POST /api/bag/coupon/remove": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
      "x-ammo-token"?: string;
    };
  };
  "POST /api/bag/coupon": {
    response: Bag;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
      "x-ammo-token"?: string;
    };
    body: {
      coupon: string;
    };
  };
  "POST /api/bag/shipping/product-page": {
    response: ShippingSimulation;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
      "x-ammo-token"?: string;
      "Content-Type": "application/x-www-form-urlencoded";
    };
    body: URLSearchParams;
  };
  "GET /api/user": {
    response: UserInfo;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
      "x-ammo-token": string;
    };
  };
  "GET /api/product/sku/:sku": {
    response: ProductDetails;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
      "x-ammo-token": string;
    };
  };
  "GET /api/product-catalog/resolve-route": {
    response: VMDetails | VMDetailsRedirect;
    headers: {
      "x-ammo-device-id": string;
      "x-api-key": string;
      "x-ammo-token": string;
    };
  };
}
