class Status {
    constructor(statusCode, message = "") {
      this.code = statusCode;
      this.message = message;
    }
    static isStatus(testVal) {
      return testVal instanceof Status;
    }
  
    static ok(s) {
      return new Status(200, s);
    }
  
    static error(s) {
      return new Status(500, s);
    }
  
    static unauthorized(s) {
      return new Status(401, s);
    }
  
    static invalid(s) {
      return new Status(400, s);
    }
    static notFound(s) {
      return new Status(404, s);
    }
}

module.exports = Status;