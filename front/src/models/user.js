export default class User {
  constructor(email = '', password = '', name = '', birthday = '') {
    this.email = email;
    this.password = password;
    this.name = name;
    this.birthday = birthday;
  }
}
