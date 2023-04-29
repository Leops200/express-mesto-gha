const  NOT_FOUND_ERROR_CODE = 404;

module.exports.notFound = (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({
    message: 'Указан несуществующий URL',
  });
};