it('should map state <%= name %> to url /<%= nameParamCase %> ', function () {
  expect($state.href('/<%= nameParamCase %>', {})).to.equal('<%= name %>');
});
it('should map <%= nameParamCase %> route to view template', function () {
  expect($state.get('<%= name %>').templateUrl).to.equal(view);
});
