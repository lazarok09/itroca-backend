import { PrismaError } from './prismastatus';

export interface PrismaErrorShape {
  name: string;
  code: keyof typeof PrismaError;
  clientVersion: string;
  meta: {
    target: string[];
  };
}

export const getPrismaMessage = (shape: PrismaErrorShape) => {
  try {
    return PrismaError[shape.code];
  } catch (e) {
    return 'Erro no enum Prisma não foi encontrado.';
  }
};
