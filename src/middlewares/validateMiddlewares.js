import Joi from '@hapi/joi';

const validationObj = (messages) => Joi.string().trim().required().messages(messages);
const joiMessageFunction = (error, req, res, next) => {
  if (error) {
    const { details } = error;
    const message = {};
    details.forEach((keys) => {
      message[keys.context.key] = keys.message.replace(/"/g, '');
    });
    for (const key in message) {
      const readyMessage = JSON.stringify(message[key]);
      const readydata = JSON.parse(readyMessage);
      return res.status(400).json({ status: 400, data: readydata });
    }
  }
  return next();
};

const validateRequest = (req, res, next) => {
  const requestSchema = Joi.object({
    taskType: validationObj({
      'string.base': 'Real task type required',
      'string.required': 'Real task type required eg: Choice Task',
      'string.empty': 'Please task type required',
    }).min(2).max(50),
    title: validationObj({
      'string.base': 'Real title required',
      'string.required': 'Real title required eg: Home Work',
      'string.empty': 'Please title required',
    }).min(2).max(15),
    description: validationObj({
      'string.base': 'Real description required',
      'string.required': 'Real description required eg: Hi here I do have some ...',
      'string.empty': 'Please description required',
    }).min(2).max(500),
    expiration: validationObj({
      'string.base': 'Real expiration required',
      'string.required': 'Real expiration required eg: 10-10-2019',
      'string.empty': 'Please expiration required',
    }).min(2).max(50),
    requirement: validationObj({
      'string.base': 'Real requirement required',
      'string.required': 'Real requirement required eg: Yes',
      'string.empty': 'Please requirement required',
    }).min(2).max(50),
    response: validationObj({
      'string.base': 'Real response required',
      'string.required': 'Real response required',
      'string.empty': 'Please response required',
    }).min(2).max(50),
    workerNumber: validationObj({
      'string.base': 'Real worker number required',
      'string.required': 'Real worker number required',
      'string.empty': 'Please worker number required',
    }).min(1).max(50),
    uploadedImage: Joi.string().min(3).max(500),
  });
  
  const { error } = requestSchema.validate(req.body, {
    abortEarly: false
  });
  return joiMessageFunction(error, req, res, next);
};

const validateFilter = (req, res, next) => {
  const filterSchema = Joi.object({
    filter: validationObj({
      'string.base': 'Real expiration required',
      'string.required': 'Real expiration required eg: 10-10-2019',
      'string.empty': 'Please expiration required',
    }).min(2).max(50),
  });
  
  const { error } = filterSchema.validate(req.body, {
    abortEarly: false
  });
  return joiMessageFunction(error, req, res, next);
};

export { validateRequest, validateFilter };
