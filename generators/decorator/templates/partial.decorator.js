
function <%= nameParamCase%>Decorator($delegate) {
  return {};
};

$provide.decorator('<%= nameParamCase %>', <%= nameParamCase%>Decorator);
