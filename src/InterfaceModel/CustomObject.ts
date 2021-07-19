const getKeyValue =
 <T, U extends keyof T>(obj: T) =>
 (key: U) =>
  obj[key];
const FalselyArray: any[] = ["", 0, undefined, null, [], {}];
const identifyCustomVal = (_obj: Record<string, unknown>, _arrayField: string[] = []): Record<string, unknown> => {
 for (const key in _obj) {
  if (_arrayField.includes(key) && FalselyArray.includes(getKeyValue(_obj)(key as never))) {
   delete _obj[key as never];
  }
 }
 return _obj;
};
export class IdentifyObject extends Object {
 constructor(public rootObject: Record<string, unknown>) {
  super();
 }
 identifySelf = (): Record<string, unknown> => {
  const payload: string[] = Object.keys(this.rootObject);
  const currentVal: Record<string, unknown> = { ...this.rootObject };
  return identifyCustomVal(currentVal, payload);
 };
}
