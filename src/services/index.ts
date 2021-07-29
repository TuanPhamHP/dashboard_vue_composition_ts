import roles from "../services/roles";
import user from "../services/user";
import bag from "../services/bag";
import senders from "../services/senders";
import axios from "axios";
const repository = (axios: any) => {
 return {
  roles: roles(axios),
  user: user(axios),
  bag: bag(axios),
  senders: senders(axios),
 };
};
const repo = repository(axios);
export default repo;
