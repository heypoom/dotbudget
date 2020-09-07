export class ParserError extends Error {
  constructor(message: string) {
    super(message)

    this.name = 'ParserError'
    this.message = message

    Error.captureStackTrace(this)
  }
}
