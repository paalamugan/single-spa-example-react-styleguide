import { Provider } from "react-redux";
import store from "@app/store/store";

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export const withStore = (Component) => {
  return function (props) {
    return (
      <StoreProvider>
        <Component {...props} />;
      </StoreProvider>
    );
  };
};
