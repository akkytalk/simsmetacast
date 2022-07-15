import dateFormat from "dateformat";
export function DateFormat({ data }) {
  return data ? dateFormat(data, "dd/mm/yyyy") : "";
}
