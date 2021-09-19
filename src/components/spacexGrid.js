import React, { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { getDateFormat, dateComparer } from "../utils/utils";
import RocketDetailsRenderer from "../renderers/rocketDetailsRenderer";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(3),
  },
  searchBox: {
    margin: theme.spacing(1),
    width: "100%",
  },

  grid: {
    margin: theme.spacing(1),
    width: "100%",
    height: 600,
  },
}));

export function SpaceXDataGrid() {
  const classes = useStyles();
  const spacexLaunchData = useSelector((state) => state.spaceX.launchData);
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (spacexLaunchData.length === 0) {
      setRowData((previousData) => {
        previousData.splice(0);
        return [...previousData];
      });
      return;
    }

    let mappedData = spacexLaunchData.map((launchData) => {
      return {
        launchName: launchData.launchName,
        launchDate: launchData.launchDate,
        rocketDetails: launchData.rocketDetails,
      };
    });

    setRowData((previousData) => {
      previousData.splice(0);
      return [...previousData, ...mappedData];
    });
  }, [spacexLaunchData]);

  useEffect(() => {
    if (gridApi) {
      gridApi.onFilterChanged();
    }
  }, [searchText]);

  if (!spacexLaunchData || spacexLaunchData.length === 0) {
    return null;
  }
  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onSearchFilterChanged = (event) => {
    setSearchText(event.target.value);
  };

  const isExternalFilterPresent = () => {
    return true;
  };

  const doesExternalFilterPass = (text, node) => {
    if (text) {
      return node.data.launchName.toLowerCase().includes(text.toLowerCase());
    }
    return true;
  };

  return (
    <Grid container className={classes.margin}>
      <Grid item sm={3} />
      <Grid container item sm direction="column">
        <form noValidate autoComplete="off">
          <TextField
            className={classes.searchBox}
            id="outlined-basic"
            label="Search by Launch Name"
            variant="outlined"
            onChange={onSearchFilterChanged}
          />
        </form>

        <div className={`ag-theme-alpine ${classes.grid}`}>
          <AgGridReact
            rowData={rowData}
            onGridReady={onGridReady}
            animateRows={true}
            frameworkComponents={{
              rocketDetailsRenderer: RocketDetailsRenderer,
            }}
            isExternalFilterPresent={isExternalFilterPresent}
            doesExternalFilterPass={(node) =>
              doesExternalFilterPass(searchText, node)
            }
          >
            {/* ref = {gridRef} */}
            <AgGridColumn field="launchName" sortable={true} />
            <AgGridColumn
              field="launchDate"
              sortable={true}
              comparator={dateComparer}
              valueFormatter={(params) => getDateFormat(params.data.launchDate)}
            />
            <AgGridColumn
              field="rocketDetails"
              sortable={false}
              cellRenderer="rocketDetailsRenderer"
            />
          </AgGridReact>
        </div>
      </Grid>
      <Grid item sm={3} />
    </Grid>
  );
}
