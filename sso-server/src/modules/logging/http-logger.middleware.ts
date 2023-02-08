import { NextFunction, Request, Response } from 'express';

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const loggerService = new Logger('HttpRequestLogger');
    const tempUrl = req.method + ' ' + req.baseUrl.split('?')[0];
    // const _headers = JSON.stringify(req.headers ? req.headers : {});
    // const _query = JSON.stringify(req.query ? req.query : {});
    const _body = JSON.stringify(req.body ? req.body : {});
    const _url = JSON.stringify(tempUrl ? tempUrl : {});

    // loggerService.log(`${_url} ${_body}`.replace(/\\/, ''), req.url.slice(1).split('/')[0]);
    next();
  }
}
