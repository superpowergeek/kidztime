import { TableCell, TableRow } from "@material-ui/core";
import moment from "moment";
import React from "react";

const PointHistoryItem = (props) => {
  const { model, reloadItem, ...rest } = props;

  const getEventName = (model) => {
    if (model.voucher && model.object === "redemption") {
      return "Voucher Redemption"
    }
  }

  return (
    <TableRow
      {...rest}
    >
      <TableCell>{getEventName(model)}</TableCell>
      <TableCell>-</TableCell>
      <TableCell>
        {model?.date ? moment(model?.date).format("dddd, D MMMM YYYY, h:mm a") : "-"}
      </TableCell>
    </TableRow>
  );
}

export default PointHistoryItem;