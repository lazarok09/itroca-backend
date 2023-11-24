enum AUTHENTICATEUSER {
  EMPTY_VALUES = 'Erro durante a captura do email ou da senha',
}
export const authenticateUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // comunicate with the model responsive
  return await new Promise((resolve, reject) => {
    if (!email?.length || !password?.length) {
      reject({
        message: AUTHENTICATEUSER.EMPTY_VALUES,
      });
    }
    // do the database resolution with models
    
    resolve({ address: 'Rua 123', age: 14, name: 'Jhonatam' });
  });
};
