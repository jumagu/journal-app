/* eslint-disable no-undef */

import {
  authenticatedState,
  demoUser,
  initialState,
} from "../../fixtures/authFixtures";

import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";

describe("Pruebas en el AuthSlice", () => {
  test("Debe regresar el estado inicial y llamarse auth", () => {
    expect(authSlice.name).toBe("auth");

    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("Debe realizar el login", () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      status: "authenticated",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("Debe realizar el logout()", () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });

  test("Debe realizar el logout() y mostrar un mensaje de error", () => {
    const errorMessage = "Credenciales no son correctas";

    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage,
    });
  });

  test("Debe cambiar el estado a 'checking'", () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    expect(state.status).toBe("checking");
  });
});
