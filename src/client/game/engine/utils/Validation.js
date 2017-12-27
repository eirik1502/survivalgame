export default class Validation {
  static validateType(object, type, msg = '') {
    if (!(object instanceof type))
      throw new Error('Typevalidation failed\n' + msg);
  }
}
