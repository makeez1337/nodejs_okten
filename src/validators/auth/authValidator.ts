import { Joi, Segments } from 'celebrate';
import { commonValidator } from '../common';

export const authValidator = {
    login: {
        [Segments.BODY]: Joi.object().keys({
            email: commonValidator.emailValidator,
            password: Joi.string().required().min(4),
        }),
    },
};
