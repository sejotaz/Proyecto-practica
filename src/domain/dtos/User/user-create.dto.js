export class CreateUserDto {
  constructor(
    _id,
    name,
    lastName,
    username,
    email,
    password,
  ){
    this._id = _id
    this.name = name
    this.lastName = lastName
    this.username = username
    this.email = email
    this.password = password
  }
  static createUserDto(props){
    const { name, lastName, username, email, password } = props
    if (!email) throw new Error('EMAIL_EMPTY')
    if (!regularExps.email.test(email)) throw new Error('EMAIL_INVALID')
    return [undefined, new CreateUserDto(name, lastName, username,email, password)]
  }
}