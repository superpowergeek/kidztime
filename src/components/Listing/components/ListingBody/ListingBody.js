import { makeStyles, TableBody, Grow } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  body: {
    overflowX: "auto",
  },
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
    opacity: 0.4,
  },
  imgCell: {
    padding: 0,
  },
  hidden: {
    display: "none",
  },
}));

const ListingBody = (props) => {
  const {
    bottomRow: BottomRow,
    items,
    itemComponent: ItemComponent,
    topRow: TopRow,
    reloadItem,
    model,
  } = props;

  const classes = useStyles();

  return (
    <TableBody className={classes.body}>
      {TopRow && <TopRow />}
      {items.map((item, index) => (
        <Grow key={index} in={true} {...{ timeout: 600 + index * 100 }}>
          <ItemComponent reloadItem={reloadItem} model={item} />
        </Grow>
      ))}
      {BottomRow && <BottomRow items={items} model={model} />}
    </TableBody>
  );
};

ListingBody.defaultProps = {
  topRow: null,
  bottomRow: null,
};

export default ListingBody;
