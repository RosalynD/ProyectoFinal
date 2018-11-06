(function () {
  'use strict';

  describe('Carritos Controller Tests', function () {
    // Initialize global variables
    var CarritosController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      CarritosService,
      mockCarrito;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _CarritosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      CarritosService = _CarritosService_;

      // create mock Carrito
      mockCarrito = new CarritosService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Carrito Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Carritos controller.
      CarritosController = $controller('CarritosController as vm', {
        $scope: $scope,
        carritoResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleCarritoPostData;

      beforeEach(function () {
        // Create a sample Carrito object
        sampleCarritoPostData = new CarritosService({
          name: 'Carrito Name'
        });

        $scope.vm.carrito = sampleCarritoPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (CarritosService) {
        // Set POST response
        $httpBackend.expectPOST('api/carritos', sampleCarritoPostData).respond(mockCarrito);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Carrito was created
        expect($state.go).toHaveBeenCalledWith('carritos.view', {
          carritoId: mockCarrito._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/carritos', sampleCarritoPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Carrito in $scope
        $scope.vm.carrito = mockCarrito;
      });

      it('should update a valid Carrito', inject(function (CarritosService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/carritos\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('carritos.view', {
          carritoId: mockCarrito._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (CarritosService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/carritos\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Carritos
        $scope.vm.carrito = mockCarrito;
      });

      it('should delete the Carrito and redirect to Carritos', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/carritos\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('carritos.list');
      });

      it('should should not delete the Carrito and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
