import { Router, Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import { AppDataSource } from '../data-source';
import { Photo } from '../entity/Photo';

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
			return res.status(404).json({ success: false, message: 'Photo not found' });
		}
		res.status(200).json({ success: true, data: photo });
	} catch (error) {
		console.log(error);
	}
});

// create new photo
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	const { error } = photoSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ success: false, message: error.details[0].message });
	}
	try {
		const photo = await photoRepository.save(req.body); // save the photo

		// get all photos and return as the data
		const allPhotos = await photoRepository.find({
			order: {
				createdAt: 'DESC',
			},
		});
		res.status(201).json({ success: true, data: allPhotos });
	} catch (error) {
		console.log(error);
	}
});

// delete photo
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		let photoToRemove = await photoRepository.findOneBy({ id: req.params.id });
		if (!photoToRemove) {
			return res.status(404).json({ success: false, message: 'Photo not found' });
		}

		await photoRepository.remove(photoToRemove);
		// get all photos and return as the data
		const allPhotos = await photoRepository.find({
			order: {
				createdAt: 'DESC',
			},
		});
		res.status(200).json({ success: true, data: allPhotos });
	} catch (error) {
		console.log(error);
	}
});

export default { path: '/photos', router };
