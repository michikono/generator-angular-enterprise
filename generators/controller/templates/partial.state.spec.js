it('should map state <%= name %> to url /<%= nameParamCase %> ', function () {
  expect($state.href('<%= name %>')).toEqual('/<%= nameParamCase %>');
});
it('should map <%= nameParamCase %> route to view template', function () {
	var view = '<%= appSubFolder %><%= moduleNameParamCase %>/<%= nameParamCase %>.html';
  expect($state.get('<%= name %>').templateUrl).toEqual(view);
});
