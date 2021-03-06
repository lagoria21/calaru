miGire.factory('IngresoStockResource', function($resource) {
	return $resource('stock');
});


miGire.config(function($routeProvider) {
	$routeProvider.when('/ingresoStock/lista', {
		templateUrl : 'ingresoStock/ingresoStock.html',
		controller : 'IngresoStockListaCtrl as ctrl'
	}).when('/ingresoStock/edicion/:id', {
		templateUrl : 'ingresoStock/ingresoStockForm.html',
		controller : 'IngresoStockFormCtrl as ctrl',
		resolve : {
			ingreso : function(IngresoStockResource, $route) {
				var id = $route.current.params['id'];
				return IngresoStockResource.get({id : id}).$promise;
			},
		}
	}).when('/ingresoStock/alta', {
		templateUrl : 'ingresoStock/ingresoStockForm.html',
		controller : 'IngresoStockFormCtrl as ctrl',
		resolve : {
			ingreso : function(IngresoStockResource) {	return new IngresoStockResource(); },			
		}
	});
});


miGire.factory('IngresoStockResource', function($resource) {
	return $resource('stock/:id', {id: '@id', completo: true}, {
		'update' : {method : 'PUT'},
		'deleteList' : {method : 'DELETE'}
	});
});


miGire.controller('IngresoStockListaCtrl', function(IngresoStockResource, msgDialog, $log, $http, $q){
	var self = this;
	self.ingreso = IngresoStockResource.query();
	
	
	self.sector = ['NR','NP','R'];	 
	self.ubicacion = ['A','B','C'];
	
	self.filtro = {};
	
	self.limpiarFiltro = function() {
		self.limpiarSeleccion();
		self.filtro = {};
		self.reloadPage = true;
	}
	
	self.cambioFiltro = function() {
		self.reloadPage = true;
	}	

	self.limpiarSeleccion = function() {
		self.seleccionados = new Immutable.Set();
		self.invertirSeleccion = false;
	}
	
	self.limpiarSeleccion();
	
	self.toggleSeleccion = function(id) {
		self.seleccionados = self.seleccionados.has(id) ? self.seleccionados.remove(id) : self.seleccionados.add(id);  
	}
	
	
	
	self.cantSeleccionados = function() {
		return self.invertirSeleccion ? self.totalItems - self.seleccionados.size : self.seleccionados.size;
	}

	
	self.removeList = function() {
		$http.post('stock/eliminarLista', {filtro: self.filtro, ids: self.seleccionados.toArray(), invertir: self.invertirSeleccion}).then(
				function(response) {
					self.limpiarSeleccion();
					self.reloadPage = true;
				}, function(errorResp){
					msgDialog.showMessage({header: "Error", message: errorResp.statusText});

				});
	}
	
	
	self.remove = function(ingreso) {
		msgDialog.showMessage({
			header: "Producto", 
			message: "¿Esta seguro que desea eliminar el Producto?", 
			buttons:[
			{label:"Si", action: function() {
				IngresoStockResource.remove({id: ingreso.id}, function() {
					self.reloadPage = true;
				}, function(error) {
					msgDialog.showMessage({header: "Error", message: error.statusText});
				});
			}},
			{label:"No", action: function() {}}]
		});
	}
	
	
	self.agregar = function(ingreso) {
		
	var REST_SERVICE_URI = 'http://localhost:9090/front/stock/agregar/';		
	var deferred = $q.defer();
		
			$http.put(REST_SERVICE_URI+ingreso.id, ingreso)
            		.then(
            				function (response) {
            					deferred.resolve(response.data);
            					self.reloadPage = true;
            				},
            				function(errResponse){
            					console.error('Error no se pudo agregar el producto');
            					deferred.reject(errResponse);
            				}
            		)
		
	};
});


miGire.controller('IngresoStockFormCtrl', function($scope, ingreso, msgDialog, $location, $filter) {
	
	var self = this;
	self.ingreso = ingreso;	
	self.ingreso.fechaIngreso = $filter('date')(Date.now(), 'dd/MM/yyyy');
	
	self.sector = ['NR','NP','R'];	 
	self.ubicacion = ['A','B','C'];
	
	
	self.aceptar = function() {
		if(self.ingreso.id) {
			ingreso.fechaIngreso = new Date(self.ingreso.fechaIngreso);
			self.ingreso.$update(function(response) {
				$location.path('ingresoStock/lista');
			}, function(error) {
				if(error.data && error.data.valor)
					msgDialog.showMessage({header: "Modificaci&oacuten Ingreso de stock", message: error.data.valor});
				else
					msgDialog.showMessage({header: "Ha ocurrido un error", message: error.statusText});
			})
		} else {			
			ingreso.fechaIngreso = new Date(self.ingreso.fechaIngreso);
			self.ingreso.$save(function(response) {
				$location.path('ingresoStock/lista');
			}, function(error) {
				if(error.data && error.data.valor)
					msgDialog.showMessage({header: "Alta de ingreso de stock", message: error.data.valor});
				else 
				msgDialog.showMessage({header: "Ha ocurrido un error", message: error.statusText});
			});
		}
	};
	
});

