import {
  AMMO_DEVICE_ID_HEADER,
  AMMO_TOKEN_HEADER,
} from "$store/packs/constants.ts";

interface EndpointHeaderProps {
  ammoDeviceIdValue: string;
  ammoTokenValue: string;
}

export const returnApiHeader = ({
  ammoDeviceIdValue,
  ammoTokenValue,
}: EndpointHeaderProps): HeadersInit => ({
  [AMMO_DEVICE_ID_HEADER]: ammoDeviceIdValue,
  [AMMO_TOKEN_HEADER]: ammoTokenValue,
});
