import { Response } from 'express';
import httpStatusCodes from '@utils/httpStatusCodes';

export abstract class BaseController {
  protected handleSuccess<T>(res: Response, data: T): void {
    res.status(httpStatusCodes.OK).json(data);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected handleCreated(res: Response, data: any): void {
    res.status(httpStatusCodes.CREATED).json(data);
}
  protected handleNotFound(res: Response, message: string = 'Resource not found'): void {
    res.status(httpStatusCodes.NOT_FOUND).json({ message });
  }

  protected handleError(res: Response, error: unknown): void {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }

}