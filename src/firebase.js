import firebase from 'firebase/compat/app'
import { getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
}

/* export default firebase.initializeApp(firebaseConfig); */

const initializeAppIfNecessary = () => {
  try {
    return getApp()
  } catch {
    return firebase.initializeApp(firebaseConfig)
  }
}
let app = initializeAppIfNecessary()

export const clientAuth = getAuth(app)
export const Db = firebase.firestore()
