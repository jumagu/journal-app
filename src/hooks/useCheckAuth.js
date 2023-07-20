import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const { displayName, uid, email, photoURL } = user;

      dispatch(login({ displayName, uid, email, photoURL }));
      dispatch(startLoadingNotes());
    });
  }, []);

  return status;
};