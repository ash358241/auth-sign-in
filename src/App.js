import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); 
}


function App() {
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();


  const [user, setUser] = useState({});

  //google sign in
  const handleGoogleSignIn = () => {
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    console.log(user);
    setUser(user);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage, email);
  });
  }

  //facebook sign in
  const handleFacebookSignIn = () => {
    firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var user = result.user;
    var accessToken = credential.accessToken;
    console.log('fb user', user);
    setUser(user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage, email);

  });
  }

  //github sign in
  //for accessing github sign in, you do need to use a different email which has github.
  const handleGithubSignIn = () => {
    firebase
  .auth()
  .signInWithPopup(ghProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    setUser(user);
    console.log('github user', user);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage, email);
  });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>SignInWithGoogle</button>
      <br/>
      <button onClick={handleFacebookSignIn}>SignInWithFacebook</button>
      <br/>
      <button onClick={handleGithubSignIn}>SignInWithGithub</button>
      <h1>{user.displayName}</h1>
      <h3>{user.email}</h3>
      <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
