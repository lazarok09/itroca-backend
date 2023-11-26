enum AUTHENTICATEUSER {
  EMPTY_VALUES = 'Erro durante a captura do email ou da senha',
  EMPTY_ID = 'Erro durante a captura do id do usuário',
}

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
