import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { useStore } from "react-redux";
import { fetchLaunchData } from "../utils/fetchData";
import { Loading } from "./loading";
import { OnError } from "./error";
import { SpaceXDataGrid } from "./spacexGrid";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

export function Main() {
  const store = useStore();
  const classes = useStyles();

  useEffect(() => {
    store.dispatch(fetchLaunchData());
  }, [store]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2" className={classes.title}>
            Recent 50 SpaceX Launch Information
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item sm>
          <Grid
            container
            xs={12}
            item
            alignItems="center"
            justifyContent="center"
          >
            <Loading />
            <OnError />
            <SpaceXDataGrid />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
