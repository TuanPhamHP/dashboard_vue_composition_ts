import store from "@/store/index";
import { defaultAlert } from "./dfSetup";

export default function (): any {
 const orders = {
  update: {
   ...defaultAlert.update,
  },
  create: {
   success: {
    type: "success", // success, warning, error
    content: "Tạo order thành công",
    title: "",
   },
   warning: {
    type: "warning", // success, warning, error
    content: "Có dữ liệu thay đổi cần xác nhận",
    title: "",
   },
   error: {
    type: "error", // success, warning, error
    content: "Tạo order thất bại",
    title: "",
   },
  },
 };
 const commitToSnack = (payload: Record<string, unknown>) => {
  store.commit("SET_SNACKBAR", payload);
 };
 const orderCreate = (_type: string) => {
  switch (_type) {
   case "success":
    commitToSnack(orders.create.success);
    break;
   case "error":
    commitToSnack(orders.create.error);
    break;
   case "warning":
    commitToSnack(orders.create.warning);
    break;
   default:
    break;
  }
 };
 const orderUpdate = (_type: string) => {
  switch (_type) {
   case "success":
    commitToSnack(orders.update.success);
    break;
   case "error":
    commitToSnack(orders.update.error);
    break;
   case "warning":
    commitToSnack(orders.update.warning);
    break;
   default:
    break;
  }
 };
 return {
  orderCreate,
  orderUpdate,
 };
}
