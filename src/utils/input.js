import validator from 'validator';

export const validateInput = (data, pathname) => {
  let errors = {};

  if (validator.isEmpty(data.email)) {
    errors.email = 'Cần nhập email';
  }
  else if (!validator.isEmail(data.email)) {
    errors.email = 'Email có dạng: example@mail.com'
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Cần nhập mật khẩu';
  } 

  if (pathname === '/signup') {
    if (validator.isEmpty(data.retypePassword)) {
      errors.retypePassword = 'Cần nhập Nhập lại mật khẩu';
    }
    if (data.retypePassword !== data.password) {
      errors.retypePassword = 'Mật khẩu không khớp';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}