export const Get_PAST_LAUNCHES_URL =
  "https://api.spacexdata.com/v3/launches/past";

export function getDateFormat(date) {
  return (
    ("0" + date.getDate()).slice(-2) +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    date.getFullYear() +
    " " +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2)
  );
}

export const dateComparer = (valueA, valueB, nodeA, nodeB, isInverted) => {
  let value = nodeA.data.launchDateUnix - nodeB.data.launchDateUnix;
  if (value === 0) return 0;
  return value > 0 ? 1 : -1;
};
