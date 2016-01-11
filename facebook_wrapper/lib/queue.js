var Queue = function() {
  var successCallback = [];
  var errorCallback = [];

  var execute = function(q, arg) {
    _.each(q, function(f) {
      f(arg);
    });
    q.length = 0;
  };

  var resolve = function(arg) {
    execute(successCallback, arg);
  };

  var reject = function(arg) {
    execute(errorCallback, arg);
  };

  var success = function(fn) {
    successCallback.push(fn);
    return promise;
  };

  var error = function(fn) {
    errorCallback.push(fn);
    return promise;
  };

  var promise = {
    success: success,
    error: error
  };

  return {
    resolve: resolve,
    reject: reject,
    promise: promise
  };
};


