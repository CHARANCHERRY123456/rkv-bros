// Search feature constants
export const SEARCH_CONSTANTS = {
  // Query limits
  MAX_QUERY_LENGTH: 100,
  MIN_QUERY_LENGTH: 1,
  MIN_SUGGESTION_LENGTH: 2,
  
  // Result limits
  MAX_SEARCH_LIMIT: 50,
  MAX_SUGGESTION_LIMIT: 10,
  MAX_EMAIL_VALIDATION_LIMIT: 20,
  MAX_USER_IDS_LIMIT: 50,
  
  // Pagination defaults
  DEFAULT_PAGE: 1,
  DEFAULT_SEARCH_LIMIT: 20,
  DEFAULT_SUGGESTION_LIMIT: 10,
  
  // Sorting
  VALID_SORT_FIELDS: ['name', 'email', 'createdAt'],
  VALID_SORT_ORDERS: ['asc', 'desc'],
  DEFAULT_SORT_FIELD: 'name',
  DEFAULT_SORT_ORDER: 'asc',
  
  // Rate limiting
  DEFAULT_RATE_LIMIT: 100, // requests
  DEFAULT_RATE_WINDOW: 60000, // 1 minute in ms
  SUGGESTION_RATE_LIMIT: 200, // Higher limit for autocomplete
  
  // Database
  DEFAULT_SELECT_FIELDS: 'email name _id',
  
  // Error codes
  ERROR_CODES: {
    INVALID_QUERY: 'INVALID_QUERY',
    QUERY_TOO_LONG: 'QUERY_TOO_LONG',
    QUERY_TOO_SHORT: 'QUERY_TOO_SHORT',
    INVALID_PAGE: 'INVALID_PAGE',
    INVALID_LIMIT: 'INVALID_LIMIT',
    INVALID_SORT_FIELD: 'INVALID_SORT_FIELD',
    INVALID_SORT_ORDER: 'INVALID_SORT_ORDER',
    MISSING_EMAILS: 'MISSING_EMAILS',
    INVALID_EMAILS_FORMAT: 'INVALID_EMAILS_FORMAT',
    EMPTY_EMAILS: 'EMPTY_EMAILS',
    TOO_MANY_EMAILS: 'TOO_MANY_EMAILS',
    MISSING_IDS: 'MISSING_IDS',
    INVALID_IDS_FORMAT: 'INVALID_IDS_FORMAT',
    EMPTY_IDS: 'EMPTY_IDS',
    TOO_MANY_IDS: 'TOO_MANY_IDS',
    MISSING_EMAIL: 'MISSING_EMAIL',
    INVALID_EMAIL_FORMAT: 'INVALID_EMAIL_FORMAT',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    SEARCH_ERROR: 'SEARCH_ERROR',
    FETCH_ERROR: 'FETCH_ERROR',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE'
  }
};

// Success messages
export const SUCCESS_MESSAGES = {
  SEARCH_COMPLETED: 'Search completed successfully',
  ADVANCED_SEARCH_COMPLETED: 'Advanced search completed successfully',
  SUGGESTIONS_RETRIEVED: 'Suggestions retrieved successfully',
  SUGGESTIONS_WITH_ERRORS: 'Suggestions retrieved with errors',
  EMAIL_VALIDATION_COMPLETED: 'Email validation completed successfully',
  USER_FOUND: 'User found successfully',
  USERS_RETRIEVED: 'Users retrieved successfully',
  SERVICE_HEALTHY: 'Search service is healthy'
};

// Error messages
export const ERROR_MESSAGES = {
  QUERY_REQUIRED: 'Search query is required and must be at least 1 character',
  QUERY_TOO_LONG: `Search query cannot exceed ${SEARCH_CONSTANTS.MAX_QUERY_LENGTH} characters`,
  QUERY_STRING: 'Query must be a string and cannot exceed 100 characters',
  PAGE_POSITIVE: 'Page must be a positive number',
  LIMIT_RANGE: `Limit must be between 1 and ${SEARCH_CONSTANTS.MAX_SEARCH_LIMIT}`,
  SUGGESTION_LIMIT_RANGE: `Limit must be between 1 and ${SEARCH_CONSTANTS.MAX_SUGGESTION_LIMIT} for suggestions`,
  INVALID_SORT_FIELD: `Sort field must be one of: ${SEARCH_CONSTANTS.VALID_SORT_FIELDS.join(', ')}`,
  INVALID_SORT_ORDER: 'Sort order must be either "asc" or "desc"',
  EMAILS_REQUIRED: 'Emails array is required in request body',
  EMAILS_ARRAY: 'Emails must be an array',
  EMAILS_NOT_EMPTY: 'Emails array cannot be empty',
  TOO_MANY_EMAILS: `Cannot validate more than ${SEARCH_CONSTANTS.MAX_EMAIL_VALIDATION_LIMIT} emails at once`,
  IDS_REQUIRED: 'IDs array is required in request body',
  IDS_ARRAY: 'IDs must be an array',
  IDS_NOT_EMPTY: 'IDs array cannot be empty',
  TOO_MANY_IDS: `Cannot fetch more than ${SEARCH_CONSTANTS.MAX_USER_IDS_LIMIT} users at once`,
  EMAIL_REQUIRED: 'Email parameter is required',
  INVALID_EMAIL: 'Invalid email format',
  RATE_LIMITED: 'Too many requests, please try again later',
  SEARCH_ERROR: 'Internal server error during search',
  VALIDATION_ERROR: 'Internal server error during email validation',
  FETCH_ERROR: 'Internal server error while fetching user(s)',
  USER_NOT_FOUND: 'User not found with provided email',
  SERVICE_UNHEALTHY: 'Search service is unhealthy'
};

export default { SEARCH_CONSTANTS, SUCCESS_MESSAGES, ERROR_MESSAGES };
