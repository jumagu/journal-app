import {
  signInWithGoogle,
  signInWithEmailPassword,
  registerWithEmailPassword,
  firebaseLogout,
} from "../../firebase/providers";
import { clearNotesLogout } from "../journal";

import { checkingCredentials, logout, login } from "./";

export const checkingAuthentication = () => {
  return async (dispath) => {
    dispath(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispath) => {
    dispath(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok)
      return dispath(logout({ errorMessage: result.errorMessage }));

    dispath(login(result));
  };
};

export const startEmailPasswordSignIn = ({ email, password }) => {
  return async (dispath) => {
    dispath(checkingCredentials());

    const result = await signInWithEmailPassword({ email, password });

    if (!result.ok)
      return dispath(logout({ errorMessage: result.errorMessage }));

    dispath(login(result));
  };
};

export const startRegister = ({ username, email, password }) => {
  return async (dispath) => {
    dispath(checkingCredentials());

    const result = await registerWithEmailPassword({
      username,
      email,
      password,
    });

    if (!result.ok)
      return dispath(logout({ errorMessage: result.errorMessage }));

    dispath(login(result));
  };
};

export const startLogout = () => {
  return async (dispath) => {
    await firebaseLogout();

    dispath(clearNotesLogout());
    dispath(logout());
  };
};
