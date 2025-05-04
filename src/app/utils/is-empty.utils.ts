import { isDefined } from './is-defined.utils';

export function notEmpty(object: any | any[]): boolean {
  return isDefined(object) && !!Object.keys(object).length;
}
