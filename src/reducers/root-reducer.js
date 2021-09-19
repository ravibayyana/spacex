import { combineReducers } from "redux";
import { spacexReducer } from "./spacex-reducer";

const rootReducer = combineReducers({ spaceX: spacexReducer });

export default rootReducer;
