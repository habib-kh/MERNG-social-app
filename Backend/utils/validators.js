function validateRegisterInput(userName, email, password, confirmPassword){
  const errors = {};
  if(userName.trim() === ''){
      errors.userName = 'Username must not be empty';
  }
  if(email.trim() === ''){
    errors.email = 'Email must not be empty';
  }else {
      const regEx =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!email.match(regEx)){
          errors.email = 'email should be valid address';
      }
  }
  if(password.trim() === ''){
      errors.password = 'password must not be empty ';
  }
  if(confirmPassword.trim() === ''){
    errors.confirmPassword = 'confirmPassword must not be empty ';
  }else if(password !== confirmPassword) {
      errors.confirmPassword = ' confirm password should be equal to password'; 
  }
  return {
      errors,
      valid: Object.keys(errors).length < 1,
  }
}

function validateLoginInput(userName, password) {
    const errors = {};
    if(userName.trim() === ''){
        errors.userName = 'Username must not be empty';
    }
    if(password.trim() === ''){
        errors.password = 'password must not be empty ';
    }
    return {
        errors,
        valid: Object.keys(errors).length <1,
    };
}

module.exports = {validateRegisterInput,
    validateLoginInput
};