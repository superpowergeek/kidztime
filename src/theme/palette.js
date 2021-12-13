import { colors } from "@material-ui/core";
import { fade } from '@material-ui/core/styles/colorManipulator';

const white = "#FFFFFF";
const black = "#000000";

const color = {
  kidztime: {
    500: "#2D2866",
    900: "#242051",
    100: "#8986a8",
  },
  kidztime_secondary: {
    900: "#7daaff",
    700: "#96bbff",
    500: "#b0cbff",
    100: "#c9dcff",
  },
}

export default {
  black,
  white,
  default: {
    dark: colors.grey[700],
    light: colors.grey[200],
    main: color.kidztime_secondary[500],
    contrastText: white,
  },
  primary: {
    contrastText: white,
    dark: color.kidztime[900],
    main: color.kidztime[500],
    light: color.kidztime[100],
  },
  secondary: {
    contrastText: white,
    dark: color.kidztime_secondary[900],
    main: color.kidztime_secondary[700],
    light: color.kidztime_secondary[500]
  },
  error: {
    contrastText: white,
    dark: fade(colors.red[900], 0.8),
    main: fade(colors.red[600], 0.8),
    light: fade(colors.red[400], 0.8),
  },
  text: {
    primary: colors.grey[900],
    secondary: colors.grey[600],
    link: color.kidztime_secondary[900]
  },
  link: color.kidztime_secondary[900],
  icon: colors.grey[600],
  background: {
    default: "#F4F6F8",
    paper: white
  },
  divider: colors.grey[200],
  success: {
    contrastText: white,
    dark: fade(colors.green[800], 0.8),
    main: fade(colors.green[600], 0.8),
    light: fade(colors.green[400], 0.8),
  },
  warning: {
    contrastText: colors.grey[900],
    dark: colors.amber[700],
    main: colors.amber[500],
    light: colors.amber[300],
  },
  lightBlue: color.kidztime_secondary[100]
};
