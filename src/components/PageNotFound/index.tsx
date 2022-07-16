import { HomeIcon, Box, Paper, Stack, IconButton, Typography } from "@single-spa-example/react-mui";
import { RouterLink } from "../RouterLink";

export function PageNotFound() {
  return (
    <Box>
      <Paper
        sx={{
          bgcolor: "background.default",
          m: 0,
          height: "calc(100vh - 515px)",
        }}>
        <Stack alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
          <Typography variant="h4">404</Typography>
          <Typography variant="subtitle1">Page not found</Typography>
          <RouterLink to="/">
            <IconButton color="secondary" aria-label="home" sx={{ mt: 10 }}>
              <HomeIcon />
            </IconButton>
          </RouterLink>
        </Stack>
      </Paper>
    </Box>
  );
}

export default PageNotFound;
