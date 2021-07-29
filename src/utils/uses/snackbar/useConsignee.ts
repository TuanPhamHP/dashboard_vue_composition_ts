import store from "@/store/index";
import { defaultAlert } from "./dfSetup";

export default function (): any {
 const consignees = {
  update: {
   ...defaultAlert.update,
  },
  create: {
   success: {
    type: "success", // success, warning, error
    content: "Tạo consignee thành công",
    title: "",
   },
   warning: {
    type: "warning", // success, warning, error
    content: "Có dữ liệu thay đổi cần xác nhận",
    title: "",
   },
   error: {
    type: "error", // success, warning, error
    content: "Tạo consignee thất bại",
    title: "",
   },
  },
 };
 const commitToSnack = (payload: Record<string, unknown>) => {
  store.commit("SET_SNACKBAR", payload);
 };
 const consigneeCreate = (_type: string) => {
  switch (_type) {
   case "success":
    commitToSnack(consignees.create.success);
    break;
   case "error":
    commitToSnack(consignees.create.error);
    break;
   case "warning":
    commitToSnack(consignees.create.warning);
    break;
   default:
    break;
  }
 };
 const consigneeUpdate = (_type: string) => {
  switch (_type) {
   case "success":
    commitToSnack(consignees.update.success);
    break;
   case "error":
    commitToSnack(consignees.update.error);
    break;
   case "warning":
    commitToSnack(consignees.update.warning);
    break;
   default:
    break;
  }
 };
 return {
  consigneeCreate,
  consigneeUpdate,
 };
}
