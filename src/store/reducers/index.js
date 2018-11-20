import { combineReducers } from "redux";
import teamOneReducer from "./teamOne";

const rootReduce = combineReducers({
  team1Roster: teamOneReducer
});

export default rootReduce;
