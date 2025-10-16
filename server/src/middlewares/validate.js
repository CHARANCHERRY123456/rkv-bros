import { ValidationError } from './errorHandler.js';

export const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            });
            next();
        } catch (error) {
            if (error.errors) {
                const messages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
                next(new ValidationError(messages));
            } else {
                next(error);
            }
        }
    };
};
