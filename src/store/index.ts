import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { Reducers } from "./reducers";

const logger = createLogger();
const middlewares = [thunk, logger]

const Store = createStore(Reducers, composeWithDevTools(
    applyMiddleware(...middlewares)
));


export { default as Actions } from "./actions";

export default Store;