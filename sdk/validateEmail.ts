const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.-]+$/;

export function validateEmail(email: string) {
  if (email.match(emailRegex)) {
    return true;
  }
  return false;
}
