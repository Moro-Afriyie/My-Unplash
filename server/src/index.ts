import { images } from './fakeData';
import { Photo } from './entity/Photo';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';
import * as http from 'http';
import { createAPI } from './api';

AppDataSource.initialize()
	.then(async () => {
		// create express app
		const app = express();
		app.use(bodyParser.json());

		// register express routes from defined application routes
		// Routes.forEach((route) => {
		// 	(app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
		// 		const result = new (route.controller as any)()[route.action](req, res, next);
		// 		if (result instanceof Promise) {
		// 			result.then((result) =>
		// 				result !== null && result !== undefined ? res.send(result) : undefined
		// 			);
		// 		} else if (result !== null && result !== undefined) {
		// 			res.json(result);
		// 		}
		// 	});
		// });

		// initialize api routes
		createAPI(app);

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
