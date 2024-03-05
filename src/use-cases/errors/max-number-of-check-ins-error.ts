export class MaxNumberOfCheckInError extends Error {
  constructor() {
    super('Daily number of check ins was excedeed')

    this.name = 'MaxNumberOfCheckInError'
  }
}
