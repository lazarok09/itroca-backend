interface ErrorHandlerProps {
  status: number;
  message: string;
  error: any;
  prismaMessage: string;
}

export class ErrorHandler {
  constructor(props: ErrorHandlerProps) {
    return props;
  }
}
