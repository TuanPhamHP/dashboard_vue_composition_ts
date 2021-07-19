const roleRepo = (axios: any) => {
 return {
  getAll(filterOptions: Record<string, unknown> = {}) {
   const body = {
    ...filterOptions,
    include: filterOptions.include ? `${filterOptions.include},parts,parts.warehouse,parts.warehouse_off_airport_terminal` : "parts",
   };
   return axios
    .get(`https://api-warehouse-dev.asgl.net.vn/api/merchandises`, {
     headers: {
      Authorization:
       "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaWQtZGV2LmFzZ2wubmV0LnZuXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjI0NDE1MjUxLCJleHAiOjE2NTU5NTEyNTEsIm5iZiI6MTYyNDQxNTI1MSwianRpIjoiZmJQeVJNY2hFclp0dTgweiIsInN1YiI6Mjg1LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIiwidXNlciI6eyJpZCI6Mjg1LCJ1c2VybmFtZSI6ImFzZ2wtMDIyOCIsImVtYWlsIjoiYmluaC5uaEBhc2dsLnZuIiwiZnVsbF9uYW1lIjoiTmd1eVx1MWVjNW4gSFx1MWVlZnUgQlx1MDBlY25oIiwiYXNnbF9pZCI6IkFTR0wtMDIyOCIsImlzX2FjdGl2ZSI6MSwibW9iaWxlX3Bob25lIjoiMDk4NDY4NDg1MSIsImNoYXRfaWQiOiIzNkEzM0NnbkNQRFlvcmFLbyIsImF2YXRhciI6Imh0dHBzOlwvXC9pZC1kZXYuYXNnbC5uZXQudm5cL2F2YXRhclwvYXNnbC0wMjI4IiwicG9ydHJhaXQiOiJodHRwczpcL1wvaWQtZGV2LmFzZ2wubmV0LnZuXC9wb3J0cmFpdFwvYXNnbC0wMjI4IiwicG9zaXRpb25zIjpbeyJpZCI6MjIsIm5hbWUiOiJMXHUxZWFkcCB0clx1MDBlY25oIHZpXHUwMGVhbiIsImxldmVsIjp7ImlkIjoxMywibmFtZSI6Ik5oXHUwMGUybiB2aVx1MDBlYW4ifSwiZGVwYXJ0bWVudCI6eyJpZCI6NiwibmFtZSI6Ilx1MDExMFx1MWVkOWkgcGhcdTAwZTF0IHRyaVx1MWVjM24gcGhcdTFlYTduIG1cdTFlYzFtIiwic2hvcnRfY29kZSI6Ilx1MDExMFBUUE1HTCIsInBhcmVudF9pZCI6NSwibGV2ZWwiOnsiaWQiOjUsIm5hbWUiOiJcdTAxMTBcdTFlZDlpIn19fV19LCJhcHBsaWNhdGlvbl9hY2Nlc3NfcGVybWlzc2lvbnMiOlsiU0Nvbm5lY3QiLCJUaW1lQXR0ZW5kYW5jZSIsIlNDb25uZWN0QWRtaW4iLCJXb3JrU2NoZWR1bGUiLCJXb3JrU2NoZWR1bGVBZG1pbiIsIlNDYW50ZWVuIiwiU0NhbnRlZW5BZG1pbiIsIlNBc3NldCIsIlRvYm90QWRtaW4iLCJTQXBpRG9jdW1lbnRBZG1pbiIsIlNQcm9qZWN0IiwiU0h1bWFuQWRtaW4iLCJTV2FyZWhvdXNlIl19.QJu7-GMA7E-Vk9IoY7ZYU8KX1oDC1I9HDo3RhAP5p0E",
     },
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
