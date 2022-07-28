import { AppDataSource } from '../data-source';
import { Photo } from '../entity/Photo';
import { NextFunction, Request, Response } from 'express';

export class PhotoController {
	private photoRepository = AppDataSource.getRepository(Photo);

	// get all photos
	async all(request: Request, response: Response, next: NextFunction) {
		const photos = await this.photoRepository.find();
		return response.status(200).json({ data: photos });
	}

	// get all photos by photo id
	async one(request: Request, response: Response, next: NextFunction) {
		return this.photoRepository.findOneBy({ id: request.params.id });
	}

	// create new photo
	async save(request: Request, response: Response, next: NextFunction) {
		return this.photoRepository.save(request.body);
	}

	// remove photo
	async remove(request: Request, response: Response, next: NextFunction) {
		let userToRemove = await this.photoRepository.findOneBy({ id: request.params.id });
		await this.photoRepository.remove(userToRemove);
	}
}
