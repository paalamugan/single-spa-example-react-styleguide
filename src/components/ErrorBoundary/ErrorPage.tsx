import { Container, CssBaseline, Typography } from "@single-spa-example/react-mui";

type ErrorPageProps = {
  error: { status: number; message: string };
};

function ErrorPage(props: ErrorPageProps): JSX.Element {
  const { error } = props;

  return (
    <Container sx={{ marginTop: "43vh" }}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: "2em",
            fontWeight: 300,
            "& strong": {
              fontWeight: 400,
            },
          }}>
          <strong>Error {error?.status || 500}</strong>: {error.message}
        </Typography>
      </Container>
    </Container>
  );
}

export { ErrorPage, type ErrorPageProps };
