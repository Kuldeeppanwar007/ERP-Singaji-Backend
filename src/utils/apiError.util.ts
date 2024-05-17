class ApiError extends Error {
  public statusCode: number;
  public data: any | null;
  public success: boolean;
  public error: Error[];
  public message: string;
  constructor(
    statusCode: number,
    message = "Something went wrong",
    error: Error[] = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.error = error;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
