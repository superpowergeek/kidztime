import { ButtonStyles } from "utils/constants/styles";

export const pagesNav = {
  "Customers List": "/customers",
}

export const fields = {
  firstname: {
    label: "Name",
    sortable: true,
  },
  email_address: {
    label: "Email Address",
    sortable: true,
  },
  last_seen_at: {
    label: "Last Seen At",
    sortable: true,
  },
  privileges: {
    label: "Privileges",
    sortable: false,
  },
};

export const buttonConfig = {
  create: {
    style: ButtonStyles.ADD.style,
    title: "Create Customer",
    icon: ButtonStyles.ADD.icon,
  },
};