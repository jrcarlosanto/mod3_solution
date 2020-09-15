(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsD)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com/menu_items.json');

function FoundItemsD() {
  var ddo = {
    templateUrl: 'found-items.html',
    restrict: "E",
    scope: {
      foundItems: '<',
      onRemove: '&',
      textImput: '<'
    }
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.searchTerm = '';
  menu.found = [];

  menu.getMenuItems = function() {
    if (!(menu.searchTerm)) {
      menu.found = null;
      return;
    }
    menu.found = [];
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function (response) {
      menu.found = response;
    })
    .catch(function (error) {
      console.log("Something went wrong.");
    });
  };
 
  menu.removeItem = function (itemIndex){
    menu.found.splice(itemIndex, 1);
  };
} 


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: ApiBasePath
    }).then(function (result) {
      if (searchTerm == false)
        return [];

      var foundItems = [];
      var list = result.data.menu_items;

      for (var i = 0; i < list.length; i++) {
        var description = list[i].description;
        if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
          foundItems.push(list[i]);
        }
      }
      return foundItems;
    });
  };
}

})();
