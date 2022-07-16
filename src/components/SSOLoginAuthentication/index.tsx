import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Typography, Stack, Container, Button, Box } from "@single-spa-example/react-mui";
import { setSession, useAppDispatch } from "@app/store";
import { useSession } from "@app/hooks";

export function SSOLoginAuthentication() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const provider = searchParams.get("provider") || "";
  const token = searchParams.get("token") || "";
  const user = searchParams.get("user") || "";

  const isValidProvider = ["google", "facebook", "github"].some((button: any) => {
    return provider.toLowerCase().includes(button);
  });

  const isDataValid = isValidProvider && !!token && !!user;

  const [isAuthenticationFailed, setIsAuthenticationFailed] = useState(false);

  const dispatch = useAppDispatch();
  const { isAuthenticated } = useSession();

  useEffect(() => {
    dispatch(setSession(null));

    if (!isDataValid) return;

    let userData = null;
    try {
      userData = JSON.parse(user);
    } catch (err) {}

    dispatch(
      setSession({
        auth: {
          provider,
          token,
        },
        user: userData,
      }),
    );
  }, [dispatch, isDataValid, provider, token, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        return navigate("/");
      }
      setIsAuthenticationFailed(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return !isDataValid && isAuthenticationFailed ? (
    <Container
      sx={{
        height: "calc(100vh - 515px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Stack>
        <Typography variant="h1" align="center">
          <Box component="span" role="img" aria-label="emoji">
            🔒
          </Box>{" "}
          Authentication failed
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button type="button" variant="contained" disableElevation onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </Box>
      </Stack>
    </Container>
  ) : null;
}

export default SSOLoginAuthentication;
