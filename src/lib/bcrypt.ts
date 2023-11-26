import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function generatePasswordHash({
  password,
}: {
  password: string;
}): Promise<string> {
  return bcrypt.hash(password, saltRounds).then(function (hash) {
    // Store hash in your password DB.
    return hash;
  });
}
export async function comparePasswordHash({
  password,
  hash,
}: {
  password: string;
  hash: string;
}): Promise<boolean> {
  // compare the user input password with the hash in datebase
  return bcrypt.compare(password, hash).then(function (result) {
    // result == false
    return result;
  });
}
