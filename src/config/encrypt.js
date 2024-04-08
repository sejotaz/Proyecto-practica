import pkg from 'bcryptjs';
const { compareSync, genSaltSync, hashSync } = pkg;

export const bcryptAdapter = {
  hash: (password)=> {
    const salt = genSaltSync()
    return hashSync(password, salt)
  },
  compare: (password, hashed) => {
    return compareSync(password, hashed)
  },
}