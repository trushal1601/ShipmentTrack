import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../RootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export default store;

// import {configureStore} from '@reduxjs/toolkit';
// import rootReducer from '../RootReducer';
// import {persistReducer, persistStore} from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage: persistStore,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);

// export default store;
