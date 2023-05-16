import config from "../../firebase.json";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";

const app = firebase.initializeApp(config);

const Auth = app.auth();

export const login = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const signUp = async ({ email, password }) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  return user;
};
