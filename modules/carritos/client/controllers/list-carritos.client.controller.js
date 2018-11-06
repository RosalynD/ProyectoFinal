(function () {
  'use strict';

  angular
    .module('carritos')
    .controller('CarritosListController', CarritosListController);

  CarritosListController.$inject = ['CarritosService'];

  function CarritosListController(CarritosService) {
    var vm = this;

    vm.carritos = CarritosService.query();
  }
}());
