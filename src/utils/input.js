import validator from 'validator';

export const validateInput = (data, pathname) => {
  let errors = {};

  if (validator.isEmpty(data.email)) {
    errors.email = 'Bắt buộc';
  }
  else if (!validator.isEmail(data.email)) {
    errors.email = 'Email có dạng: example@mail.com'
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Bắt buộc';
  } 

  if (pathname === '/signup') {
    if (validator.isEmpty(data.retype_password)) {
      errors.retype_password = 'Bắt buộc';
    }
    if (data.retype_password !== data.password) {
      errors.retype_password = 'Mật khẩu không khớp';
    }
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}