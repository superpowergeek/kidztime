import { FilterUpdateProps, FilterReloadProps, TYPES } from "./actions";
import { PropAction } from "../props";

const initial_substate = {
  limit: 10,
  count: 0,
  offset: 0
}

export type FilterState = {
  customers: any;
  order_history: any;
  order_items: any;
  orders: any;
  products: any;
  classifications: any;
  inventory: any;
  classificationCharacter: any;
  classificationCategory: any;
  classificationProductType: any;
  classificationProduct: any;
  point_history: any;
  pages: any;
  pageElements: any;
  navigation: any;
  promotionGroups: any;
  promotionProducts: any;
  productGroups: any;
};

const initial_state: FilterState = {
  customers: { ...initial_substate, sort: "", search: "", filterBy: "", reload: false },
  order_history: { ...initial_substate, sort: "", search: "", filterBy: "", account_id: 0, },
  order_items: { count: 0, sort: "", search: "", filterBy: ""  },
  orders: { ...initial_substate, sort: "", search: "", filterBy: "" , status :"",created_at:"", error:false , success:false , warning:false },
  products: { ...initial_substate, sort: "", search: "", filterBy: "", reload: false, categories: "" },
  classifications: { ...initial_substate, sort: "", search: "", filterBy: "", type: "", reload: false },
  inventory: { ...initial_substate, sort: "", search: "", filterBy: "", type: "", reload: false, inventory: null },
  classificationCharacter: { ...initial_substate, sort: "", search: "", filterBy: "", type: "character", reload: false },
  classificationCategory: { ...initial_substate, sort: "", search: "", filterBy: "", type: "category", reload: false },
  classificationProductType: { ...initial_substate, sort: "", search: "", filterBy: "", type: "product_type", reload: false },
  classificationProduct: { ...initial_substate, sort: "", search: "", filterBy: "", reload: false },
  point_history: { ...initial_substate, sort: "", search: "", filterBy: "", reload: false, campaign: null },
  pages: { ...initial_substate, sort: "", search: "", reload: false },
  pageElements: { ...initial_substate, sort: "", search: "", reload: false, webpage: null },
  navigation: { ...initial_substate, sort: "", search: "", reload: false },
  promotionGroups: { ...initial_substate, sort: "", search: "", reload: false, type: "accessory", published: 1 },
  promotionProducts: { ...initial_substate, sort: "", search: "", reload: false},
  productGroups: { ...initial_substate, sort: "", search: "", reload: false},
}

export default (state: FilterState = initial_state, actions: PropAction) => {
  switch (actions.type) {
    case TYPES.RELOAD:
      const reloadProps: FilterReloadProps = actions.props;
      const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) =>
        obj[key];
      const value = getKeyValue<keyof FilterState, FilterState>(reloadProps.key)(state);
      return { ...state, [reloadProps.key]: { ...value, reload: !value.reload } };
    case TYPES.UPDATE:
      const updateProps: FilterUpdateProps = actions.props;
      return {
        ...state,
        [updateProps.key]: updateProps.value
      };
    default:
      return state;
  }
}