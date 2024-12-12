class BaseResponse {
  constructor(status, success, format, title, detail, instance) {
    this.status = status;
    this.success = success;
    this.timestamp = new Date().toISOString();
    this.type = `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${status}`;
    this.format = format;
    this.title = title;
    this.detail = detail;
    this.instance = instance;
  }
}

export class ErrorResponse extends BaseResponse {
  constructor(status, title, detail, instance, callstack) {
    super(status, false, "error", title, detail, instance);
    this.callstack = process.env.NODE_ENV === "development" ? callstack : null;
  }
}

export class BaseSuccessResponse extends BaseResponse {
  constructor(status, format, title, detail, instance, data, metadata) {
    super(status, true, format, title, detail, instance);
    this.data = data;
    this.metadata = metadata;
  }
}

export class OkResponse extends BaseSuccessResponse {
  constructor(format, detail, instance, data, metadata) {
    super(200, format, "Successful resource/s retrieval", detail, instance, data, metadata);
  }
}

export class CreateResponse extends BaseSuccessResponse {
  constructor(format, detail, instance, data, metadata) {
    super(201, format, "Successful resource/s creation", detail, instance, data, metadata);
  }
}
