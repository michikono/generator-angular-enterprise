var state = {
  url: '/<%= nameParamCase %>',
  templateUrl: '<%= appSubFolder %><%= nameParamCase %>/<%= nameParamCase %>.html',
  controller: '<%= controllerName %>',
  controllerAs: 'vm',
  resolve: {}
};
$stateProvider.state('<%= name %>', state);
