import React from "react";
import { Popover, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
}));

export default (props) => {
  const classes = useStyles();
  const rocketDetails = props.node.data.rocketDetails;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const onClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Link
        component="button"
        variant="body2"
        aria-describedby={id}
        color="primary"
        onClick={onClick}
      >
        Rocket Details
      </Link>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          className={classes.margin}
          sx={{ p: 2 }}
        >{`Name: ${rocketDetails.rocketName}, Type: ${rocketDetails.rocketType}`}</Typography>
      </Popover>
    </>
  );
};
