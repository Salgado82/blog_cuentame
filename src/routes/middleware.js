const middleware = (schema) => (request, result, next) => {
  const { error } = schema.validate(request.body);
  const valid = error == null;

  if (!valid) {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');

    console.log('Error schema', message);
    result.status(400).json({
      error: true,
      message,
    });
  }

  next();
};

module.exports = middleware;
