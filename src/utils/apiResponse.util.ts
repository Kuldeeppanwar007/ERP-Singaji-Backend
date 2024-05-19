// Custom Error Class
class ApiError extends Error {
  public statusCode: number;
  public data: any | null = null;
  public success = false;
  public errors: Error[] = [];
  public message: string;

  constructor(
      statusCode: number,
      message = "Something went wrong",
      errors: Error[] = []
  ) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.errors = errors; 
      Error.captureStackTrace(this, this.constructor);
  }
}

// Generic API Response Class
class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public statusCode: number;
  public data?: T; 

  constructor(statusCode: number, message = "Success", data?: T) {
      this.success = statusCode < 400;
      this.message = message;
      this.statusCode = statusCode;
      this.data = data;
  }
}

export { ApiError, ApiResponse };
