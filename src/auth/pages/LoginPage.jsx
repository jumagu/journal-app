import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  startEmailPasswordSignIn,
  startGoogleSignIn,
} from "../../store/auth/thunks";

import Google from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

import { useForm } from "../../hooks";

import { AuthLayout } from "../layout/AuthLayout";

const formData = {
  email: "",
  password: "",
};

const formValidations = {
  email: [(value) => value.length > 0, "Email is required"],
  password: [(value) => value.length > 0, "Password is required"],
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    formState,
    email,
    password,
    onInputChange,
    isFormValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const isAuthenticated = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    setIsFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startEmailPasswordSignIn(formState));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        aria-label="login-form"
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={email}
              placeholder="Your email"
              fullWidth
              onChange={onInputChange}
              error={!!emailValid && isFormSubmitted}
              helperText={isFormSubmitted ? emailValid : ""}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="Your password"
              fullWidth
              onChange={onInputChange}
              error={!!passwordValid && isFormSubmitted}
              helperText={isFormSubmitted ? passwordValid : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            marginTop={2}
            display={errorMessage ? "block" : "none"}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isAuthenticated}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                aria-label="google-btn"
                disabled={isAuthenticated}
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="center">
            <Link component={RouterLink} to="/auth/register" color="inherit">
              Don&apos;t have an account?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
