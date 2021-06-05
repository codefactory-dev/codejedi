export default class SolutionValidationError extends Error {
    constructor(message = `Couldn't validate solution`, ...params) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...params)
  
      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, SolutionValidationError)
      }
  
      this.solutionValidationError = true;
      // Custom debugging information
      this.message = message
      this.date = new Date()
    }
  }
  
  try {
    throw new SolutionValidationError('Could not parse')
  } catch(e) {
    console.error(e.solutionValidationError) 
    console.error(e.message)    
    console.error(e.stack) 
}