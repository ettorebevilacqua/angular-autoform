import { dataTypes, getDataType, DataTypeInfo } from "./dataTypes";

const filterType = typeToFilt => eventInfo => eventInfo.type === typeToFilt;

export const util = list => ({
  getObjects: list.filter(filterType(dataTypes.object)),
  getArrays: list.filter(filterType(dataTypes.array)),
  getValues: list.filter(eventInfo => eventInfo.isValue),
  getByPath: path => list.filter(eventInfo => eventInfo.path === path[0])
});

export interface cbEvent {
  (acc: any, event: EventInfo, when?: number | undefined): void;
}
type CallbackFunctionVariadic = (...args: any[]) => void;

export interface EventInfo {
  type: string;
  parent: EventInfo;
  isValue: boolean;
  key: string | number;
  value: any;
  path: string;
  level: number;
  childs: [] | null;
}

export interface iEventSwitch {
  onObject: cbEvent;
  onArray: cbEvent;
  onValue: cbEvent;
}

type EventSwitcher = ( enventInfo: EventInfo, param: any) => void;
export const EventSwitch = (events: iEventSwitch): EventSwitcher => (
  infoevent: EventInfo,
  param
) =>
  infoevent.type === dataTypes.object
    ? events.onObject(infoevent, param)
    : infoevent.type === dataTypes.array
    ? events.onArray( infoevent, param)
    : events.onValue(infoevent, param);

const getEventInfo = (
  parent: EventInfo,
  key: string | number,
  value: any,
  type: DataTypeInfo,
  path: string,
  level: number
): EventInfo => ({
  type: type.type,
  parent,
  isValue: type.isValue,
  key,
  value,
  path: path + key + "/",
  level: level,
  childs: []
});

export const ObjWalker = (startAcc: any, model: object, cb: cbEvent): any => {
  const list = [];
  const _scan = (
    acc: any,
    parent: EventInfo,
    value: any,
    key: number | string,
    path: string,
    level: number
  ) => {
    const typeValue = getDataType(value);
    const eventInfo = getEventInfo(
      parent,
      key,
      value,
      typeValue,
      path,
      level++
    );
    list.push(eventInfo);
    parent && parent.childs.push(eventInfo as never);
    acc = cb(acc, eventInfo);
    typeValue.isValue ||
      Object.keys(value).map(keyObj =>
        _scan(acc, eventInfo, value[keyObj], keyObj, eventInfo.path, level)
      );
    return acc;
    //   cb(eventInfo, 1);
  };

  const newAcc = _scan(startAcc, null, model, "", "", 0);
  const filterType = typeToFilt => eventInfo => eventInfo.type === typeToFilt;
  return newAcc;
};
