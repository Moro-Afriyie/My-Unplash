import { Router, Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import { Like } from 'typeorm';
import { HttpStatusCode } from '../@types';
import { AppDataSource } from '../data-source';
import { Photo } from '../entity/Photo';
import { APIError } from '../error';
import { asyncMiddleware } from '../middlewares/async';

const router = Router();
const photoRepository = AppDataSource.getRepository(Photo);

const photoSchema = Joi.object({
	label: Joi.string().required(),
	imageUrl: Joi.string().required(),
});

// get all photos
router.get(
	'/',
	asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
		const photos = await photoRepository.find({
			order: {
				createdAt: 'DESC',
			},
		});
		res.status(200).json({ success: true, data: photos });
	})
);

// get photo by  photo id
router.get(
	'/:id',
	asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
		const photo = await photoRepository.findOneBy({ id: req.params.id });
		if (!photo) {
			throw new APIError('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'Photo not found');
		}
		res.status(200).json({ success: true, data: photo });
	})
);

// create new photo
router.post(
	'/',
	asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
		const { error } = photoSchema.validate(req.body);

		if (error) {
			throw new APIError('BAD REQUEST', HttpStatusCode.BAD_REQUEST, true, error.details[0].message);
		}
		await photoRepository.save(req.body);

		const allPhotos = await photoRepository.find({
			order: {
				createdAt: 'DESC',
			},
		});
		res.status(201).json({ success: true, data: allPhotos });
	})
);

// delete photo
router.delete(
	'/:id',
	asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
		let photoToRemove = await photoRepository.findOneBy({ id: req.params.id });
		if (!photoToRemove) {
			throw new APIError('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'Photo not found');
		}

		await photoRepository.remove(photoToRemove);

		const allPhotos = await photoRepository.find({
			order: {
				createdAt: 'DESC',
			},
		});
		res.status(200).json({ success: true, data: allPhotos });
	})
);

// search for photos
router.get(
	'/search/:searchTerm',
	asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
		const searchTerm = req.params.searchTerm;
		const photos = await photoRepository.find({
			where: { label: Like(`%${searchTerm}%`) },
			order: {
				createdAt: 'DESC',
			},
		});
		res.status(200).json({ success: true, data: photos });
	})
);

export default { path: '/photos', router };
