import router from "@/router/index";
export default function (): any {
 const currentRoute = router.currentRoute;
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
  console.log(payload);
  
  let stringQueryRender = "";
  const arrayKey = Object.keys(queryRoute);
  arrayKey.forEach((o, idx) => {
   if (idx === 0) {
    stringQueryRender += `?${o}=${queryRoute[o]}&`;
   } else if (idx === arrayKey.length - 1) {
    
    if(typeof(queryRoute[o])==="object"){
      const _key:string  = o;
      const _obj  = queryRoute[o]
      const cKey = Object.entries(_obj)
      const query = cKey.map(o=> o.join('=')).map(o=> `${_key}.${o}`).join('&');
      console.log('query',query);
      stringQueryRender += `${query}`
    }
    else{
      stringQueryRender += `${o}=${queryRoute[o]}`;
    }
   } else {
    if(typeof(queryRoute[o])==="object"){
      const _key:string  = o;
      const _obj  = queryRoute[o]
      const cKey = Object.entries(_obj)
      const query = cKey.map(o=> o.join('=')).map(o=> `${_key}.${o}`).join('&');
      console.log('query',query);
      stringQueryRender += `${query}&`
    }
    stringQueryRender += `${o}=${queryRoute[o]}&`;
   }
  });
  return stringQueryRender;
 };

 return { queryRoute, stringQueryRender, getQueryRoute };
}
