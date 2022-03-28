import Joi from 'joi';

import { commonValidator } from '../common';
import { regexp } from '../../constants';

export const authValidator = {
    login: Joi.object().keys({
        email: commonValidator.emailValidator,
        password: commonValidator.passwordValidator,
    }),
    registration: Joi.object().keys({
        firstName: Joi.string().required().trim(),
        lastName: Joi.string().required().trim(),
        age: Joi.number().greater(0).less(100),
        password: commonValidator.passwordValidator,
        phone: Joi.string().required().regex(regexp.PHONE_REGEXP).trim(),
        email: commonValidator.emailValidator,
    }),

};
