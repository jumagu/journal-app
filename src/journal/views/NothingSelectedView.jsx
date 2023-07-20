import { StarOutline } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: { xs: "calc(100vw - 32px)", md: "calc(100vw - 48px)" },
        minHeight: {
          xs: "calc(100vh - 88px)",
          sm: "calc(100vh - 96px)",
          md: "calc(100vh - 112px)",
        },
        backgroundColor: "primary.main",
        borderRadius: 2,
        margin: { xs: 2, md: 3 },
        padding: 2
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: "white" }} />
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Typography color="white" variant="h5">
          Select or create a new entry
        </Typography>
      </Grid>
    </Grid>
  );
};