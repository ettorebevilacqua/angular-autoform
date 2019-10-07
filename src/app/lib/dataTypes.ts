export interface DataTypes  {
  null: string,
  object:string,
  array: string,
  string: string,
  boolean: string,
  number: string,
  date: string
};

export interface DataTypeInfo {
  type : string,
  isValue : boolean
};

export const dataTypes = { 
  null: "[object Null]",
  object: "[object Object]",
  array: "[object Array]",
  string: "[object String]",
  boolean: "[object Boolean]",
  number: "[object Number]",
  date: "[object Date]"
};   
 
export const getDataType = (prop: any) : DataTypeInfo => ({
  type :  Object.prototype.toString.call(prop),
  isValue :  [dataTypes.object, dataTypes.array].indexOf( Object.prototype.toString.call(prop)) < 0
});