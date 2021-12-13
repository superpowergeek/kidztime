import { ButtonStyles } from "utils/constants/styles";

export const fields = {
  character: {
    image: {
      label: "",
      sortable: false,
    },
    name: {
      label: "Character",
      sort: true,
    },
    code: {
      label: "Gender",
      sort: true,
    },
    actions: {
      label: "",
      sort: false,
    }
  },
  category: {
    name: {
      label: "Category",
      sort: true,
    },
    actions: {
      label: "",
      sort: false,
    }
  },
  product_type: {
    product_type: {
      label: "Product Type",
      sort: true,
    },
    age: {
      label: "Age",
      sort: true,
    },
    actions: {
      label: "",
      sort: false,
    }
  }

};

export const buttonConfig = {
  character: {
    create: {
      style: ButtonStyles.ADD.style,
      title: "Create Character",
      icon: ButtonStyles.ADD.icon,
    }
  },
  category: {
    create: {
      style: ButtonStyles.ADD.style,
      title: "Create Category",
      icon: ButtonStyles.ADD.icon,
    }
  },
  product_type: {
    create: {
      style: ButtonStyles.ADD.style,
      title: "Create Product Type",
      icon: ButtonStyles.ADD.icon,
    }
  }
};