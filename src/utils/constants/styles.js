import React from "react"; 
import palette from "theme/palette";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Regular from "assets/fonts/Roboto-Regular.ttf";
import Bold from "assets/fonts/Roboto-Bold.ttf";

export const submitButton = {
  marginTop: 16,
  width: "100%"
};

export const AuthStyles = {
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 16px"
  },
  divider: {
    margin: "16px 0px"
  }
};

export const SideBoxStyles = {
  padding: "12px 14px",
};

export const ErrorStyles = {
  root: {
    padding: 24,
    paddingTop: "10vh",
    display: "flex",
    flexDirection: "column",
    alignContent: "center"
  },
  imageContainer: {
    marginTop: 48,
    display: "flex",
    justifyContent: "center"
  },
  buttonContainer: {
    marginTop: 48,
    display: "flex",
    justifyContent: "center"
  }
};

export const ButtonStyles = {
  ADD: {
    style: {
      backgroundColor: palette.secondary.main,
      color: "white",
      "&:hover": {
        backgroundColor: palette.secondary.dark,
      },
    },
    icon: <AddIcon style={{color: "white"}} />,
  },
  DELETE: {
    style: {
      backgroundColor: palette.error.light,
      color: "white",
      "&:hover": {
        backgroundColor: palette.error.main,
      },
    },
    icon: <DeleteIcon style={{color: "white"}} />,
  }
};

export const ChipStyles = {
  open: {
    backgroundColor: palette.default.main,
    color: "white",
  },
  unprocessed: {
    backgroundColor: "#212121",
    color: "white",
  },
  processed: {
    backgroundColor: palette.warning.main,
    color: "white",
  },
  shipped: {
    backgroundColor: "blue",
    color: "white",
  },
  processing: {
    backgroundColor: palette.warning.main,
    color: "white",
  },
  completed: {
    backgroundColor: palette.success.main,
    color: "white",
  },
  cancelled: {
    backgroundColor: palette.error.light,
    color: "white",
  },
  void: {
    backgroundColor: "red",
    color: "white",
  },
  refunded: {
    backgroundColor: "#282C67",
    color: "white",
  },
  partial_refunded: {
    backgroundColor: "#A7ABDD",
    color: "white",
  },
  in_delivery: {
    backgroundColor: "#D74E09",
    color: "white"
  }
}

export const TextStyles = {
  open: {
    color: palette.default.main,
  },
  processing: {
    color: palette.warning.main,
  },
  processed: {
    color: palette.warning.main,
  },
  unprocessed: {
    color : "#212121",
  },
  shipped: {
    color : "blue",
  },
  completed: {
    color: palette.success.main,
  },
  cancelled: {
    color: palette.error.light,
  },
  void: {
    color: "red",
  },
  refunded: {
    color: "#282C67",
  },
  partial_refunded: {
    color: "#A7ABDD",
  },
  in_delivery: {
    color: "#D74E09"
  }
};

export const DropzoneStyles = {
  dropzone: {
    width: "100%",
    height: "90%",
  },
  boxHeight: {
    minHeight: 280,
    maxWidth: 300,
    margin: "0 auto",
  },
  media: {
    objectFit: "contain",
  },
};

export const DialogStyles = {
  title: {
    paddingTop: 24,
    paddingBottom: 6,
  },
  titleText: {
    fontSize: 18,
    textTransform: "uppercase",
  },
  content: {
    paddingBottom: 34,
  },
  subtitle: {
    fontSize: 14
  }
};

export const ImgCellStyles = {
  img: {
    width: 100,
    height: 100,
    objectFit: "cover",
    margin: "4px auto 4px 0px",
  },
  imgPlaceholder: {
    width: 70,
    height: 90,
    margin: "10px auto 6px 20px",
    opacity: 0.40,
  },
  imgCell: {
    padding: "0px 10px",
  },
};

export const ScrollBarStyles = {
  "&::-webkit-scrollbar": {
    height: 4,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
  }
};

export const ButtonProps = {
  variant: "contained",
  color: "secondary",
  size: "large",
}

export const formLoad = [
  { src: Regular, fontWeight: 400 },
  { src: Bold, fontWeight: 700 },
];

export const fontStyles = {
  bold: {
    fontFamily: "Roboto",
    fontWeight: 600,
  },
  regular: {
    fontFamily: "Roboto",
    fontWeight: 400,
  },
};