'use strict';

describe('Carritos E2E Tests:', function () {
  describe('Test Carritos page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/carritos');
      expect(element.all(by.repeater('carrito in carritos')).count()).toEqual(0);
    });
  });
});
