export class Flunt {
  constructor(public errors: any[] = []) {}

  isRequired(value: string, message) {
    if (!value || value.length <= 0) {
      this.errors.push(message);
    }
  }

  hasMinLen = (value: string, min, message) => {
    if (!value || value.length < min) {
      this.errors.push(message);
    }
  };

  hasMaxLen = (value: string, max, message) => {
    if (!value || value.length > max) {
      this.errors.push(message);
    }
  };

  hasMinValue = (value: number, min, message) => {
    if (!value || value < min) {
      this.errors.push(message);
    }
  };

  hasMaxValue = (value: number, max, message) => {
    if (!value || value > max) {
      this.errors.push(message);
    }
  };

  isFixedLen = (value: string, len, message) => {
    if (!value || value.length !== len) {
      this.errors.push(message);
    }
  };

  isEmail = (value: string, message) => {
    const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value)) {
      this.errors.push(message);
    }
  };

  isNotNull = (value, message) => {
    if (!value.length) {
      this.errors.push(message);
    }
  };

  isGreaterThan = (valuea, valueb, message) => {
    if (valuea > valueb) {
      this.errors.push(message);
    }
  };

  clear() {
    this.errors = [];
  }

  isValid() {
    return this.errors.length === 0;
  }
}
