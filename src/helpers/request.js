const Request = function (url) {
  this.url = url;
};

Request.prototype.get = function (onComplete, onError) {
  return fetch(this.url)
  .then((response) => response.json());
};

module.exports = Request;
