import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    onAuthStateChanged
  } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'
import firebaseConfig from './firebase-config.js'

// Initialize Firebase
initializeApp(firebaseConfig)


const auth = getAuth()

const createUser = async (email, password) => {
  const response = await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user
      return { error: false, data: user }
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      return { error: true, data: error }
    })
  return response
}

const logIn = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log(userCredential)
      // Signed in
      const user = userCredential.user
      return { error: false, data: user }
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      return { error: true, data: error }
    })
  return result
}

const change = async () => {
  const res = await onAuthStateChanged(auth, async (userCred) => {
    if(userCred) {
      const tokenId = await userCred.getIdToken().then(token=>{
        return token
      })
      localStorage.setItem('token', tokenId)
      return tokenId
    }
  })
  return res; 
}

export { createUser, logIn, change }
