import { regularExps } from "../../../config/regular-expression.js"

export class CreateSessionDto {
  constructor(
    _id,
    name,
    lastName,
    username,
    email,
    role,
  ){
    this._id = _id
    this.name = name
    this.lastName = lastName
    this.username = username
    this.email = email
    this.role = role
  }
  
  static createSessionDto(props){
    const { _id,name, lastName, username, email, role } = props
    if (!_id) return['ID_EMPTY']
    if (!name) return['name_EMPTY']
    if (!lastName) return['lastName_EMPTY']
    if (!username) return['USERNAME_EMPTY']
    if (!email) return['EMAIL_EMPTY']
    if (!regularExps.email.test(email)) return['EMAIL_INVALID']
    if (!role) return['ROLE_EMPTY']
    return [undefined, new CreateSessionDto(_id,name, lastName, username,email, role)]
  }
}