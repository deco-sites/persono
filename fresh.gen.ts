// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $live_invoke_middleware from "./routes/live/invoke/_middleware.tsx";
import * as $AddToCartButton_CartButton from "./islands/AddToCartButton/CartButton.tsx";
import * as $Header_Buttons from "./islands/Header/Buttons.tsx";
import * as $Header_Drawers from "./islands/Header/Drawers.tsx";
import * as $Header_Searchbar from "./islands/Header/Searchbar.tsx";
import * as $Newsletter from "./islands/Newsletter.tsx";
import * as $OutOfStock from "./islands/OutOfStock.tsx";
import * as $ProductImageZoom from "./islands/ProductImageZoom.tsx";
import * as $SearchControls from "./islands/SearchControls.tsx";
import * as $ShippingSimulation from "./islands/ShippingSimulation.tsx";
import * as $SliderJS from "./islands/SliderJS.tsx";
import * as $Sort from "./islands/Sort.tsx";
import * as $WishlistButton from "./islands/WishlistButton.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_app.tsx": $_app,
    "./routes/live/invoke/_middleware.tsx": $live_invoke_middleware,
  },
  islands: {
    "./islands/AddToCartButton/CartButton.tsx": $AddToCartButton_CartButton,
    "./islands/Header/Buttons.tsx": $Header_Buttons,
    "./islands/Header/Drawers.tsx": $Header_Drawers,
    "./islands/Header/Searchbar.tsx": $Header_Searchbar,
    "./islands/Newsletter.tsx": $Newsletter,
    "./islands/OutOfStock.tsx": $OutOfStock,
    "./islands/ProductImageZoom.tsx": $ProductImageZoom,
    "./islands/SearchControls.tsx": $SearchControls,
    "./islands/ShippingSimulation.tsx": $ShippingSimulation,
    "./islands/SliderJS.tsx": $SliderJS,
    "./islands/Sort.tsx": $Sort,
    "./islands/WishlistButton.tsx": $WishlistButton,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
