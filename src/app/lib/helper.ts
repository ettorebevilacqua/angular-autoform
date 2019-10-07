export const iif = (test: boolean, runTrue: () => any, runFalse: () => any): any => test ? runTrue : runFalse;

export function getObjVal(obj, path){
    return path.trim().replace(/\//g, '.').split('.').reduce ( (res, prop) => res[prop], obj );
}

export const dataTypes:any = {
  'get': function (prop) {
    return Object.prototype.toString.call(prop);
  },
  'null': '[object Null]',
  'object': '[object Object]',
  'array': '[object Array]',
  'string': '[object String]',
  'boolean': '[object Boolean]',
  'number': '[object Number]',
  'date': '[object Date]'
}
enum events {onObject, onArray, onValue};

export function scan(onObject: Function, onArray: Function, onValue: Function):any {
  return (acc, model):any => {
    function scanT(acc: Object, value: any, key: number | string, path: string):any {

      const scanArray = (lacc) => {
        path = path + '/' + key;
        let nacc = onArray(lacc, key, value, path);
        value.map((val, keyAr) => {
          scanT(nacc, val, keyAr, path);
        });
        onArray(nacc, key, value, path, true);
        return nacc;
      }
      const scanObj = (lacc) => {
        path = path + '/' + key;
        let nacc = onObject(lacc, key, value, path);
        Object.keys(value).map(keyObj => {
          scanT(nacc, value[keyObj], keyObj, path);
        });
        onObject(nacc, key, value, path, true);
        return nacc;
      }

      const typeValue = dataTypes.get(value);

      acc = typeValue === dataTypes.array ? scanArray(acc) :
        typeValue === dataTypes.object ? scanObj(acc) : onValue(acc, key, value, path, typeValue);

      return acc;
    }

    return scanT(acc, model, '', '');
  }
}