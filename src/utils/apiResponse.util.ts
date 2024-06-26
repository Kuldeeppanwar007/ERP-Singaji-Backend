class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public statusCode: number;
  public data: T;

  constructor(statusCode: number, data: T, message = "Success") {
    this.success = statusCode < 400;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export { ApiResponse };
