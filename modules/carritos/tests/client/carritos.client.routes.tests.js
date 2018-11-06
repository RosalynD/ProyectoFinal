(function () {
  'use strict';

  describe('Carritos Route Tests', function () {
    // Initialize global variables
    var $scope,
      CarritosService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CarritosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CarritosService = _CarritosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('carritos');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/carritos');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          CarritosController,
          mockCarrito;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('carritos.view');
          $templateCache.put('modules/carritos/client/views/view-carrito.client.view.html', '');

          // create mock Carrito
          mockCarrito = new CarritosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Carrito Name'
          });

          // Initialize Controller
          CarritosController = $controller('CarritosController as vm', {
            $scope: $scope,
            carritoResolve: mockCarrito
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:carritoId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.carritoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            carritoId: 1
          })).toEqual('/carritos/1');
        }));

        it('should attach an Carrito to the controller scope', function () {
          expect($scope.vm.carrito._id).toBe(mockCarrito._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/carritos/client/views/view-carrito.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CarritosController,
          mockCarrito;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('carritos.create');
          $templateCache.put('modules/carritos/client/views/form-carrito.client.view.html', '');

          // create mock Carrito
          mockCarrito = new CarritosService();

          // Initialize Controller
          CarritosController = $controller('CarritosController as vm', {
            $scope: $scope,
            carritoResolve: mockCarrito
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.carritoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/carritos/create');
        }));

        it('should attach an Carrito to the controller scope', function () {
          expect($scope.vm.carrito._id).toBe(mockCarrito._id);
          expect($scope.vm.carrito._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/carritos/client/views/form-carrito.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CarritosController,
          mockCarrito;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('carritos.edit');
          $templateCache.put('modules/carritos/client/views/form-carrito.client.view.html', '');

          // create mock Carrito
          mockCarrito = new CarritosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Carrito Name'
          });

          // Initialize Controller
          CarritosController = $controller('CarritosController as vm', {
            $scope: $scope,
            carritoResolve: mockCarrito
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:carritoId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.carritoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            carritoId: 1
          })).toEqual('/carritos/1/edit');
        }));

        it('should attach an Carrito to the controller scope', function () {
          expect($scope.vm.carrito._id).toBe(mockCarrito._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/carritos/client/views/form-carrito.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
