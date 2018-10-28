(function () {
  'use strict';

  angular
    .module('productos')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Productos',
      state: 'productos',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'productos', {
      title: 'List Productos',
      state: 'productos.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'productos', {
      title: 'Create Product',
      state: 'productos.create',
      roles: ['user']
    });
  }
}());
