import * as express from 'express';

export function asyncMiddleware(fn: Function) {
	return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}
