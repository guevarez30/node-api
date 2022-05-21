class Response {
  constructor(code, message = {}) {
    this.code = code;
    this.message = message;
  }
  static isResponse(testVal) {
    return testVal instanceof Response;
  }

  static ok(s) {
    return new Response(200, s);
  }

  static error(s) {
    return new Response(500, s);
  }

  static unauthorized(s) {
    return new Response(401, s);
  }

  static invalid(s) {
    return new Response(400, s);
  }

  static notFound(s) {
    return new Response(404, s);
  }
}

export default Response;
