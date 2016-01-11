describe('Facebook wrapper', function() {
  var FB = {},
    facebookWrapper,
    FBCallback,
    exposeCallback,
    count;
  var addOne = function() { count++; };

  beforeEach(function() {
    count = 0;
    exposeCallback = function(f) {
      FBCallback = f;
    };
    FB.login = exposeCallback;
    facebookWrapper = new FacebookWrapper(FB);
  });
  
  it('should have same login function', function() {
    expect(!!facebookWrapper.login).toBe(true);
  });

  it('should execute success for login', function() {
    var called = false;
    facebookWrapper.login().success(function() { called = true; });
    FBCallback({status:'connected'});
    expect(called).toBe(true);
  });

  it('should execute success for login and get args', function() {
    var called = {};
    facebookWrapper.login().success(function(response) { called = response; });
    var resp = {status:'connected'};
    FBCallback(resp);
    expect(called).toEqual(resp);
  });

  it('should execute error for login and get args', function() {
    var called = {};
    facebookWrapper.login().error(function(response) { called = response; });
    var resp = {status:'unknown'};
    FBCallback(resp);
    expect(called).toEqual(resp);
  });

  it('should not execute success calls for login more than once', function() {
    var called = 0;
    facebookWrapper.login().success(addOne).success(addOne).success(addOne);
    FBCallback({status:'connected'});
    expect(count).toBe(3);
    FBCallback({status:'connected'});
    expect(count).toBe(3);
  });

  it('should execute nested success calls for login', function() {
    var called = 0;
    facebookWrapper.login().success(addOne).success(addOne).success(addOne);
    FBCallback({status:'connected'});
    expect(count).toBe(3);
  });

  it('should execute error for login', function() {
    var called = false;
    facebookWrapper.login().error(function() { called = true; });
    FBCallback({status:'unknown'});
    expect(called).toBe(true);
  });

  it('should execute error for login and not success calls', function() {
    var succCalled = false;
    var errCalled = false;
    facebookWrapper.login().success(function(){ succCalled = true}).error(function() { errCalled = true; });
    FBCallback({status:'unknown'});
    expect(errCalled).toBe(true);
    expect(succCalled).toBe(false);
  });

  it('should execute nested error calls for login', function() {
    var called = 0;
    facebookWrapper.login().error(addOne).error(addOne).error(addOne);
    FBCallback({status:'unknown'});
    expect(count).toBe(3);
  });

  it('should execute nested success calls for getLoginStatus', function() {
    FB.getLoginStatus = exposeCallback;
    var called = 0;
    facebookWrapper.getLoginStatus().success(addOne).success(addOne).success(addOne);
    FBCallback({status:'connected'});
    expect(count).toBe(3);
  });

  it('should execute success calls for logout', function() {
    FB.logout = exposeCallback;
    var called = 0;
    facebookWrapper.logout().success(addOne).success(addOne).success(addOne);
    FBCallback();
    expect(count).toBe(3);
  });

  it('should execute success calls for api', function() {
    FB.api = function(str, f) {
      FBCallback = f;
    };
    var called = 0;
    facebookWrapper.api("/me").success(addOne).success(addOne).success(addOne);
    FBCallback({});
    expect(count).toBe(3);
  });

  it('should execute error calls for api', function() {
    FB.api = function(str, f) {
      FBCallback = f;
    };
    var called = 0;
    facebookWrapper.api("/me").error(addOne).success(addOne).success(addOne);
    FBCallback({error:{}});
    expect(count).toBe(1);
  });

});
