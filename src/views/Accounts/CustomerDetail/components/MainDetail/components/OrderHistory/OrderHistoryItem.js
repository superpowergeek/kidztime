import React from "react";
import { makeStyles, Chip, TableRow, TableCell } from "@material-ui/core";
import { ChipStyles } from "utils/constants";
import { capitalise, cashFormat, quantityFormat } from "utils/formatting";
import { useRouter } from "utils/tools";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  chip: {
    fontWeight: 500,
  },
  selectable: {
    cursor: "pointer",
  },
}));

const OrderHistoryItem = (props) => {
  const { model, reloadItem, ...rest } = props;
  const classes = useStyles();
  const router = useRouter();

  return (
    <TableRow
      {...rest}
      hover
      className={classes.selectable}
      onClick={() => router.history.push(`/orders/${model.id}/detail`)}
    >
      <TableCell>{model?.reference || ""}</TableCell>
      <TableCell>{cashFormat(model?.total)}</TableCell>
      <TableCell>{quantityFormat(model?.items)}</TableCell>
      <TableCell>
        {model?.date ? moment(model?.date).format("dddd, D MMMM YYYY, h:mm a") : "-"}
      </TableCell>
      <TableCell>
        {model?.status && 
          <Chip label={capitalise(model?.status)} style={ChipStyles[model?.status]} classes={{label: classes.chip}} />
        }
      </TableCell>
    </TableRow>
  );
}

export default OrderHistoryItem;