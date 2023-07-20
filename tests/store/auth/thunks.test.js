/* eslint-disable no-undef */

import {
  signInWithGoogle,
  signInWithEmailPassword,
  firebaseLogout,
} from "../../../src/firebase/providers";

import { demoUser } from "../../fixtures/authFixtures";

import { checkingCredentials, login, logout } from "../../../src/store/auth";
import {
  checkingAuthentication,
  startEmailPasswordSignIn,
  startGoogleSignIn,
  startLogout,
} from "../../../src/store/auth/thunks";

import { clearNotesLogout } from "../../../src/store/journal/journalSlice";

jest.mock("../../../src/firebase/providers");

describe("Pruebas en los thunks de autenticación", () => {
  const dispath = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("Debe invocar el checkingCredentials", async () => {
    await checkingAuthentication()(dispath);

    expect(dispath).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn debe llamar checkingCredentials() y login() - Éxito", async () => {
    const loginData = { ok: true, ...demoUser };

    await signInWithGoogle.mockResolvedValue(loginData);

    // Thunk
    await startGoogleSignIn()(dispath);

    expect(dispath).toHaveBeenCalledWith(checkingCredentials());
    expect(dispath).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSignIn debe llamar checkingCredentials() y logout() - Error", async () => {
    const loginData = { ok: false, errorMessage: "Google error" };

    await signInWithGoogle.mockResolvedValue(loginData);

    // Thunk
    await startGoogleSignIn()(dispath);

    expect(dispath).toHaveBeenCalledWith(checkingCredentials());
    expect(dispath).toHaveBeenCalledWith(
      logout({ errorMessage: loginData.errorMessage })
    );
  });

  test("startEmailPasswordSignIn debe llamar checkingCredentials() y login() - Éxito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };

    await signInWithEmailPassword.mockResolvedValue(loginData);

    await startEmailPasswordSignIn(formData)(dispath);

    expect(dispath).toHaveBeenCalledWith(checkingCredentials());
    expect(dispath).toHaveBeenCalledWith(login(loginData));
  });

  test("startLogout debe llamar firebaseLogout(), clearNotesLogout(), logout()", async () => {
    await startLogout()(dispath);

    expect(firebaseLogout).toHaveBeenCalled();
    expect(dispath).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispath).toHaveBeenCalledWith(logout());
  });
});
