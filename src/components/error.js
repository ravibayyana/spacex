import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Get_PAST_LAUNCHES_URL } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  loadingMargin: {
    margin: theme.spacing(2),
    color: theme.palette.error.dark,
  },
}));

export function OnError() {
  const classes = useStyles();
  const dataLoadingErrorMsg = useSelector(
    (state) => state.spaceX.dataLoadingErrorMsg
  );

  if (!dataLoadingErrorMsg) {
    return null;
  }

  return (
    <>
      <Typography
        style={{ textAlign: "center" }}
        className={classes.loadingMargin}
      >
        {`Error Loading Spacex Data. url: ${Get_PAST_LAUNCHES_URL}, ${dataLoadingErrorMsg.message}`}
      </Typography>
    </>
  );
}
