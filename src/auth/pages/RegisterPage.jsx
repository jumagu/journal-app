import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Link,
  Grid,
  Alert,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useForm } from "../../hooks";

import { AuthLayout } from "../layout/AuthLayout";

import { startRegister } from "../../store/auth/thunks";

const formData = {
  username: "",
  email: "",
  password: "",
};

const emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

const formValidations = {
  username: [(value) => value.length > 0, "Username is required"],
  email: [(value) => emailRegex.test(value), "Please enter a valid email"],
  password: [
    (value) => value.length >= 6,
    "Password must be 6 or more characters",
  ],
};

export const RegisterPage = () => {
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
    username,
    email,
    password,
    onInputChange,
    isFormValid,
    usernameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const isAuthenticated = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    setIsFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startRegister(formState));
  };

  return (
    <AuthLayout title="Register">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Username"
              type="text"
              name="username"
              value={username}
              placeholder="Your username"
              fullWidth
              onChange={onInputChange}
              error={!!usernameValid && isFormSubmitted}
              helperText={isFormSubmitted ? usernameValid : ""}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
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

          <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isAuthenticated}
            >
              Register
            </Button>
          </Grid>

          <Grid container direction="row" justifyContent="center">
            <Link component={RouterLink} to="/auth/login" color="inherit">
              Already have an account?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};