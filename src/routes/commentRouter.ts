import { Router } from 'express';

import { commentController } from '../controllers/commentController';

const router = Router();

router.get('/:userId', commentController.getCommentByUserId);
router.patch('/action', commentController.updateByAction);

export const commentRouter = router;
