import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loadingMargin: {
    margin: theme.spacing(2),
  },
}));

export function Loading() {
  const classes = useStyles();
  const isLoading = useSelector((state) => state.spaceX.isLoading);

  if (!isLoading) return null;

  return (
    <>
      <CircularProgress color="secondary" />
      <Typography
        style={{ textAlign: "center" }}
        className={classes.loadingMargin}
      >
        Fetching data please wait...
      </Typography>
    </>
  );
}
