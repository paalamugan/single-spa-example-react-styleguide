/* eslint-disable no-console */
import { Box } from "@single-spa-example/react-mui";

export default function MfErrorBoundary({ name, err, info, props }) {
  console.error(err, info, props);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "4rem",
        padding: "0 1.5rem",
        color: "grey.900",
        bgcolor: "grey.100",
        width: "100%",
      }}>
      Error Occured in {name}. See browser console for more details.
    </Box>
  );
}
