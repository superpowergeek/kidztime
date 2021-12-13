import moment from "moment";
import { DateFormat } from "utils/constants/constants";

export function nameFormat(data) {
  let firstname = data?.firstname || "";
  let lastname = data?.lastname || "";
  let name = firstname.length > 0 && lastname.length > 0 ? `${firstname + " "}${lastname}` : "-";
  return name;
}

export function dateFormat(data) {
  let last_seen_at = data.last_seen_at ? moment(data.last_seen_at).format(DateFormat.MAIN) : "-";
  return last_seen_at;
};

export function descripFormat(data) {
  let description = data.product_info.description ? data.product_info.description : "";
  return description;
};

export function linkFormat(data, link) {
  let newLink = link.replace(":item_id", data.id);
  return newLink;
};
////////////////////////////////////////////////////////////////////