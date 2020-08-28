import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    boxShadow: ({ selected }) =>
      selected ? `0 0 2px 3px ${blue[500]}` : theme.shadows[2],
  },
  cardWrapper: {
    height: "100%",
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  tabContainer: {
    height: "100%",
    paddingTop: theme.spacing(4),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  fill: {
    height: "100%",
  },
  scrollContainer: {
    height: "100%",
    overflow: "hidden",
    position: "relative",
    paddingTop: theme.spacing(2),
  },
  scrollArea: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    height: "100%",
    width: "100%",
    overflowY: "scroll",
  },
  comment: {
    boxShadow: ({ selected }) =>
      selected ? `0 0 2px 3px ${blue[500]}` : "none",
  },
}));
