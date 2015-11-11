(function (Utilities, undefined) {
  angular.module('BlogPostsList').service('BlogPostsServiceREST', ['$http', '$q', function ($http, $q) {
    //#region Initialization
    //----------------------------------------------------------------------
    // Gets a reference to self
    //----------------------------------------------------------------------
    var self = this;
    //#endregion

    //#region Public Methods
    this.getBlogPosts = function () {
      //----------------------------------------------------------------------
      // Use a promise to resolve the data from SharePoint
      //----------------------------------------------------------------------
      var deferred = $q.defer();

      //----------------------------------------------------------------------
      // Build the REST Endpoint URL
      //----------------------------------------------------------------------
      var uri = Utilities.GetAbsoluteWebUrl() + "/_api/web/lists/getByTitle('Blog Posts')/items?$select=Title,BlogPostLink,BlogPostPubDate";

      //----------------------------------------------------------------------
      // Executes the query on SharePoint
      //----------------------------------------------------------------------
      $http.get(uri, { headers: { "Accept": "application/json;odata=verbose" } }).success(function (data, status, headers, config) {
        //----------------------------------------------------------------------
        // If the request is successful, resolve the items as an array and
        // convert the SP.ListItem[] to a BlogPost[] Object
        //----------------------------------------------------------------------
        var blogPosts = buildBlogPosts(data.d.results);

        //----------------------------------------------------------------------
        // Resolve the typed blog post
        //----------------------------------------------------------------------
        deferred.resolve(blogPosts);
      }).error(function (data, status, headers, config) {
        //----------------------------------------------------------------------
        // If the request is unsuccessful, reject the promise
        //----------------------------------------------------------------------
        deferred.reject();
      });

      //----------------------------------------------------------------------
      // Returns the async promise
      //----------------------------------------------------------------------
      return deferred.promise;
    };
    //#endregion

    //#region Private Methods
    var buildBlogPosts = function(blogPostItems) {
      var blogPosts = [];

      //----------------------------------------------------------------------
      // Iterate through every Blog Post SP.ListItem
      //----------------------------------------------------------------------
      angular.forEach(blogPostItems, function (value) {
        var blogPost = toBlogPost(value);
        blogPosts.push(blogPost);
      });

      //----------------------------------------------------------------------
      // Return the object array
      //----------------------------------------------------------------------
      return blogPosts;
    };

    var toBlogPost = function (item) {
      //----------------------------------------------------------------------
      // Return a new instance of a Blog Post
      //----------------------------------------------------------------------
      return {
        title: item.Title,
        link: item.BlogPostLink,
        publishedDate: item.BlogPostPubDate
      };
    };
    //#endregion
  }]);
}(PTC.Common.Utilities));