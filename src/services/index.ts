import roles from "../services/roles";
import axios from "axios";
const repository = (axios: any) => {
 return {
  roles: roles(axios),
 };
};
const repo = repository(axios);
export default repo;
