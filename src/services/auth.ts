enum AUTHENTICATEUSER {
  EMPTY_VALUES = 'Erro durante a captura do email ou da senha',
  EMPTY_ID = 'Erro durante a captura do id do usuário',
}
export const authenticateUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> => {
  // comunicate with the model responsive
  return await new Promise((resolve, reject) => {
    if (!email?.length || !password?.length) {
      reject({
        message: AUTHENTICATEUSER.EMPTY_VALUES,
      });
    }
    // do the database resolution with models

    resolve({
      address: 'Rua 123',
      age: 14,
      name: 'Jhonatam',
      email: 'age123@gmail.com',
      id: 1,
    });
  });
};
export const signOffUser = async ({ id }: { id: number }): Promise<Boolean> => {
  // comunicate with the model responsive
  return await new Promise((resolve, reject) => {
    if (!String(!id)?.length) {
      reject({
        message: AUTHENTICATEUSER.EMPTY_VALUES,
      });
    }
    // do the database resolution with models

    resolve(true);
  });
};
