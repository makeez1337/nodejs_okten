import { Router } from 'express';

import { authController } from '../controllers';
import { authMiddleware, fileMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post(
    '/registration',
    fileMiddleware.checkUserAvatar,
    authMiddleware.isRegistrationValid,
    authController.registration,
);
router.post(
    '/login',
    authMiddleware.isLoginValid,
    userMiddleware.checkIsUserExists,
    authController.login,
);
router.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout,
);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

// REST PASSWORD ROUTES
router.post(
    '/resetPassword',
    authMiddleware.isEmailValid,
    authController.resetPassword,
);
router.post(
    '/resetPassword/set',
    authMiddleware.checkActionToken,
    authMiddleware.isPasswordValid,
    authController.setNewPassword,
);

export const authRouter = router;
