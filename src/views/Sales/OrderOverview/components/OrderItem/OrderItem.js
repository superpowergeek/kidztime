import React, { useCallback, useState, useMemo, useEffect } from "react";
import {
  makeStyles,
  TableRow,
  TableCell,
  Button,
  Box,
  Grow,
} from "@material-ui/core";
import ListingCheckbox from "components/Listing/components/ListingBody/ListingCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReadyToShip from "../ReadyToShip";
import ItemList from "./ItemList";
import useApi from "utils/api/useApi";
import { useFilter } from "utils/filter";
import { useRouter } from "utils/tools";

const minWidth = 110;
const status = {
  UNPROCESSED: "unprocessed",
  PROCESSED: "processed",
  SHIPPED: "shipped",
  OPEN: "open",
};
const actions = {
  PROCESSORDER: "Process Order",
  DISPATCHED: "Dispatched",
  COMPLETE: "Complete",
  RETURNREFUND: "Return/Refund",
};
const useStyles = makeStyles((theme) => ({
  selectable: {
    cursor: "pointer",
  },
  ordernumber: {
    color: "blue",
  },
  orderitems: {
    position: "relative",
  },
  iconarrow: {
    position: "absolute",
    top: 0,
    marginLeft: theme.spacing(0.5),
    color: "#797979ab",
    "&:hover": {
      backgroundColor: "#5a5a5a30",
      borderRadius: "45px",
    },
  },
  btnPO: {
    minWidth: minWidth,
    textTransform: "none",
    backgroundColor: "#eb7979",
    "&:hover": {
      backgroundColor: "#fd040445",
    },
  },
  btnDP: {
    minWidth: minWidth,
    textTransform: "none",
    backgroundColor: "#ffeb00b8",
    "&:hover": {
      backgroundColor: "#fdea0345",
    },
  },
  btnCL: {
    minWidth: minWidth,
    textTransform: "none",
    backgroundColor: "#43fd2d75",
    "&:hover": {
      backgroundColor: "#29da1440",
    },
  },
  btnRF: {
    minWidth: minWidth,
    textTransform: "none",
    backgroundColor: "#51525075",
    "&:hover": {
      backgroundColor: "#29292936",
    },
  },
}));

const OrderItem = (props) => {
  const { model, reloadItem, ...rest } = props;
  const checkedList = useSelector((state) => state.Models.orders.checkedList);
  const dataTrackingIdForm = useSelector((state) => state.TrackingId);
  const checked = checkedList.includes(model.id);
  const [filter, updateFilter] = useFilter("orders");
  const api = useApi();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [stripeID, setStripeID] = useState("");
  const [models, setModels] = useState({});
  const router = useRouter();
  const [isOpenOrderItem, setIsOpenOrderItem] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const runGetList = async () => {
    try {
      const response = await api
        .path("order/detail", { order_id: model.id })
        .get();
      setModels(response.data.result.model);
      setStripeID(response.data.result.model.payment.charge_id);
    } catch (e) {}
  };
  useEffect(() => {
    runGetList();
  }, []);
  const handleClick = useCallback(() => {
    let list = [...checkedList];
    if (checked) {
      list = list.filter((value) => value !== model.id);
    } else {
      list.push(model.id);
    }
    dispatch(
      Actions.Models.update({ key: "orders", value: { checkedList: list } })
    );
  }, [checkedList, model.id, checked, dispatch]);
  const handleClickToggleSubRow = useCallback(
    (e) => {
      if (e.currentTarget.getAttribute("name") === "orderitems") {
        setIsOpenOrderItem(!isOpenOrderItem);
      } else {
        setIsOpenStatus(!isOpenStatus);
      }
    },
    [isOpenOrderItem, isOpenStatus]
  );

  const titleBtn = useMemo(() => {
    switch (model.status) {
      case status.UNPROCESSED:
        return actions.PROCESSORDER;
      case status.PROCESSED:
        return actions.DISPATCHED;
      case status.SHIPPED:
        return actions.COMPLETE;
      case status.OPEN:
        return "";
      default:
        return actions.RETURNREFUND;
    }
  }, [model.status]);
  const handleChangeActionProcess = useCallback(async () => {
    try {
      const body = {
        orders: [model.id],
      };
      const response = await api.path("order/order-process").post({ body });
      if (response.status === 200) {
        updateFilter({ ...filter, success: true });
      }
    } catch (e) {
      updateFilter({ ...filter, error: true });
    }
  }, [model.id, filter, updateFilter]);

  const handleChangeActionDispatched = useCallback(
    async (dataTrackingIdForm) => {
      try {
        const body = {
          tracking_id: dataTrackingIdForm.idTracking,
          weight: dataTrackingIdForm.weight,
        };
        const response = await api
          .path("order/order-ship", { order_id: model.id })
          .put({ body });
        if (response.status === 200) {
          updateFilter({ ...filter, success: true });
        }
      } catch (e) {
        console.log(e);
        updateFilter({ ...filter, error: true });
      }
    },
    [dataTrackingIdForm]
  );

  const handleChangeActionComplete = useCallback(async () => {
    try {
      const body = {
        orders: [model.id],
      };
      const response = await api.path("order/order-complete").post({ body });
      if (response.status === 200) {
        updateFilter({ ...filter, success: true });
      }
    } catch (e) {
      updateFilter({ ...filter, error: true });
    }
  }, [model.id]);

  const handleClickAction = useCallback(
    (dataTrackingIdForm) => {
      if (titleBtn === actions.DISPATCHED) {
        if (
          dataTrackingIdForm.idTracking === "" &&
          dataTrackingIdForm.weight === 0
        ) {
          setIsOpenStatus(true);
        } else if (
          dataTrackingIdForm.idTracking !== "" &&
          dataTrackingIdForm.weight !== 0
        ) {
          handleChangeActionDispatched(dataTrackingIdForm);
        }
      } else if (titleBtn === actions.PROCESSORDER) {
        handleChangeActionProcess(dataTrackingIdForm);
      } else if (titleBtn === actions.COMPLETE) {
        handleChangeActionComplete();
      }
    },
    [titleBtn]
  );
  const classbtn = useMemo(() => {
    switch (titleBtn) {
      case actions.PROCESSORDER:
        return classes.btnPO;
      case actions.DISPATCHED:
        return classes.btnDP;
      case actions.COMPLETE:
        return classes.btnCL;
      case actions.RETURNREFUND:
        return classes.btnRF;
      default:
        return;
    }
  }, [titleBtn]);
  const showContent = (models) => {
    let item = "";
    if (models) {
      item = models.order_items.map((item, i) => {
        return (
          <Grow
            in={isOpenOrderItem}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 400 + i * 200 } : {})}
          >
            <TableRow>
              <ItemList key={i} item={item} />
            </TableRow>
          </Grow>
        );
      });
    }
    return item;
  };
  const setNameCustomer = useCallback(() => {
    let firstname = model?.account?.firstname ? model?.account?.firstname : "-";
    let lastname = model?.account?.lastname ? model?.account?.lastname : "";
    firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
    lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);
    return firstname + " " + lastname;
  }, [model.account.firstname, model.account.lastname]);
  return (
    <React.Fragment>
      <TableRow {...rest} hover className={classes.selectable}>
        <ListingCheckbox checked={checked} onClick={handleClick} />
        <TableCell
          className={classes.ordernumber}
          onClick={() => router.history.push(`/orders/${model.id}/detail`)}
        >
          {model.reference}
        </TableCell>
        <TableCell>
          <Box className={classes.orderitems}>
            {model.items} Items
            {!isOpenOrderItem ? (
              <ChevronRightIcon
                name="orderitems"
                className={classes.iconarrow}
                onClick={handleClickToggleSubRow}
              />
            ) : (
              <ExpandMoreIcon
                name="orderitems"
                className={classes.iconarrow}
                onClick={handleClickToggleSubRow}
              />
            )}
          </Box>
        </TableCell>
        <TableCell>{stripeID || "-"}</TableCell>
        <TableCell>{setNameCustomer()}</TableCell>
        <TableCell>
          <Box className={classes.orderitems}>
            {model.status === "processed"
              ? "Ready To Ship"
              : model.status[0].toUpperCase() + model.status.substring(1)}
            {model.status === "processed" &&
              (!isOpenStatus ? (
                <ChevronRightIcon
                  name="status"
                  className={classes.iconarrow}
                  onClick={handleClickToggleSubRow}
                />
              ) : (
                <ExpandMoreIcon
                  name="status"
                  className={classes.iconarrow}
                  onClick={handleClickToggleSubRow}
                />
              ))}
          </Box>
        </TableCell>
        <TableCell>
          <Button
            className={classbtn}
            onClick={(e) => {
              handleClickAction(dataTrackingIdForm);
            }}
            name={titleBtn}
          >
            {titleBtn}
          </Button>
        </TableCell>
      </TableRow>
      {isOpenStatus && (
        <Grow in={isOpenStatus} {...(isOpenStatus ? { timeout: 400 } : {})}>
          <TableRow>
            <ReadyToShip />
          </TableRow>
        </Grow>
      )}
      {isOpenOrderItem && showContent(models)}
    </React.Fragment>
  );
};

export default OrderItem;
