const BaseSerializer = require('./BaseSerializer');

class ErrorSerializer extends BaseSerializer {
  constructor(status, err) {
    super(status, null, err);
  }
}

module.exports = ErrorSerializer;
