(function () {
  'use strict';

  angular
    .module('carritos')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Carrito',
      state: 'carrito',
      roles: ['user']
    });
  }
}());
