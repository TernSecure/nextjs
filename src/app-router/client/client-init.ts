import { getApps, initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { loadFireConfig, validateConfig } from './index';

// Initialize immediately
const app = (() => {
  const config = validateConfig(loadFireConfig());
  return getApps().length ? getApps()[0] : initializeApp(config);
})();

const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence); //to change later user should be able to choose persistance
const firestore = getFirestore(app);
const storage = getStorage(app);

export const TernSecureAuth = () => auth;
export const TernSecureFirestore = () => firestore;
export const TernSecureStorage = () => storage;