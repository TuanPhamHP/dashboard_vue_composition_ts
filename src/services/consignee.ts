const consigneeRepo = (axios: any) => {
  return {
   getAllConsignee(filterOptions: Record<string, unknown> = {}) {
     const body = {
      ...filterOptions,
      // include: filterOptions.include ? `${filterOptions.include},parts,parts.warehouse,parts.warehouse_off_airport_terminal` : "parts",
     };
     return axios
      .get(`/api/consignees`, {
       params: body,
      })
      .then((res: any) => {
       return res;
      })
      .catch((err: any) => {
       return err.response;
      });
    },
   createConsignee(payload: Record<string, unknown> = {}) {
     return axios
      .post(`/api/consignees`, payload)
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
   updateConsignee(id: unknown, payload: any) {
     return axios
      .post(`/api/consignees/${id}`, payload)
      .then((res: any) => {
       return res;
      })
      .catch((err: any) => {
       return err.response;
      });
    },
    getConsigneeDetail(id: unknown) {
      return axios
      .get(`/api/consignees/${id}`)
      .then((res: any) => {
       return res;
      })
      .catch((err: any) => {
       return err.response;
      });
     },
  };
 };
 export default consigneeRepo;
 