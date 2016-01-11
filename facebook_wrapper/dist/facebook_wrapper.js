var FacebookWrapper = function(FB) {
  var simpleWrapper = function(wrapped){
    var queue = new Queue();
      wrapped(function(response) {
        console.log(response);
        if(response.status === 'connected') {
          queue.resolve(response);
        } else {
          queue.reject(response);
        }
      });
    return queue.promise;
  };           

  var parametrizedWrapper = function(wrapped) {
  };

  var login = function(){
    return simpleWrapper(FB.login);
  };

  var getLoginStatus = function(){
    return simpleWrapper(FB.getLoginStatus);
  };

  var api = function(method) {
    var queue = new Queue();
    FB.api(method, function(response) {
      if(!response.error) {
        queue.resolve(response);
      } else {
        queue.reject(response);
      }
    });
    return queue.promise;
  };

  var logout = function() {
    var queue = new Queue();
    FB.logout(function(response) {
      queue.resolve(response);
    });
    return queue.promise;
  };

  return {
    login: login,
    logout: logout,
    getLoginStatus: getLoginStatus,
    api: api
  };
}


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


