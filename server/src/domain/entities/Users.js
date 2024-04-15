export class UserEntity {
  constructor(
    _id,
    name,
    lastName,
    username,
    email,
    emailValidated,
    role
  ) {
    this._id = _id
    this.name = name
    this.lastName = lastName
    this.username = username
    this.email = email
    this.emailValidated = emailValidated
    this.role = role
  }

  static fromObject(object){
    const {_id, name, lastName, username, email, emailValidated, role} = object
    if(!_id) throw new Error('ID_IS_REQUIRED')
    if(!name) throw new Error('NAME_IS_REQUIRED')
    if(!lastName) throw new Error('LASTNAME_IS_REQUIRED')
    if(!username) throw new Error('USERNAME_IS_REQUIRED')
    if(!email) throw new Error('EMAIL_IS_REQUIRED')
    if(typeof emailValidated !== 'boolean')throw new Error('EMAIL_IS_NOT_VERIFY')
    return new UserEntity(_id, name, lastName, username, email, emailValidated, role)
  }
}