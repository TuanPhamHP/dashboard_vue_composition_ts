const shippingRepo = (axios: any) => {
  return {
   getAll(filterOptions: Record<string, unknown> = {}) {
     const body = {
      ...filterOptions,
      // include: filterOptions.include ? `${filterOptions.include},parts,parts.warehouse,parts.warehouse_off_airport_terminal` : "parts",
     };
     return axios
      .get(`/api/shipping-partners`, {
       params: body,
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
      .post(`/api/shipping-partners`, payload)
      .then((res: any) => {
       return res;
      })
      .catch((err: any) => {
       return err.response;
      });
    },
 
   delete(_id: unknown) {
    return axios({
     method: "DELETE",
     url: `api/shipping-partners/${_id}`,
    })
     .then((res: any) => {
      return res;
     })
     .catch((err: any) => {
      return err.response;
     });
   },
   update(id: unknown, payload: any) {
     return axios
      .post(`/api/shipping-partners/${id}`, payload)
      .then((res: any) => {
       return res;
      })
      .catch((err: any) => {
       return err.response;
      });
    },
    getDetail(id: unknown) {
      return axios
      .get(`/api/shipping-partners/${id}`)
      .then((res: any) => {
       return res;
      })
      .catch((err: any) => {
       return err.response;
      });
     },
  };
 };
 export default shippingRepo;
 