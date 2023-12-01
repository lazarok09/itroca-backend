import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;
export const generateJWT = ({ email, id }: { email: string; id: number }) => {
  if (SECRET_KEY) {
    return jwt.sign(
      {
        data: { email: email, id: id },
      },
      SECRET_KEY,
      { expiresIn: '1h' },
    );
  } else {
    throw new Error('Secret Key not provided');
  }
};

export const verifyJWT = ({ token }: { token: string }) => {
  if (SECRET_KEY) {
    return new Promise<VerifyJWTResultDecoded>((resolve, reject) => {
      return jwt.verify(token, SECRET_KEY, (error, decoded: any) => {
        if (error) {
          console.error(`Erro  na verificação do JWT: ${error}`);
          reject(error);
        }
        resolve(decoded);
      });
    });
  } else {
    throw new Error('Secret Key not provided');
  }
};
