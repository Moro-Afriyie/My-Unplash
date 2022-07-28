import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Photo } from '../entity/Photo';

const router = Router();

router.get('/', async (req, res) => {
	const photoRepository = AppDataSource.getRepository(Photo);
	try {
		const photos = await photoRepository.find();
		res.status(200).json({ data: photos });
	} catch (error) {
		console.log(error);
	}
});

export default { path: '/photos', router };
