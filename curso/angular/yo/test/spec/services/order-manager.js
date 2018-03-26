'use strict';

describe('Service: orderManager', function () {

  // load the service's module
  beforeEach(module('udaciMealsApp'));

  // instantiate service
  var orderManager;
  beforeEach(inject(function (_orderManager_) {
    orderManager = _orderManager_;
  }));

  it('should do something', function () {
    expect(!!orderManager).toBe(true);
  });

});
