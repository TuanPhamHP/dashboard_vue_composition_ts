const  agenciesRepo = (axios: any) => {
 return {
  getAll(filterOptions: Record<string, unknown> = {}) {
   const body = {
    ...filterOptions,
    // include: filterOptions.include ? `${filterOptions.include},parts,parts.warehouse,parts.warehouse_off_airport_terminal` : "parts",
   };
   return axios
    .get(`/api/agencies`, {
     params: body,
    })
    .then((res: any) => {
     return res;
    })
    .catch((err: any) => {
     return err.response;
    });
  },
  getDetail(_id:number) {
    return axios
     .get(`/api/agencies/${_id}`)
     .then((res: any) => {
      return res;
     })
     .catch((err: any) => {
      return err.response;
     });
   },

  create(payload: Record<string, unknown> = {}) {
   return axios
    .post(`/api/agencies`, payload)
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
    url: `api/agencies/${_id}`,
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
    .post(`api/agencies/${id}`, payload)
    .then((res: any) => {
     return res;
    })
    .catch((err: any) => {
     return err.response;
    });
  },
 };
};
export default  agenciesRepo;
