import { AnyObject } from '@interfaces/index';

export const trimAndReplaceSpacesFromObject = (object: AnyObject): AnyObject => {
  const newObject: AnyObject = {};

  Object.entries(object).forEach((property: any[]) => {
    const [key, value] = property;
    newObject[key] = typeof value === 'string'
      ? value.trim().replace(/\s\s+/g, ' ')
      : value;
  });

  return newObject;
};
