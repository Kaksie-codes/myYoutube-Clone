import React from 'react'
import { auth } from '../../firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GoogleButton } from 'react-google-button'
import logo from '../../assets/youtube__logo-sm.svg'
import './loginscreen.css'


const LoginScreen = () => {
  const provider = new GoogleAuthProvider();  
  
  function handleClick(){    
    signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  return (
    <div className='loginscreen'>
        <div className="loginscreen__modal">
          <img src={logo} alt="youtube logo" />
          <h3>Youtube Clone</h3>
          <GoogleButton onClick={handleClick}/>
        </div>
    </div>
  )
}

export default LoginScreen