export const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const REGEX_PHONE = /^(\+84|\+81|0)[1-9]([0-9]{8,9})$/;
export const REGEX_PASSWORD =
  /^(?=.*?[0-9])(?=.*?[A-Za-z])[A-Za-z0-9!@#$%^&*.]{8,25}$/;
export const REGEX_URL = /^(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
