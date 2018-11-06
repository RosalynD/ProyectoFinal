(function () {
  'use strict';

  angular
    .module('carritos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('carrito', {
        url: '/carrito',
        templateUrl: '/modules/carritos/client/views/view-carrito.client.view.html',
        controller: 'ProductosListController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('carrito.list', {
        url: '',
        templateUrl: 'modules/productos/client/views/view-carrito.client.view.html',
        controller: 'ProductosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Productos List'
        }
      })
      .state('checkout', {
        url: '/checkout',
        templateUrl: '/modules/carritos/client/views/view-checkout.client.view.html',
        controller: 'CarritoController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
}());