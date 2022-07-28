import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Photo } from '../entity/Photo';

const router = Router();
const photoRepository = AppDataSource.getRepository(Photo);

// get all photos
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const photos = await photoRepository.find();
		res.status(200).json({ data: photos });
	} catch (error) {
		console.log(error);
	}
});

// get photo by  photo id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const photo = await photoRepository.findOneBy({ id: req.params.id });
		res.status(200).json({ data: photo });
	} catch (error) {
		console.log(error);
	}
});

// create new photo
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const photo = await photoRepository.save(req.body);
		res.status(201).json({ data: photo });
	} catch (error) {
		console.log(error);
	}
});

// delete photo
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		let photoToRemove = await photoRepository.findOneBy({ id: req.params.id });
		await photoRepository.remove(photoToRemove);
		res.status(204);
	} catch (error) {
		console.log(error);
	}
});

export default { path: '/photos', router };
