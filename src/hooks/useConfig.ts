import { useContext } from "react";
import { ConfigContext } from "@app/providers/ConfigProvider";

export function useConfig() {
  return useContext(ConfigContext);
}
