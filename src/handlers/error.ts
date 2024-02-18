interface PrismaHandlerProps {
  status: number;
  message: string;
  error: any;
  prismaMessage: string;
}
interface GenericErrorHandlerProps {
  status: number;
  message: string;
}

export class PrismaErrorHandler {
  constructor(props: PrismaHandlerProps) {
    return props;
  }
}
export class GenericErrorHandler {
  constructor(props: GenericErrorHandlerProps) {
    return props;
  }
}
