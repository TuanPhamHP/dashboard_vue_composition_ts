import { NormalFilterObject } from "@/InterfaceModel/Filter";

export const returnFilterObject = (payload: NormalFilterObject): Record<string, unknown> => {
 const key = payload.key;
 const value = payload.value;
 const body = {
  [key]: value,
 };
 return body;
};
