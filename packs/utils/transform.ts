import { Product, ProductListingPage } from "apps/commerce/types.ts";

import { AmmoProduct, VMDetails, VMExtraDetails } from "$store/packs/types.ts";

interface toProductListingPageProps {
  vmDetails: VMDetails;
  url: URL;
  vmExtraDetails: VMExtraDetails;
}

export function toProduct(_ammaProduct: AmmoProduct): Product | null {
  //TODO: CONVERT API PRODUCT TO DECO INTERFACE
  return null;
}

export function toProductListingPage(
  { vmDetails, url, vmExtraDetails }: toProductListingPageProps,
): ProductListingPage | null {
  console.log(vmDetails, url, vmExtraDetails)
  return null;
}
