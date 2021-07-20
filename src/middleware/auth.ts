const auth = (): any => {
 if (!localStorage.getItem("auth._token.local")) {
  return false;
 }

 return true;
};
export default auth;
