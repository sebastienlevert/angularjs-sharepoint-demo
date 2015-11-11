(function(angular, Utilities, undefined) {
  
	var modulePath = '/SiteAssets/BlogPosts/';
	var templatePath = modulePath + 'app/templates/blogPostsList.html';
	
	angular.module('BlogPostsList').controller('BlogPostsListController', ['$scope', 'BlogPostsServiceMock', function ($scope, BlogPostsService) {
		//#region Scope Members
		$scope.BlogPosts = [];
		$scope.Utilities = Utilities;
		$scope.Template = Utilities.GetAbsoluteSiteCollectionUrl() + templatePath;
		//#endregion
	
		//#region Scope Methods
		//#endregion
	
		//#region Private Methods
		var init = function () {
			SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
				loadBlogPosts();
			});
		};
	
    var loadBlogPosts = function () {
      BlogPostsService.getBlogPosts().then(function (blogPosts) {
      //----------------------------------------------------------------------
      // Sets the scope Blog Posts
      //----------------------------------------------------------------------
      $scope.BlogPosts = blogPosts;
      }, function () {
      //----------------------------------------------------------------------
      // Assign a null value to the Blog Posts
      //----------------------------------------------------------------------
      $scope.BlogPosts = null;
      });
    };
    //#endregion
	
		//#region Initialization
		init();
		//#endregion
  }]); 
}(angular, PTC.Common.Utilities));