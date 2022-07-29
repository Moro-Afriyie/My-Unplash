import { AppDataSource } from './data-source';
import * as http from 'http';
import app from './app';

AppDataSource.initialize()
	.then(async () => {
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
