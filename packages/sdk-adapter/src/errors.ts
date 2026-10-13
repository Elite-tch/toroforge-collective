export class ToroError extends Error {
  public code: string;
  public operation: string;
  public details: any;

  constructor(message: string, code: string, operation: string, details?: any) {
    super(message);
    this.name = 'ToroError';
    this.code = code;
    this.operation = operation;
    this.details = details;
  }
}

export const normalizeError = (error: any, operation: string): ToroError => {
  let message = 'An unknown error occurred';
  let code = 'UNKNOWN_ERROR';
  
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else if (error && error.response && error.response.data) {
    const dataErr = error.response.data.error || error.response.data.message || error.response.data;
    message = typeof dataErr === 'object' ? JSON.stringify(dataErr) : String(dataErr);
  } else if (error && error.message) {
    message = typeof error.message === 'object' ? JSON.stringify(error.message) : String(error.message);
  } else if (error && typeof error === 'object') {
    message = JSON.stringify(error);
  }
  
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('insufficient')) {
    code = 'INSUFFICIENT_FUNDS';
  } else if (lowerMsg.includes('password') || lowerMsg.includes('credentials') || lowerMsg.includes('auth')) {
    code = 'INVALID_PASSWORD';
  } else if (lowerMsg.includes('not found') || lowerMsg.includes('unavailable') || lowerMsg.includes('does not exist')) {
    code = 'NOT_FOUND';
  } else if (lowerMsg.includes('taken') || lowerMsg.includes('already exists') || lowerMsg.includes('in use')) {
    code = 'ALREADY_EXISTS';
  } else if (lowerMsg.includes('network') || lowerMsg.includes('timeout') || lowerMsg.includes('econnrefused')) {
    code = 'NETWORK_ERROR';
  } else if (lowerMsg.includes('invalid') || lowerMsg.includes('format')) {
    code = 'INVALID_INPUT';
  } else if (lowerMsg.includes('kyc') || lowerMsg.includes('verify')) {
    code = 'KYC_ERROR';
  } else if (lowerMsg.includes('admin') || lowerMsg.includes('permission') || lowerMsg.includes('unauthorized')) {
    code = 'UNAUTHORIZED';
  }

  return new ToroError(message, code, operation, error);
};
