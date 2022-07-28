import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Photo } from '../entity/Photo';

const router = Router();
const photoRepository = AppDataSource.getRepository(Photo);

// get all photos
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const photos = await photoRepository.find();
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
	try {
		const photo = await photoRepository.save(req.body);
		res.status(201).json({ success: true, data: photo });
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
		res.status(200).json({ success: true });
	} catch (error) {
		console.log(error);
	}
});

export default { path: '/photos', router };
