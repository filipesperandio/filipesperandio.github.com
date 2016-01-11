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

