export enum ENUM_AUTH_CONTROLLER {
  INVALID_CREDENTIALS = 'Invalid username or password',
  INVALID_REQUEST = 'Email or password not specified',
  SIGNUP_ERROR = 'An error occurred while registering a new user',
  LOGOFF_ERROR = 'An error occurred while logging out the user',
  SIGNUP_UNPROCESSABLE_ERROR = 'An error occurred during registration. Please check the attributes and try again.',
}

export enum ENUM_PRODUCT_CONTROLLER {
  GENERIC_ERROR = 'An error occurred while validating the product information.',
  ATTR_ERROR = 'Please check the attributes and try again.',
  SEARCH_PRODUCTS_ERROR = 'An error occurred while searching for products.',
  SEARCH_PRODUCT_ERROR = 'An error occurred while searching for this product.',
  UPDATE_ERROR = 'An error occurred while updating this product.',
  DELETE_ALL_ERROR = 'An error occurred while deleting all products.',
  DELETE_ERROR = 'An error occurred while deleting this product.',
  UNPROCESSABLE_PRODUCT_ENTITY_VALIDATION = 'An error occurred while validating the product information.',
  UNPROCESSABLE_PRODUCT_ENTITY_CREATION = 'An error occurred while creating the product.',
}

export enum ENUM_USER_CONTROLLER {
  USER_NOT_FOUND = 'User not found',
  SEARCH_USER_ERROR = 'An error occurred while searching for this user.',
  MIS_LEAD_TOKEN = 'Your token is missing or invalid.',
}
