(function () {
  'use strict';

  // Productos controller
  angular
    .module('productos')
    .controller('ProductosController', ProductosController);

  ProductosController.$inject = ['$scope', '$state', '$window', 'Authentication', 'productoResolve'];

  function ProductosController ($scope, $state, $window, Authentication, producto) {
    var vm = this;

    vm.authentication = Authentication;
    vm.producto = producto;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    
    // Remove existing Producto
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.producto.$remove($state.go('productos.list'));
      }
    }
   /* //Open a modal window to Update a single record
    function modalUpdate(size, selectedItem){
      var modalInstance = $modal.open({
      templateUrl: 'modules/productos/client/views/edit-producto.client.view.html',
      controller: function($scope,$modalInstance,producto){
        $scope.producto = producto;
      },
      size: size,
      resolve: {
        producto:function(){
          return $scope.items;
        }
      }
    });
  

    modalInstance.result.then(function(selectedItem){
      $scope.selected = selectedItem;
    }, function(){
      $log.info('Modal dismissed at: ' + new Date());
    });
  }
*/
    // Save Producto
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.producto._id) {
        vm.producto.$update(successCallback, errorCallback);
      } else {
        vm.producto.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('productos.view', {
          productoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
