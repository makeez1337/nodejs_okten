import { Router } from 'express';

import { postController } from '../controllers';

const router = Router();

router.get('/:userId', postController.getPostById);
router.patch('/:postId', postController.updatePostById);

export const postRouter = router;
