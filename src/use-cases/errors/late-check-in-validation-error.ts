export class LateCheckInValidationError extends Error {
  constructor() {
    super('Check in only be validated until 20 minutes of its creation')

    this.name = 'LateCheckInValidationError'
  }
}
