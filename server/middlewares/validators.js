const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('الاسم مطلوب').isLength({ min: 3 }).withMessage('الاسم يجب أن يكون على الأقل 3 حروف'),
        body('email').notEmpty().withMessage('البريد الإلكتروني مطلوب').isEmail().withMessage('البريد الإلكتروني غير صالح'),
        body('password').notEmpty().withMessage('كلمة المرور مطلوبة').isLength({ min: 5 }).withMessage('كلمة المرور يجب أن تكون على الأقل 5 حروف')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    };

    const extractedErrors = [];
    errors.array().forEach(err => extractedErrors.push({
        [err.path]: err.msg
    }));

    return res.status(400).json({ errors: extractedErrors });
};

module.exports = {
    userValidationRules,
    validate
};