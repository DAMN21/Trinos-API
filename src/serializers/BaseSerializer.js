class BaseSerializer {
  constructor(status, data, err) {
    this.status = status;
    this.data = data;
    this.err = err;
  }

  toJSON() {
    return {
      status: this.status,
      data: this.data,
      err: this.err,
    };
  }
}

module.exports = BaseSerializer;
