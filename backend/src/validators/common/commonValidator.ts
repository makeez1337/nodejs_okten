import { Joi } from 'celebrate';
import { regexp } from '../../constants';

export const commonValidator = {
    emailValidator: Joi.string().required().regex(regexp.EMAIL_REGEXP),
    passwordValidator: Joi.string().alphanum().required().min(8),
};
