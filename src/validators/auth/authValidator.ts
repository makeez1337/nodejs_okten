import { Joi, Segments } from 'celebrate';

import { commonValidator } from '../common';
import { regexp } from '../../constants';

export const authValidator = {
    login: {
        [Segments.BODY]: Joi.object().keys({
            email: commonValidator.emailValidator,
            password: commonValidator.passwordValidator,
        }),
    },
    registration: {
        [Segments.BODY]: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            age: Joi.number().greater(0).less(100),
            password: commonValidator.passwordValidator,
            phone: Joi.string().required().regex(regexp.PHONE_REGEXP),
            email: commonValidator.emailValidator,
        }),
    },
};
