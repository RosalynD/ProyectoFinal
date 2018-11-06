// Carritos service used to communicate Carritos REST endpoints
(function () {
  'use strict';

  angular
    .module('carritos')
    .factory('CarritosService', CarritosService);

  CarritosService.$inject = ['$resource'];

  function CarritosService($resource) {
    return $resource('api/carritos/:carritoId', {
      carritoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
