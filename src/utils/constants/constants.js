export const StorageKeys = {
    Theme: "preference:theme",
    Session: "kidztime:session"
};

export const ThemeModes = {
    Dark: "dark",
    Light: "light",
};

export const Paths = {
    Landing: "/",

    Auth: {
        Root: "/auth",
        Login: "/auth/login",
        Password: {
            Request: "/auth/password",
            Reset: "/auth/password/reset"
        }
    },

    Error: {
        Root: "/errors",
        "401": "/errors/error-401",
        "404": "/errors/error-404",
        "500": "/errors/error-500",
        Unauthorized: "/errors/unauthorized",
    },

    Api: {
        Root: "/api",
        Invoice: "/api/orders/:order_id/invoice",
        NoInvoiceFound: "/api/orders/no-invoice-found",
    },

    Accounts: {
        List: "/customers",
        New: "/customers/new",
        Detail: "/customers/:account_id/detail"
    },

    Products: {
        Inventory: "/inventory/list",
        CatalogueList: "/products/catalogue/list",
        Detail: "/products/:product_id/detail",
        BulkUpdate: "/products/bulkupdate",
        PlatformGraceImport: "/products/platformgrace-import",
    },

    PromotionSettings: "/promotion-settings/list",
    PromotionDetail: "/promotion-settings/:group_id/detail",

    Bundle: {
        List: "/bundle/list",
        New: "/bundle/new",
    },

    Frontend: {
        ProductGroupsList: "/frontend/product-groups/list",
        Homepage: "/frontend/homepage",
        Navigation: "/frontend/navigation",
        Classifications: "/frontend/classifications",
        ClassificationDetail: "/frontend/classifications/:classification_id/detail",
        PagesList: "/frontend/pages/list",
        PageDetail: "/frontend/pages/:webpage_id/detail",
        BottlesList: "/frontend/bottles/list",
    },

    Sales: {
        OrderOverview: "/orders",
        OrderDetail: "/orders/:order_id/detail",
        StrawReplacement: "/sales/straw-replacement",
        ReviewManagement: "/sales/review-management",
    },
};

export const Roles = {
    GenericAdmin: "kidztime.genericadmin",
    SuperAdmin: "kidztime.superadmin",
};

export const RolesDisplay = {
    "kidztime.genericadmin": "Generic Admin",
    "kidztime.superadmin": "Super Admin",
}

export const DateFormat = {
    MAIN: "D MMM YYYY, HH:mm"
};

export const ProductStatus = {
    draft: "draft",
    published: "published",
    archived: "archived",
};

export const PageElementType = {
    banner: "banner",
    product_feature: "product-feature",
    category_feature: "category-feature",
    product_listing: "product-listing",
    page_divider: "page-divider",
    character_slider: "character-slider",
    review_slider: "review-slider",
};

export const PageElementHideBottomDivider = {
    true: "true",
    false: "false"
}

export const PageElementMaxWidth = {
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl"
}

export const PageElementDisableGutters = {
    true: "true",
    false: "false"
}

export const PageElementPosition = {
    before: "before",
    after: "after",
};

export const PromotionType = {
    accessory: "accessory",
    gift: "gift",
    discount_group: "discount"
};

export const DiscountType = {
    percent: "percent",
    value: "value"
};

export const OrderStatus = {
    open: "open",
    in_delivery: "in-delivery",
    unprocessed: "unprocessed",
    processed: "processed",
    shipped: "shipped",
    completed: "completed",
    cancelled: "cancelled",
    void: "void",
    partial_refunded: "partial-refunded",
    refunded: "refunded",
};

export const GenderTypes = {
    female: "Female",
    male: "Male",
    unisex: "Male & Female",
};