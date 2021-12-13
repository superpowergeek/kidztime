import { makeStyles, Paper, Table, TableContainer } from "@material-ui/core";
import { EmptyState, Loader, RenderGuard } from "components";
import ErrorMessage from "components/ErrorMessage";
import PropTypes from "prop-types";
import React, { useEffect, useState , useRef , useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import strings from "utils/strings";
import { ScrollBarStyles } from "utils/constants";
import { useDebouncer, useFilter } from "utils/filter";
import { useAsyncTask } from "utils/tools";
import { ListingBody, ListingHead, TablePaginate } from "./components";
const useStyles = makeStyles(theme => ({
  scrollbar: {
    ...ScrollBarStyles,
  }
}));

let mounted = false;

const Listing = (props) => {
  const { path, name, dense, fields, sortable, topElement, headRow, pageRow, hasCheck, errorMsg, itemComponent, params, omitFalsyParams, reloadItemFunc } = props;
  const [filter, updateFilter, listenFilters, parsedFilter] = useFilter(name);
  const api = useApi();
  const classes = useStyles();
  const taskUuid = useRef(strings.uuidv4());
  const [models, setModels] = useState([]);
  const [parent, setParent] = useState({});
  const dispatch = useDispatch();
  const [runGetList, loading, error] = useAsyncTask(`${name}ListLoad`);
  const checkedList = useSelector(state => state.Models[name]?.checkedList);
  const allChecked = models.map(m => m.id).every(val => checkedList.includes(val));
  const defaultReloadFunc = (model) => {
    const index = models.findIndex(item => item.id === model.id);
    if (index >= 0) {
    const output = [...models];
    output[index] = model;
    setModels(output);
    }
  }
  const Loading = useSelector(state => state.Layout.loadingTasks[`${name}ListLoad`]);
  let reloadItem = (reloadItemFunc && reloadItemFunc(models, setModels)) || defaultReloadFunc;
    const setAllChecked = () => {
    let list = [...checkedList];
    if (allChecked) {
      list = list.filter((val) => {
        return models.map(m => m.id).includes(val.id)
      })
    } else {
      models.forEach(m => {
        if (!checkedList.includes(m.id))
          { 
            list.push(m.id) 
          }
      });
    }
    dispatch(Actions.Models.update({ key: name, value: { checkedList: list } }));
  }
  const reload = () => {
    runGetList(async () => {
      const reparsedFilter = Object.keys(parsedFilter).reduce((object, key) => {
        if (parsedFilter[key] || !omitFalsyParams) object[key] = filter[key];
          return object
        }, {});
        if (!Loading) {
          dispatch(Actions.Layout.addBackgroundLoading({
            name: `${name}ListLoad`,
            uuid: taskUuid.current,
          }));
        }
        try 
        {
          const response = await api.path(path, params, reparsedFilter).get();
          let items = response.data.result.models ? response.data.result.models : [];
          let count = response.data.result.meta?.count || 0;
          if (filter) {
              updateFilter({ ...filter, count: count });
          }
          mounted && setModels(items);
          if(name==="orders"){
            dispatch(Actions.Models.update({key:"models" , value:items}))
          }
          dispatch(Actions.Layout.removeBackgroundLoading({
              uuid: taskUuid.current,
          }))
        }
        catch (e){
          dispatch(Actions.Layout.removeBackgroundLoading({
              uuid: taskUuid.current,
          }))
        }      
    });
  };
  const debounce = useDebouncer(reload, 0);
  useEffect(() => {
    debounce();
  }, [...listenFilters]); // eslint-disable-line

  useEffect(() => {
    mounted = true;
    return () => mounted = false;
  }, []); 
  return (
    <div>
      <Paper>
          {topElement}
          <TableContainer className={classes.scrollbar}>
          <Table size={dense ? "small" : "medium"}>
              {headRow &&
              <ListingHead
                  sortable={sortable}
                  name={name}
                  fields={fields}
                  hasCheck={hasCheck}
                  setAllChecked={setAllChecked}
                  allChecked={allChecked}
              />}
              <RenderGuard renderIf={!loading}>
              <ListingBody
                  reloadItem={reloadItem}
                  itemComponent={itemComponent}
                  items={models}
              />
              </RenderGuard>
          </Table>
          </TableContainer>
          <Loader loading={loading} size={40} thickness={4} />
          <EmptyState active={!loading && models.length <= 0} message={errorMsg || "No " + name + " found"} />
          <ErrorMessage message={error?.message} />
          { pageRow &&
          <TablePaginate name={name} loading={loading} count={models.length} />
          }
      </Paper>
    </div>
  );
};

Listing.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
};

Listing.defaultProps = {
  allChecked: null,
  setAllChecked: null,
  dense: false,
  sortable: true,
  topElement: null,
  clickRow: null,
  link: "",
  headRow: true,
  pageRow: true,
  clickFunc: null,
  errorMsg: null,
  img: false,
  params: {},
  type: null,
  status: true
};

export default Listing;