import { APIError } from './error';
import * as express from 'express';
import { AppDataSource } from './data-source';
import * as http from 'http';
import { createAPI } from './api';
import helmet from 'helmet';
import cors = require('cors');
import { HttpStatusCode } from './@types';

AppDataSource.initialize()
	.then(async () => {
		// create express app
		const app = express();

		// setup security headers
		app.use(helmet());

		// setup cross-origin resource header sharing
		app.use(
			cors({
				origin: '*',
			})
		);

		// parse JSON and url-encoded bodies
		app.use(express.urlencoded({ extended: false }));
		app.use(express.json());

		// initialize api routes
		createAPI(app);

		// handle all routes which aren't part of the application
		app.use('*', (req: express.Request, _res) => {
			throw new APIError(
				'NOT FOUND',
				HttpStatusCode.NOT_FOUND,
				true,
				`Requested URL ${req.originalUrl} not found`
			);
		});

		// error middleware
		app.use(
			(
				err: APIError,
				_req: express.Request,
				res: express.Response,
				_next: express.NextFunction
			) => {
				res.status(err.httpCode || 500);
				res.json({
					date: Date.now(),
					message: err.message,
					error: true,
				});
			}
		);

		const port = process.env.PORT || 3000;

		const server = new http.Server(app);
		server.listen(port);

		server.on('listening', () => {
			console.log(`My unsplash API running in ${process.env.NODE_ENV} on port ${port} 🚀🚀🚀🚀`);
		});

		// start express server

		// insert new photos for test
		// images.forEach(async (image) => {
		// 	await AppDataSource.manager.save(
		// 		AppDataSource.manager.create(Photo, {
		// 			label: image.label,
		// 			imageUrl: image.imageUrl,
		// 		})
		// 	);
		// });
	})
	.catch((error) => console.log(error));
