/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
// import { OrderList } from "components";
import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import { ApiLayout, DashboardLayout, ErrorLayout, LoginLayout } from "layouts";
import { Paths } from "utils/constants";

const routes = [{
  path: Paths.Landing,
  exact: true,
  component: () => <Redirect to={Paths.Accounts.List} />
}, {
  path: Paths.Auth.Root,
  component: LoginLayout,
  routes: [{
    path: Paths.Auth.Login,
    exact: true,
    component: lazy(() => import("views/Authentication/Login"))
  }, {
    path: Paths.Auth.Password.Request,
    exact: true,
    component: lazy(() => import("views/Authentication/PasswordRequest"))
  }, {
    path: Paths.Auth.Password.Reset,
    exact: true,
    component: lazy(() => import("views/Authentication/PasswordReset"))
  }, {
    component: () => <Redirect to={Paths.Auth.Login} />
  }]
}, {
  path: Paths.Error.Root,
  component: ErrorLayout,
  routes: [{
    path: Paths.Error["401"],
    exact: true,
    component: lazy(() => import("views/Errors/Error401"))
  }, {
    path: Paths.Error["404"],
    exact: true,
    component: lazy(() => import("views/Errors/Error404"))
  }, {
    path: Paths.Error["500"],
    exact: true,
    component: lazy(() => import("views/Errors/Error500"))
  }, {
    path: Paths.Error.Unauthorized,
    exact: true,
    component: lazy(() => import("views/Errors/Unauthorized"))
  }, {
    component: () => <Redirect to={Paths.Error["404"]} />
  }]
}, {
  path: Paths.Api.Root,
  component: ApiLayout,
  routes: [{
    path: Paths.Api.Invoice,
    exact: true,
    component: lazy(() => import("views/Sales/OrderInvoice"))
  }, {
    path: Paths.Api.NoInvoiceFound,
    exact: true,
    component: lazy(() => import("views/Errors/NoInvoiceFound"))
  }, {
    component: () => <Redirect to={Paths.Error["404"]} />
  }],
}, {
  route: "*",
  component: DashboardLayout,
  routes: [{
    path: Paths.Accounts.List,
    exact: true,
    component: lazy(() => import("views/Accounts/CustomerManagement"))
  }, {
    path: Paths.Accounts.Detail,
    exact: true,
    component: lazy(() => import("views/Accounts/CustomerDetail"))
  }, {
    path: Paths.Products.CatalogueList,
    exact: true,
    component: lazy(() => import("views/Products/Catalogue"))
  }, {
    path: Paths.Products.Detail,
    exact: true,
    component: lazy(() => import("views/Products/ProductDetail"))
  }, {
    path: Paths.Products.BulkUpdate,
    exact: true,
    component: lazy(() => import("views/Products/BulkUpdate"))
  }, {
    path: Paths.Products.PlatformGraceImport,
    exact: true,
    component: lazy(() => import("views/Products/B2BPlatformImport"))
  }, {
    path: Paths.Products.Inventory,
    exact: true,
    component: lazy(() => import("views/Products/Inventory"))
  }, {
    path: Paths.PromotionSettings,
    exact: true,
    component: lazy(() => import("views/Products/PromotionSettings"))
  }, {
    path: Paths.PromotionDetail,
    exact: true,
    component: lazy(() => import("views/Products/PromotionDetails"))
  }, {
    path: Paths.Bundle.List,
    exact: true,
    component: lazy(() => import("views/Products/CompleteBundle"))
  }, {
    path: Paths.Bundle.New,
    exact: true,
    component: lazy(() => import("views/Products/NewBundle"))
  }, {
    path: Paths.Frontend.ProductGroupsList,
    exact: true,
    component: lazy(() => import("views/Frontend/ProductGroups"))
  }, {
    path: Paths.Frontend.Homepage,
    exact: true,
    component: lazy(() => import("views/Frontend/HomePage"))
  }, {
    path: Paths.Frontend.Navigation,
    exact: true,
    component: lazy(() => import("views/Frontend/Navigation"))
  }, {
    path: Paths.Frontend.Classifications,
    exact: true,
    component: lazy(() => import("views/Frontend/Classifications"))
  }, {
    path: Paths.Frontend.ClassificationDetail,
    exact: true,
    component: lazy(() => import("views/Frontend/Classifications/components/ClassificationDetail"))
  }, {
    path: Paths.Frontend.PagesList,
    exact: true,
    component: lazy(() => import("views/Frontend/CustomPages"))
  }, {
    path: Paths.Frontend.PageDetail,
    exact: true,
    component: lazy(() => import("views/Frontend/CustomPageDetail"))
  }, {
    path: Paths.Frontend.BottlesList,
    exact: true,
    component: lazy(() => import("views/Frontend/BottlesPage"))
  }, {
    path: Paths.Sales.OrderDetail,
    exact: true,
    component: lazy(() => import("views/Sales/OrderDetail"))
  }, {
    path: Paths.Sales.OrderOverview,
    exact: true,
    component: lazy(() => import("views/Sales/OrderOverview"))
  }, {
    path: Paths.Sales.StrawReplacement,
    exact: true,
    component: lazy(() => import("views/Sales/StrawReplacement"))
  }, {
    path: Paths.Sales.ReviewManagement,
    exact: true,
    component: lazy(() => import("views/Sales/ReviewManagement"))
  }]
}, {
  path: Paths.Sales.OrderInvoice,
  exact: true,
  component: lazy(() => import("views/Sales/OrderInvoice"))
}];

export default routes;
