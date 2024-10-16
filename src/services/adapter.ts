import { convertFromCamelToSnakeCase, convertFromSnakeToCamelCase, isArray, isObject } from '../utils';

export function adaptFromServerToClient<T, K>(data: T): K | T {
  if (!data) return data;

  const adaptedData: any = {};

  for(let key in data) {
    switch (true) {
      case isObject(data[key]):
        adaptedData[convertFromSnakeToCamelCase(key)] = adaptFromServerToClient(data[key]);
        break;
    
      case isArray(data[key]):
        adaptedData[convertFromSnakeToCamelCase(key)] = (data[key] as any[]).map((item) => adaptFromServerToClient(item));
        break;

      default:
        adaptedData[convertFromSnakeToCamelCase(key)] = data[key];
        break;
    }    
  }

  return adaptedData;
}

export function adaptFromClientToServer<T, K>(data: T): K | T {
  if (!data) return data;

  const adaptedData: any = {};
 
  for(let key in data) {
    switch (true) {
      case isObject(data[key]):
        adaptedData[convertFromCamelToSnakeCase(key)] = adaptFromClientToServer(data[key]);
        break;

      case isArray(data[key]):
        adaptedData[convertFromCamelToSnakeCase(key)] = (data[key] as any[]).map((item) => adaptFromClientToServer(item));
        break;

      default:
        adaptedData[convertFromCamelToSnakeCase(key)] = data[key];
        break;
    }   
  }

  return adaptedData;
}


