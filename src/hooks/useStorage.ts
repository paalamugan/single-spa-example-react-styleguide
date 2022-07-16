import { useCallback, useState, useEffect } from "react";
import { getStorageKeyName } from "@app/utils";

export function useLocalStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key, defaultValue, storageObject) {
  const keyName = getStorageKeyName(key);
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(keyName);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(keyName);
    storageObject.setItem(keyName, JSON.stringify(value));
  }, [keyName, value, storageObject]);

  const removeValue = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, removeValue];
}
