import { photoReducer } from "./reducer";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

const store = createStore(photoReducer, applyMiddleware(thunk));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
