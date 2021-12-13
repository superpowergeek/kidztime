import React, { useState, useMemo, useCallback, useEffect } from "react";
import { SearchBar } from "components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { DateRangePicker } from "materialui-daterange-picker";
import { TabHeader } from "../../components";
import { useFilter } from "utils/filter";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ordercreatedate: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    padding: theme.spacing(2),
    "& > div": {
      fontSize: "medium",
    },
  },
  textField: {
    "& .MuiOutlinedInput-input": {
      padding: "16px 14px",
    },
    marginLeft: theme.spacing(1),
    minWidth: 207,
  },
  dateRangePicker: {
    position: "absolute",
    right: "16px",
    top: "70px",
    "& div > ul": {
      display: "none",
    },
  },
}));

const TopElements = (props) => {
  const classes = useStyles();
  const [openDateRange, setOpenDateRange] = useState(false);
  const [filter, updateFilter] = useFilter("orders");
  const [dateRange, setDateRange] = useState({
    startDate: moment(moment().subtract(30, "days")),
    endDate: moment(),
  });
  const toggleDateRange = useCallback(() => setOpenDateRange((val) => !val), [
    setOpenDateRange,
  ]);
  const dateDisplay = useMemo(() => {
    let startDate = moment(dateRange.startDate).format("DD/MM/YYYY");
    let endDate = moment(dateRange.endDate).format("DD/MM/YYYY");
    return `${startDate} - ${endDate}`;
  }, [dateRange.startDate, dateRange.endDate]);

  useEffect(() => {
    updateFilter({
      ...filter,
      created_at: `${moment(dateRange.startDate).format("X")},${moment(
        dateRange.endDate
      ).format("X")}`,
    });
  }, [dateRange.startDate, dateRange.endDate]);

  const clickOpenDateRange = useCallback(() => setOpenDateRange(true), [
    setOpenDateRange,
  ]);
  return (
    <React.Fragment>
      <TabHeader />
      <Divider style={{ height: 3 }} />
      <Box className={classes.root}>
        <SearchBar name={props.name} placeholder="Search Orders" />
        <Box className={classes.ordercreatedate}>
          <Box>Order Creation Date</Box>
          <TextField
            className={classes.textField}
            variant="outlined"
            type="text"
            placeholder="DD/MM/YYYY-DD/MM/YYYY"
            onFocus={clickOpenDateRange}
            value={dateDisplay}
          />
          <Box className={classes.dateRangePicker}>
            <DateRangePicker
              open={openDateRange}
              toggle={toggleDateRange}
              initialDateRange={dateRange}
              onChange={(range) => {
                setDateRange(range);
              }}
            />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default TopElements;
