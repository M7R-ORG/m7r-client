import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { authReducer, systemReducer, signalRReducer, userReducer, sectionReducer } from './_exports'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['system', 'auth']
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  system: systemReducer,
  signalR: signalRReducer,
  section: sectionReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

const persistor = persistStore(store)

export { store, persistor }
