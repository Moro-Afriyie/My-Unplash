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
	})
	.catch((error) => console.log(error));
