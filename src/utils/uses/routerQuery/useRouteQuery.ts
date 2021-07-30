import router from "@/router/index";
export default function (): any {
 const currentRoute = router.currentRoute;
 const currentParram = currentRoute.params.id;
 
 const queryRoute = currentRoute.query;
 let stringQueryRender = "";
 const arrayKey = Object.keys(queryRoute);
 arrayKey.forEach((o, idx) => {
  if (idx === 0) {
   stringQueryRender += `?${o}=${queryRoute[o]}&`;
  } else if (idx === arrayKey.length - 1) {
   stringQueryRender += `${o}=${queryRoute[o]}`;
  } else {
   stringQueryRender += `${o}=${queryRoute[o]}&`;
  }
 });
 const getQueryRoute = (payload: Record<string, string|Record<string, string>>): string => {
  const queryRoute = payload;
  let stringQueryRender = "";
  const arrayKey = Object.keys(queryRoute);
  arrayKey.forEach((o, idx) => {
   if (idx === 0) {
    stringQueryRender += `?${o}=${queryRoute[o]}&`;
   } else if (idx === arrayKey.length - 1) {
      stringQueryRender += `${o}=${queryRoute[o]}`;
   } else {
      stringQueryRender += `${o}=${queryRoute[o]}&`;
   }
  });
  return stringQueryRender;
 };

 return { queryRoute, stringQueryRender, getQueryRoute,currentParram };
}
