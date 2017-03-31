/* @flow */

export function newHelper(msg:string = 'Hello'): string {
  return \`new Helper \${msg}\`;
}

export default {
  newHelper
}
