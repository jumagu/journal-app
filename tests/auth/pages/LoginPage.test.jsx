/* eslint-disable no-undef */

import { fireEvent, render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { MemoryRouter } from "react-router-dom";

import { authSlice } from "../../../src/store/auth";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartEmailPasswordSignIn = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startEmailPasswordSignIn: ({ email, password }) => {
    return () => mockStartEmailPasswordSignIn({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch:
    () =>
    (fn = () => {}) =>
      fn(),
}));

const store = configureStore({
  reducer: { auth: authSlice.reducer },
  preloadedState: { auth: notAuthenticatedState },
});

describe("Pruebas en <LoginPage />", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Debe mostrar el componente correctamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();

    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("Botón de Google debe llamar startGoogleSignIn()", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText("google-btn");
    fireEvent.click(googleBtn);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test("Botón de inicio de sesión debe llamar startEmailPasswordSignIn()", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const email = "juan@google.com";
    const password = "123456";

    const emailField = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByPlaceholderText(/Your password/i);
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const loginForm = screen.getByLabelText("login-form");
    fireEvent.submit(loginForm);

    expect(mockStartEmailPasswordSignIn).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
