export function cashFormat(cash, currency = "SGD") {
  if (cash) {
    switch (currency) {
      case "MYR":
        return `RM ${cash.toFixed(2)}`;
      default:
        return `$${cash.toFixed(2)}`;
    }
  } else {
    return "-";
  }
};

export function nameFormat(model, newline = false) {
  let name = `${model.firstname && `${model.firstname} `}${model.lastname || ""}`;
  if (newline === true) {
    name = `${name}\n`;
  }
  return name || "-";
};

export function quantityFormat(qty = 0) {
  if (qty) {
    return `${qty} pcs`;
  }
  return "-";
};

export function postalCodeFormat(model) {
  if (model?.currency === "MYR") {
    return `${model?.account?.postal_code}\nMalaysia`;
  } else {
    return `Singapore ${model?.account?.postal_code}`;
  }
}