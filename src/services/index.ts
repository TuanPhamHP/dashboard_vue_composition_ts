import roles from "../services/roles";
import user from "../services/user";
import axios from "axios";
const repository = (axios: any) => {
 return {
  roles: roles(axios),
  user: user(axios),
 };
};
const repo = repository(axios);
export default repo;
