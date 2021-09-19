import axios from "axios";
import { Get_PAST_LAUNCHES_URL } from "./utils";
import {
  dataLoadingAction,
  dataLoadingErrorAction,
  dataLoadingSuccessAction,
} from "../reducers/spacex-reducer";
import { LaunchDetails } from "./models";

export function fetchLaunchData() {
  return function (dispatch, getState) {
    dispatch(dataLoadingAction({ isLoading: true }));
    return axios
      .get(Get_PAST_LAUNCHES_URL)
      .then((response) => {
        let launchData = response.data.map(
          (details) => new LaunchDetails(details)
        );

        //sort by date
        launchData.sort((x, y) => x.launchDate - y.launchDate);
        //dispatch top 50
        dispatch(
          dataLoadingSuccessAction({ launchData: launchData.slice(0, 50) })
        );
      })
      .catch((response) => {
        dispatch(dataLoadingErrorAction({ dataLoadingErrorMsg: response }));
      });
  };
}
