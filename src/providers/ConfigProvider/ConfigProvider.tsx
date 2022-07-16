import { createContext } from "react";
import { merge, cloneDeep } from "lodash";

import config, { type AppConfig } from "@app/config";

export const ConfigContext = createContext(null);

export const withConfig = (Component) => {
  const ChildComponent = (props) => {
    return (
      <ConfigContext.Consumer>
        {({ appConfig }) => {
          return <Component appConfig={appConfig} {...props} />;
        }}
      </ConfigContext.Consumer>
    );
  };

  return ChildComponent;
};

export default function ConfigProvider({
  appConfig,
  children,
}: {
  appConfig: AppConfig;
  children: React.ReactNode;
}) {
  const newConfig = cloneDeep(config);
  const mergeConfig = merge(newConfig, { appConfig });
  return <ConfigContext.Provider value={mergeConfig}>{children}</ConfigContext.Provider>;
}
