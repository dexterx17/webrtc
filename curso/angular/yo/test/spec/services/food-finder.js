'use strict';

describe('Service: foodFinder', function () {

  // load the service's module
  beforeEach(module('udaciMealsApp'));

  // instantiate service
  var foodFinder;
  beforeEach(inject(function (_foodFinder_) {
    foodFinder = _foodFinder_;
  }));

  it('should do something', function () {
    expect(!!foodFinder).toBe(true);
  });

});
