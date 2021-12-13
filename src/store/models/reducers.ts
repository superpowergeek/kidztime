import { ModelsUpdateProps, TYPES } from "./actions";
import { PropAction } from "../props";

const initial_substate = {
  checkedList: [],
}

const initial_substate_alt = {
  values: {},
};

export type ModelsState = {
  models :any;
  customers: any;
  refund_items: any;
  order_history: any;
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
  addPromotionProducts: any;
  productGroups: any;
};

const initial_state: ModelsState = {
  models : [],
  customers: { ...initial_substate },
  refund_items: { ...initial_substate_alt },
  order_history: { ...initial_substate },
  orders: { ...initial_substate },
  products: { ...initial_substate },
  classifications: { ...initial_substate },
  inventory: { ...initial_substate },
  classificationCharacter: { ...initial_substate },
  classificationCategory: { ...initial_substate },
  classificationProductType: { ...initial_substate },
  classificationProduct: { ...initial_substate },
  point_history: { ...initial_substate },
  pages: { ...initial_substate },
  pageElements: { ...initial_substate },
  navigation: { ...initial_substate },
  promotionGroups: { ...initial_substate },
  promotionProducts: { ...initial_substate },
  addPromotionProducts: { ...initial_substate },
  productGroups: { ...initial_substate },
}

export default (state: ModelsState = initial_state, actions: PropAction) => {
  switch (actions.type) {
    case TYPES.UPDATE:
      const updateProps: ModelsUpdateProps = actions.props;
      return {
        ...state,
        [updateProps.key]: updateProps.value
      };
    default:
      return state;
  }
}