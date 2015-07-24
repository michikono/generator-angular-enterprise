var state = {
  url: '/<%= nameParamCase %>',
  templateUrl: '<%= appSubFolder %><%= nameParamCase %>/<%= nameParamCase %>.html',
  controller: '<%= namePascalCase %>Controller',
  controllerAs: 'vm',
  resolve: {}
};
$stateProvider.state('<%= name %>', state);
