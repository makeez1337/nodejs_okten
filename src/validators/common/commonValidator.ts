import Joi from 'joi';

import { regexp } from '../../constants';

export const commonValidator = {
    emailValidator: Joi.string()
        .required()
        .trim()
        .regex(regexp.EMAIL_REGEXP)
        .message('Email not valid'),
    passwordValidator: Joi.string()
        .alphanum()
        .required()
        .min(5)
        .trim()
        .message('Password not valid'),
};
