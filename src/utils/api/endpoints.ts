const paths = {
  "account/login": "/public/session/login", // post
  "account/profile": "/account/profile", // get
  "account/password": "/account/password", // post
  "account/list": "/admin/account/list", // get
  "account/create": "/admin/account/create", // post
  "account/detail": "/admin/account/:account_id/detail", // get
  "account/update": "/admin/account/:account_id/update", // post
  "account/delete": "/admin/account/:account_id/delete", // delete
  "account/privilege": "/admin/account/:account_id/privilege", // post
  "account/redemptions": "/admin/account/:account_id/redemptions", // get
  "account/vouchers": "/admin/account/:account_id/vouchers", // get
  "account/statistics": "/admin/account/:account_id/statistics", // get
  "order/order-process": "/admin/order/order-process", // post
  "order/order-ship": "/admin/order/:order_id/order-ship", // put
  "order/order-ship-dispatched": "/admin/order/order-ship", // post
  "order/order-complete": "/admin/order/order-complete", // post

  "order/list": "/admin/order/list",  // get
  "order/detail": "/admin/order/:order_id/detail",  // get
  "order/item/list": "/account/order/:order_id/order_item/list",  // get
  "order/update": "/admin/order/:order_id/update",  // post

  "password/request": "/public/password/request", // post
  "password/query": "/public/password/query", // post
  "password/reset": "/public/password/reset", // post

  "privilege/list": "/admin/privilege/list", // get

  "product/list": "/admin/product/list", // get
  "product/category": "/admin/product/:product_id/category/update", // post
  "product/detail": "/admin/product/:product_id/detail", // get
  "product/create": "/admin/product/create", // post
  "product/update": "/admin/product/:product_id/update", // post
  "product/delete": "/admin/product/:product_id/delete",  // post
  "product/preview/add": "/admin/product/:product_id/images/preview",  // multipost
  "product/gallery/add": "/admin/product/:product_id/images/gallery/create",   // multipost
  "product/gallery/delete": "/admin/product/:product_id/images/gallery/:asset_id/delete",  // delete
  "product/group/get": "/admin/product/:product_id/group/list", //get
  "product/group/set": "/admin/product/:product_id/group/set", // post

  "classification/list": "/admin/classification/list", // get
  "classification/category/create": "/admin/classification/category/create", // post
  "classification/category/update": "/admin/classification/category/:category_id/update", // post
  "classification/character/create": "/admin/classification/character/create", // post
  "classification/character/update": "/admin/classification/character/:category_id/update", // post
  "classification/product_type/create": "/admin/classification/product_type/create", // post
  "classification/product_type/update": "/admin/classification/product_type/:category_id/update", // post
  "classification/link/create": "/admin/classification/category_link/create", // post
  "classification/delete": "/admin/classification/:category_id/delete", // delete
  "classification/icon": "/admin/classification/:category_id/icon",  // multipost
  "classification/product/list": "/admin/classification/category/:category_id/product/list", // get

  "classification/product_type/list": "/admin/classification/product_type", // get

  "inventory/platform/list": "/admin/inventory/list", // get
  "inventory/platform/create": "/admin/inventory/create", // post
  "inventory/platform/update": "/admin/inventory/:inventory_id/update", // post
  "inventory/platform/delete": "/admin/inventory/:inventory_id/delete", // delete
  "inventory/platform/product/update": "/admin/inventory/:inventory_id/:product_id/update", // post
  "inventory/product/update": "/admin/inventory/:inventory_id/product/:product_id/update", // post

  "inventory/inventory_item/list": "/admin/inventory/:inventory_id/inventory_item/list", // get
  "inventory/inventory_item/create": "/admin/inventory/:inventory_id/inventory_item/create", // post
  "inventory/inventory_item/update": "/admin/inventory/:inventory_id/inventory_item/:inventory_item_id/update", // post
  "inventory/inventory_item/delete": "/admin/inventory/:inventory_id/inventory_item/:inventory_item_id/delete", // delete

  "frontend/webpage/list": "/admin/frontend/webpage/list", // get
  "frontend/webpage/create": "/admin/frontend/webpage/create", // post
  "frontend/webpage/detail": "/admin/frontend/webpage/:webpage_id/detail", // get
  "frontend/webpage/update": "/admin/frontend/webpage/:webpage_id/update", // post
  "frontend/webpage/delete": "/admin/frontend/webpage/:webpage_id/delete", // delete
  "frontend/webpage/element": "/admin/frontend/webpage/:webpage_id/element", // post
  "frontend/webpage/element/list": "/admin/frontend/webpage/element/list", // get
  "frontend/webpage/element/detail": "/admin/frontend/webpage/element/:element_id/list", // get
  "frontend/webpage/element/image": "/admin/frontend/webpage/element/:element_id/image", // post
  "frontend/webpage/element/delete": "/admin/frontend/webpage/element/:element_id/delete", // delete

  "objectmeta/banner/list": "/admin/objectmeta/banner/list", // get
  "objectmeta/banner/create": "/admin/objectmeta/banner/create", // post
  "objectmeta/banner/update": "/admin/objectmeta/banner/:objectmeta_id/update", // post
  "objectmeta/banner/delete": "/admin/objectmeta/banner/:objectmeta_id/delete", // delete

  "group/promotion_group/list": "/admin/group/list", // get
  "group/promotion_group/create": "/admin/group/create", // post
  "group/promotion_group/detail": "/admin/group/:group_id/detail", // get
  "group/promotion_group/update": "/admin/group/:group_id/update", //put
  "group/promotion_group/delete": "/admin/group/:group_id/delete", //delete
  "group/promotion_group/product/update": "/admin/group/:group_id/product/update", //post

  // "account/stripe": "/admin/account/:account_id/stripe", // get
  // "account/card/delete": "/admin/account/stripe/source/:objectmeta_id/delete", // delete
  // "account/password/admin": "/admin/account/:account_id/password", // post
} as const;

export default paths;