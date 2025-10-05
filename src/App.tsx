import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./App.css";
import Home from "./Components/pages/Home";
import { SpeedInsights } from "@vercel/speed-insights/next"

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#6366f1",
      },
      secondary: {
        main: "#ec4899",
      },
      background: {
        default: "#f8fafc",
      },
    },
    typography: {
      fontFamily: '"serif", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(45deg, #6366f1 30%, #ec4899 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Task Manager
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Organize your tasks efficiently
            </Typography>
          </Box>
          <Home />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
