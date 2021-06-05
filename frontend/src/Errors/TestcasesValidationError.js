export default class TestcasesValidationError extends Error {
    constructor(message = `Couldn't validate testcases`, ...params) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...params)
  
      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, TestcasesValidationError)
      }
  
      this.testcasesValidationError = true;
      // Custom debugging information
      this.message = message
      this.date = new Date()
    }
  }
  
  try {
    throw new TestcasesValidationError('Could not parse')
  } catch(e) {
    console.error(e.sestcasesValidationError) 
    console.error(e.message)    
    console.error(e.stack) 
}