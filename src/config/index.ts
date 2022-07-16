import appConfig, { type AppConfig } from "./appConfig";
import defaultConfig from "./defaultConfig";

export { appConfig, type AppConfig };

const config = Object.freeze({
  ...defaultConfig,
  appConfig: appConfig,
});

export default config;
