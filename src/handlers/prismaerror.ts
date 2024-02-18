import { PrismaError } from './prismastatus';

export interface PrismaErrorShape {
  name: string;
  code: keyof typeof PrismaError;
  clientVersion: string;
  meta: {
    target: string[];
  };
}

export const getPrismaMessage = (shape: PrismaErrorShape): string => {
  return PrismaError[shape?.code] ?? "Erro não encontrado";
};
