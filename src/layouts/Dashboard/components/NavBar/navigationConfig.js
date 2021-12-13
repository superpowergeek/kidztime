import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import WebIcon from "@material-ui/icons/Web";
import { Paths } from "utils/constants";

export default [{
  title: "Menu",
  pages: [{
    title: "Accounts",
    icon: PeopleIcon,
    children: [{
      title: "Customer Management",
      href: Paths.Accounts.List
    }]
  }, {
    title: "Products",
    icon: ShoppingCartIcon,
    children: [{
      title: "Catalogue",
      href: Paths.Products.CatalogueList
    }, {
      title: "Bulk Update",
      href: Paths.Products.BulkUpdate
    }, {
      title: "B2B Platform Import",
      href: Paths.Products.PlatformGraceImport
    }, {
      title: "Inventory",
      href: Paths.Products.Inventory
    },{
      title: "Promotion Settings",
      href: Paths.PromotionSettings
    },
    // }, {
    //   title: "Gift-to-Product Groups",
    //   href: Paths.GiftGroups
    // }, {
    //   title: "Accessory-to-Product Groups",
    //   href: Paths.AccessoryGroups
    //   },
    //   {
    //   title: "Discount Groups",
    //   href: Paths.DiscountGroups.List
    // }, {
    //   title: "New Discount Group",
    //   href: Paths.DiscountGroups.Create
    //   },
    //   {
    //   title: "Complete Bundle",
    //   href: Paths.Bundle.List
    // }, {
    //   title: "New Bundle",
    //   href: Paths.Bundle.New
    //   }
    ]
  }, {
    title: "Frontend",
    icon: WebIcon,
    children: [{
      title: "Product Groups",
      href: Paths.Frontend.ProductGroupsList
    }, {
      title: "Home Page",
      href: Paths.Frontend.Homepage
    }, {
      title: "Navigation",
      href: Paths.Frontend.Navigation
    },
    {
      title: "Classifications",
      href: Paths.Frontend.Classifications
    },
    {
      title: "Customised Pages",
      href: Paths.Frontend.PagesList
    },
    {
      title: "Bottles Page",
      href: Paths.Frontend.BottlesList
    }]
  }, {
    title: "Sales",
    icon: AttachMoneyIcon,
    children: [
    {
        title: "Order Overview",
        href: Paths.Sales.OrderOverview
    },{
      title: "Straw Replacement",
      href: Paths.Sales.StrawReplacement
    }, {
      title: "Review Management",
      href: Paths.Sales.ReviewManagement
    }]
  }]
}];
