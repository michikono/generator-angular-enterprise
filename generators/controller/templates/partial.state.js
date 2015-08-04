var state = {
  url: '/<%= nameParamCase %>',
  templateUrl: '<%= appSubFolder %><%= moduleNameParamCase %>/<%= nameParamCase %>.html',
  controller: '<%= namePascalCase %>Controller',
  controllerAs: 'vm',
  resolve: {}
};
$stateProvider.state('<%= name %>', state);
