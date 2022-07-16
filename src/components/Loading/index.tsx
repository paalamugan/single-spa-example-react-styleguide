import { CircularProgress } from "@single-spa-example/react-mui";

export function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CircularProgress size={50} />
    </div>
  );
}

export default Loading;
