(function () {
  'use strict';

  // Carritos controller
  angular
    .module('carritos')
    .controller('CarritosController', CarritosController);

  CarritosController.$inject = ['$scope', '$state', '$window', 'Authentication', 'carritoResolve'];

  function CarritosController ($scope, $state, $window, Authentication, carrito) {
    var vm = this;

    vm.authentication = Authentication;
    vm.carrito = carrito;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Carrito
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.carrito.$remove($state.go('carritos.list'));
      }
    }

    // Save Carrito
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.carritoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.carrito._id) {
        vm.carrito.$update(successCallback, errorCallback);
      } else {
        vm.carrito.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('carritos.view', {
          carritoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
