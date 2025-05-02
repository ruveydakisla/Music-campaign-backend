export function successResponse<T>(data: T) {
  return {
    success: true,
    timestamp: new Date().toISOString(),
    data,
  };
}

export function errorResponse(message: string, statusCode = 500) {
  return {
    success: false,
    timestamp: new Date().toISOString(),
    error: {
      message,
      statusCode,
    },
  };
}
