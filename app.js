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
      onRemove: '&'
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


  //  var promise = MenuSearchService.getMatchedMenuItems();

 // promise.then(function (response) {
  //  menu.found = response.data
   // console.log(response.data);
    //menu.found = MenuSearchService.searchText(menu.text,response.data);
 // })
  //.catch(function (error) {
   // console.log("Something went terribly wrong.");
  //});

  //menu.getMatchedMenuItems = function (searchTerm) {
   // var promise = MenuSearchService.getMatchedMenuItems (searchTerm);

   // promise.then(function (response) {
  //    menu.fountItens = response.data;
   //   console.log(response.data);
   // })
    //.catch(function (error) {
     // console.log(error);
   // })
  //};

  //menu.found = menu.getMatchedMenuItems;

  menu.removeItem = function (itemIndex){
    menu.found.splice(itemIndex, 1);
    //MenuSearchService.removeItem(itemIndex);
  };
} 


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
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


  //service.searchText = function(text,data){
   // for (var i=0; i<response.data.length(); i++){
    //  if(text == data[i]){
      //  found.push(data[i]);
     // }
   // }
   // return found;
    //console.log(found);
  //};

//  service.getMatchedMenuItems = function (searchTerm) {
  //  var response = $http({
//      method: "GET",
//      url: (ApiBasePath),
 //     params: {
  //      found: searchTerm
   //   }
   // });

//    return response;
  //};

 // service.removeItem = function (itemIndex) {
   // found.splice(itemIndex, 1);
  //};
}

})();
