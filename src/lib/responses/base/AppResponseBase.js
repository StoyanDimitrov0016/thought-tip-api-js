const DEFAULT_TYPE = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/";
const DEFAULT_INSTANCE = "/";

class AppResponseBase {
  constructor(
    status,
    title,
    detail,
    instance = DEFAULT_INSTANCE,
    success,
    timestamp = new Date().toISOString()
  ) {
    this.status = status;
    this.success = success;
    this.timestamp = timestamp;
    this.type = `${DEFAULT_TYPE}${status}`;
    this.title = title;
    this.detail = detail;
    this.instance = instance;
  }
}

export default AppResponseBase;
