export default function validateAccessInput(args) {
  const { email, username, password } = args;
  const failiure = {};

  if (!isProperUsername(username)) failiure["username"] = "umessage";
  if (!isProperEmail(email)) failiure["email"] = "emessage";
  if (!isProperPassword(password)) failiure["password"] = "pmessage";

  if (Object.keys(failiure).length) return failiure;

  return true;
}

export function isEmptyObject(object) {
  return Object.keys(object);
}

function isProperUsername(username) {
  return username;
}

function isProperEmail(email) {
  return email;
}

function isProperPassword(password) {
  return password;
}
