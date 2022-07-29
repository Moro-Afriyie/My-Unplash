import { Router, Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import { HttpStatusCode } from '../@types';
import { AppDataSource } from '../data-source';
import { Photo } from '../entity/Photo';
import { APIError } from '../error';

const router = Router();
const photoRepository = AppDataSource.getRepository(Photo);

const photoSchema = Joi.object({
	label: Joi.string().required(),
	imageUrl: Joi.string().required(),
});

// get all photos
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const photos = await photoRepository.find({
			order: {
				createdAt: 'DESC',
			},
		});
		res.status(200).json({ success: true, data: photos });
	} catch (error) {
		console.log(error);
	}
});

// get photo by  photo id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const photo = await photoRepository.findOneBy({ id: req.params.id });
		if (!photo) {
			throw new APIError('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'Photo not found');
		}
		res.status(200).json({ success: true, data: photo });
	} catch (error) {
		next(error);
	}
});

// create new photo
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	const { error } = photoSchema.validate(req.body);

	try {
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
	} catch (error) {
		next(error);
	}
});

// delete photo
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
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
	} catch (error) {
		next(error);
	}
});

export default { path: '/photos', router };
