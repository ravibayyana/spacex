import { nanoid } from "@reduxjs/toolkit";
export class LaunchDetails {
  launchName;
  launchDate;
  rocketDetails;
  id;
  launchDateUnix;
  constructor(data) {
    this.id = nanoid();
    this.launchDateUnix = data.launch_date_unix;
    this.launchName = data.mission_name;
    this.launchDate = new Date(data.launch_date_utc);
    this.rocketDetails = new RocketDetails(data.rocket);
  }
}

export class RocketDetails {
  rocketName;
  rocketType;
  constructor(rocketDetails) {
    this.rocketName = rocketDetails.rocket_name;
    this.rocketType = rocketDetails.rocket_type;
  }
}
