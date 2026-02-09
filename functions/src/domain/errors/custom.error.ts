export class CustomError extends Error {
  
  // Constructor privado para obligar a usar los métodos estáticos
  private constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  // Factory Method: Bad Request (400)
  static badRequest(message: string) {
    return new CustomError(400, message);
  }

  // Factory Method: Unauthorized (401)
  static unauthorized(message: string) {
    return new CustomError(401, message);
  }

  // Factory Method: Forbidden (403)
  static forbidden(message: string) {
    return new CustomError(403, message);
  }

  // Factory Method: Not Found (404)
  static notFound(message: string) {
    return new CustomError(404, message);
  }

  // Factory Method: Internal Server Error (500)
  static internalServer(message: string = 'Internal Server Error') {
    return new CustomError(500, message);
  }
}