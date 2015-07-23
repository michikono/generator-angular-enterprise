$routeProvider.when('/<%= nameParamCase %>', {
  templateUrl: '<%= appSubFolder %><%= moduleNameParamCase %>/<%= nameParamCase %>.html',
  controller: '<%= namePascalCase %>Controller',
  controllerAs: 'vm',
  resolve: {}
});
