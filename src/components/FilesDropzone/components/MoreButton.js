import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import MoreIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Fragment, memo, useRef, useState } from "react";


const useStyles = makeStyles(() => ({}));

const MoreButton = props => {
  const classes = useStyles();
  const moreRef = useRef(null);
  const { options, fileIndex, ...rest } = props;
  const { handleDelete } = options;
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <Fragment>
      <Tooltip title="More options">
        <IconButton
          {...rest}
          onClick={handleMenuOpen}
          ref={moreRef}
          size="small"
        >
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        classes={{ paper: classes.menu }}
        onClose={handleMenuClose}
        open={openMenu}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <MenuItem
          onClick={() => handleDelete(fileIndex)}
        >
          <ListItemIcon>
            <ClearIcon />
          </ListItemIcon>
          <ListItemText primary="Clear" />
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

MoreButton.propTypes = {
  className: PropTypes.string,
  fileIndex: PropTypes.number.isRequired
};

export default memo(MoreButton);
