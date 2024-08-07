export const regs = {
  url: "^(http|https|ftp)://[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9-._?,'/\\+&amp;%$#=~])*[^.,)(s]$",
  email: '^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$',
  mobile: /^1[^12][0-9]{9}$/,
  tel: '^0\\d{2,3}-?\\d{7,8}$', //固话
  idCard: /^\d{15}(\d{2}[A-Za-z0-9])?$/,
  currency: '^\\d+(\\.\\d+)?$',
  qq: '^[1-9]d{4,8}$',
  number: '^[0-9]*$',
  positiveInt: '^[1-9]d*$',
  zip: '^[1-9]d{5}$',
  double: '^[-+]?d+(.d+)?$',
  english: '^[A-Za-z]+$',
  chinese: '^[\u0391-\uFFE5]+$',
  unSafe: '^(.{0,5})$|s',
  date: '(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)',
  name: /^[\u4e00-\u9fa5\ a-zA-Z]+$/
};

function validation(reg) {
  return value => {
    if(isString(value)) {
      const regExp = new RegExp(regs[reg]);
      return regExp.test(value);
    }
    return false;
  };
}

export const isString = value => {
  return typeof value === 'string';
};

// 金额校验
export const isCurrency = value => {
  return validation('currency')(value);
};

//URL验证
export const isUrl = value => {
  return validation('url')(value);
};

//邮箱验证
export const isEmail = value => {
  return validation('email')(value);
};

//手机号码验证
export const isMobile = value => {
  return validation('mobile')(value);
};

//正整数验证
export const isNumber = value => {
  return validation('number')(value);
};

//验证必填（可验证数组）
export const requiredValid = value => {
  if(typeof value === 'undefined') {
    return false;
  } else if(typeof value === 'string') {
    return !!trim(value);
  } else if(Array.isArray(value)) {
    if(value.length === 0) {
      return false;
    }
    for(const item of value) {
      if(typeof item !== 'number' && !trim(item)) {
        return false;
      }
    }
  }
  return true;
};

//验证数据是否不为空（空值时返回false，null、undefined、空字符串、空数组、空对象都被设定为空）
export const isNotEmpty = value => {
  switch (typeof value) {
    case 'undefined': {
      return false;
    }

    case 'string': {
      return value.length !== 0;
    }

    case 'object': {
      if(Array.isArray(value)) {
        return value.length !== 0;
      } else if(value === null) {
        return false;
      } else {
        return Object.keys(value).length !== 0;
      }
    }

    default: {
      return true;
    }
  }
};

//验证最大长度
export const maxLengthValid = (value, maxLength) => {
  let length;
  if(typeof value === 'number') {
    length = String(value).length;
  } else if(value instanceof Array || typeof value === 'string') {
    length = value.length;
  }
  return maxLength > 0 && length <= maxLength;
};

//验证最小长度
export const minLengthValid = (value, minLength) => {
  let length;
  if(typeof value === 'number') {
    length = String(value).length;
  } else if(value instanceof Array || typeof value === 'string') {
    length = value.length;
  }
  return minLength > 0 && length >= minLength;
};

//验证指定正则
export const patternValid = (value, pattern) => {
  if(!pattern) return false;

  if(typeof pattern === 'string') {
    return new RegExp(pattern).test(value);
  } else if(pattern instanceof RegExp) {
    return pattern.test(value);
  } else {
    return false;
  }
};

export const required = (values, errors, fieldNames) => {
  let fieldNamesArray: string[] = [];
  if(typeof fieldNames === 'string') {
    fieldNamesArray = [fieldNames];
  } else if(fieldNames instanceof Array) {
    fieldNamesArray = fieldNames;
  }
  for(const fieldName of fieldNamesArray) {
    if(!values[fieldName]) {
      errors[fieldName] = '必填';
    }
  }
};

export const trim = str => {
  return str == null ? '' : String.prototype.trim.call(str);
};
