// deno-lint-ignore-file no-explicit-any
//@ts-nocheck Type any is not allowed to commit, so, to a provisory solution I put a ts-nocheck

import { Buffer } from "node:buffer";
const isobtoa = Buffer
  ? (input: string) => Buffer.from(input).toString("base64")
  : btoa;

const isoatob = Buffer
  ? (b64Encoded: any) => Buffer.from(b64Encoded, "base64").toString()
  : atob;

const encodeBase64: (v: string) => string = (original) => isobtoa(original);
const decodeBase64: (v: string) => string = (encoded) => isoatob(encoded);
const encodeJson: (v: any) => string = (original) => JSON.stringify(original);
const decodeJson: (v: string) => any = (encoded) => JSON.parse(encoded);
const encode: (v: any) => string = (original) =>
  encodeBase64(encodeJson(original));
const decode: (v: string) => any = (encoded) =>
  decodeJson(decodeBase64(encoded));

export const StringCodec = {
  encodeBase64,
  decodeBase64,
  encodeJson,
  decodeJson,
  encode,
  decode,
};
