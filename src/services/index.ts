import roles from "../services/roles";
import user from "../services/user";
import bag from "../services/bag";
import senders from "../services/senders";
import consignee from "../services/consignee";
import users from "../services/users";
import agency from "../services/agency";
import order from "../services/order";
import shipping from "../services/shipping";
import axios from "axios";
const repository = (axios: any) => {
 return {
  roles: roles(axios),
  user: user(axios),
  bag: bag(axios),
  senders: senders(axios),
  consignee: consignee(axios),
  users: users(axios),
  agency: agency(axios),
  order: order(axios),
  shipping: shipping(axios)
 };
};
const repo = repository(axios);
export default repo;
