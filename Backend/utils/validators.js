function validateRegisterInput(userName, email, password, confirmPassword){
  const errors = {};
  if(userName.trim() === ''){
      error.userName = 'Username must not be empty';
  }
  if(email.trim() === ''){
    error.email = 'Email must not be empty';
  }else {
      const regEx =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!email.match(regEx)){
          errors.email = 'email should be valid address';
      }
  }
  if(password.trim() === ''){
      error.password = 'password must not be empty ';
  }
  if(confirmPassword.trim() === ''){
    error.confirmPassword = 'confirmPassword must not be empty ';
  }else if(password !== confirmPassword) {
      error.confirmPassword = ' confirm password should be equal to password'; 
  }
}