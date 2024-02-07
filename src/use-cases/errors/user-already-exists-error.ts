export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Emails already exists')
    this.name = 'UserAlreadyExistsError'
  }
}
