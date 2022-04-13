import { Router } from 'express';

import { studentController } from '../controllers';

const router = Router();

router.post('/', studentController.createStudent);
router.get('/', studentController.getStudents);
router.patch('/:teacher_id', studentController.selectTeacher);

export const studentRouter = router;
