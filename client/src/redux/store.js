
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // localStorage par défaut

const rootReducer= combineReducers({ user:userReducer });

// Configuration de la persistance
const persistConfig = {
  key: 'root', // Clé unique pour identifier le state persisté
  storage, // Définir le moteur de stockage (localStorage par défaut)
  // whitelist: ['counter'], // Seuls les reducers 'counter' seront persistés
  version:1
};

// Créer un reducer persisté
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({

  reducer: persistedReducer,

})

export const persistor = persistStore(store);