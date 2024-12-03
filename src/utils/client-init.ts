import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeConfig} from './config';

// Initialize immediately
const config = initializeConfig();
const clientApp = initializeApp(config)
const auth = getAuth(clientApp);
setPersistence(auth, browserSessionPersistence); //to change later user should be able to choose persistance
const firestore = getFirestore(clientApp);
const storage = getStorage(clientApp);

export const TernSecureAuth = () => auth;
export const TernSecureFirestore = () => firestore;
export const TernSecureStorage = () => storage;