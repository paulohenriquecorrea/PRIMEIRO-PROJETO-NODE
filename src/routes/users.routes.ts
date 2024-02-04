import {Router} from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
	try {
		const {name, email, password} = request.body;
		const createUser = new CreateUserService();
		const user = await createUser.execute({
			name,
			email,
			password,
		});

		delete user.password;

		return response.json(user);
	} catch (error) {
		return response.status(400).json({error: error.message});
	}
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
	const user_id = request.user.id;
	const avatarFilename = request.file.filename;
	try {
		const updateUserAvatarService = new UpdateUserAvatarService();

		const user = await updateUserAvatarService.execute({
			user_id, avatarFilename,
		});

		delete user.password;

		return response.json(user);
	} catch (error) {
		return response.status(400).json({error: error.message});
	}
});

export default usersRouter;
