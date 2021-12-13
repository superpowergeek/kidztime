import { Actions } from "store";
import { useDispatch, useSelector } from "react-redux";

export default function useFilter(filterKey, initialFilter) {
  const filter = useSelector(state => state.Filter[filterKey]);
  const dispatch = useDispatch();

  const updateFilter = (newFilterComponents) => {
    dispatch(Actions.Filter.update({
      key: filterKey,
      value: newFilterComponents
    }));
  };

  const keys = Object.keys(filter).filter(key => !["count", "init"].includes(key));

  const listenFilters = keys.map(key => filter[key]);

  const parsedFilter = keys.reduce((object, key) => {
    if (["reload"].includes(key)) return object;
    object[key] = filter[key];
    return object
  }, {});

  return [filter, updateFilter, listenFilters, parsedFilter];
};

// export default function useFilter(filterKey, initialFilter = presetFilter) {
//   const [filtersLibrary, dispatch] = useReducer(reducer, initialState);

//   if (!filtersLibrary[filterKey]) {
//     dispatch({
//       type: "update",
//       key: filterKey,
//       filter: { ...initialFilter },
//     });
//   }

//   const updateFilter = (newFilterComponents) => {
//     console.log(newFilterComponents)
//     dispatch({
//       type: "update",
//       key: filterKey,
//       filter: { ...newFilterComponents },
//     });
//   };

//   const filter = filtersLibrary[filterKey] || {};
//   const listenFilters = Object.keys(filter).filter(key => key !== "count").map(key => filter[key]);

//   return [filter, updateFilter, listenFilters];
// };