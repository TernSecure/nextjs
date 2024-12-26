import { initializeApp, getApps } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeConfig} from './config';

// Initialize immediately
const config = initializeConfig();
const clientApp = getApps().length === 0 ? initializeApp(config) : getApps()[0];
export const ternSecureAuth = getAuth(clientApp);
setPersistence(ternSecureAuth, browserSessionPersistence); //to change later user should be able to choose persistance
const firestore = getFirestore(clientApp);
const storage = getStorage(clientApp);



export const TernSecureAuth = () => ternSecureAuth;
export const TernSecureFirestore = () => firestore;
export const TernSecureStorage = () => storage;
