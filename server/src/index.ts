import { Photo } from './entity/Photo';
import { AppDataSource } from './data-source';
import * as http from 'http';
import app from './app';
import { images } from './fakeData';

AppDataSource.initialize()
	.then(async () => {
		const port = process.env.PORT || 3000;

		const server = new http.Server(app);
		server.listen(port);

		// images.slice(15, 20).forEach(async (item) => {
		// 	await AppDataSource.manager.save(
		// 		AppDataSource.manager.create(Photo, {
		// 			imageUrl: item.imageUrl,
		// 			label: item.label,
		// 		})
		// 	);
		// });

		server.on('listening', () => {
			console.log(`My unsplash API running in ${process.env.NODE_ENV} on port ${port} 🚀🚀🚀🚀`);
		});
	})
	.catch((error) => console.log(error));
