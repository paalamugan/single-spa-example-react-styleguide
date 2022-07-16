# Single Spa React Styleguide Template

React Styleguide Template supports language translation, multiple MUI theme, Global store for all microfrontend single spa application.

## How to use it

- Install as a node module package like

  ```sh
  yarn add -D @single-spa-example/react-styleguide
  ```

- Add a below code line in your react microfrontend single-spa main file, That file name look like this `orgName-projectName.tsx`,

  ```ts
  import React from "react";
  import ReactDOM from "react-dom";
  import singleSpaReact from "single-spa-react";
  import { MfErrorBoundary, withAppContainer } from "@single-spa-example/react-styleguide";

  const MyComponent = () => <div>Hello World</div>;

  const lifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: withAppContainer(MyComponent),
    errorBoundary(err, info, props) {
      return <MfErrorBoundary name="MyComponent" err={err} info={info} props={props} />;
    },
  });

  export const { bootstrap, mount, unmount } = lifecycles;
  ```

## Getting started

- Supported Node Engine

```
node - v16.12.0
yarn - 1.22.19
```

- Install node_modules package for first time only

```sh
yarn install
```

- Run application in development mode

```sh
yarn start
```

- Run application as a standalone in development mode

```sh
yarn start:standalone
```

- To build for production

```sh
yarn build
```
