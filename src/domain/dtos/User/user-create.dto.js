import { regularExps } from "../../../config/regular-expression.js"

export class CreateUserDto {
  constructor(
    name,
    lastName,
    username,
    email,
    password,
  ){
    this.name = name
    this.lastName = lastName
    this.username = username
    this.email = email
    this.password = password
  }
  
  static createUserDto(props){
    const { name, lastName, username, email, password } = props
    console.log({email});
    if (!email) return['EMAIL_EMPTY']
    if (!password) return['EMAIL_password']
    if (!username) return['EMAIL_username']
    if (!regularExps.email.test(email)) return['EMAIL_INVALID']
    return [undefined, new CreateUserDto(name, lastName, username,email, password)]
  }
}