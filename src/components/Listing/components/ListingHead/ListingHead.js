import { Checkbox, TableCell, TableHead, TableRow } from "@material-ui/core";
import { RenderGuard } from "components";
import React from "react";
import { useSelector } from "react-redux";
import { useFilter } from "utils/filter";
import TableSort from "./TableSort";

const ListingHead = (props) => {

  const { sortable, fields, hasCheck, allChecked, setAllChecked, checkBoxClass, name, noListMeta } = props;

  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const loading = useSelector(state => state.Layout.loadingTasks[`${name}ListLoad`]);
  const [filter] = useFilter(name);

  return (
    <RenderGuard renderIf={noListMeta || (loading || filter.count > 0)}>
      <TableHead>
        <TableRow>
          {
            hasCheck &&
            <TableCell>
              <Checkbox checked={allChecked} onClick={() => setAllChecked()} className={checkBoxClass} />
            </TableCell>
          }
          {
            values.map((header, index) =>
              <TableSort
                name={name}
                sortable={sortable}
                idTag={keys[index]}
                key={index}
                header={header}
              />
            )
          }
        </TableRow>
      </TableHead>
    </RenderGuard>
  );
};

ListingHead.defaultProps = {
  allChecked: false,
  setAllChecked: () => {},
};

export default ListingHead;