import { auth } from "../../Services/firebase";
// import firebase from "firebase/app";
// import "firebase/auth";

export function Signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function SignIn(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function SignInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function SignInWithGithub() {
  const provider = new auth.GithubAuthProvider();
  return auth().signInWithPopup(provider);
}
export function logout() {
  return auth().signOut();
}
