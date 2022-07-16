import moment from "moment";
import { snakeCase } from "lodash";
import config from "@app/config";

export function isTokenExpired(expiresIn?: string) {
  let expiresDate = moment().add("1", "d").valueOf();
  if (!expiresIn) {
    return moment().isAfter(expiresDate);
  }

  const expiresAt = JSON.parse(expiresIn);
  expiresDate = moment(expiresAt).valueOf();

  return moment().isAfter(expiresDate);
}

export function getStorageKeyName(key: string): string {
  const prefix: string = snakeCase(`${config.localStoragePrefix}:${key}`);
  return prefix.toUpperCase();
}
