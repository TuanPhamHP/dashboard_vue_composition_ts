const localToken = localStorage.getItem("auth._token.local");

const roleRepo = (axios: any) => {
 return {
  loginUser(payload: Record<string, string>) {
   return axios
    .post(`/api/auth/login`, payload, {
     headers: {
      Authorization: null,
     },
    })
    .then((res: any) => {
     return res;
    })
    .catch((err: any) => {
     return err.response;
    });
  },
  getUserInfo() {
   return axios
    .get(`/api/users/me?include=roles,permissions`, {
     headers: {
      Authorization: localToken,
     },
    })
    .then((res: any) => {
     return res;
    })
    .catch((err: any) => {
     return err.response;
    });
  },

  create(payload: Record<string, unknown> = {}) {
   return axios
    .post(`/api/roles?include=permissions`, payload)
    .then((res: any) => {
     return res;
    })
    .catch((err: any) => {
     return err.response;
    });
  },

  delete(_id: number) {
   return axios({
    method: "DELETE",
    url: `api/roles/${_id}`,
   })
    .then((res: any) => {
     return res;
    })
    .catch((err: any) => {
     return err.response;
    });
  },

  update(payload: any, id: number) {
   return axios
    .put(`api/roles/${id}?include=permissions`, payload)
    .then((res: any) => {
     return res;
    })
    .catch((err: any) => {
     return err.response;
    });
  },
 };
};
export default roleRepo;
