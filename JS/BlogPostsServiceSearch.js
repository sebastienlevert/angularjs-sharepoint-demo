(function (Utilities, undefined) {
  angular.module('BlogPostsList').service('BlogPostsServiceSearch', ['$http', '$q', function ($http, $q) {
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
      var uri = Utilities.GetAbsoluteWebUrl() + "/_api/search/query?querytext='ContentTypeId:0x0100ADDE1F7801E6844E991409E3B7311A6B*'&selectproperties='Title,RefinableString00,RefinableDate00'"


      //----------------------------------------------------------------------
      // Executes the query on SharePoint
      //----------------------------------------------------------------------
      $http.get(uri, { headers: { "Accept": "application/json;odata=verbose" } }).success(function (data, status, headers, config) {
        //----------------------------------------------------------------------
        // If the request is successful, resolve the items as an array and
        // convert the SP.ListItem[] to a BlogPost[] Object
        //----------------------------------------------------------------------
        var blogPosts = buildBlogPosts(data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results);

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
      
      angular.forEach(blogPostItems, function (blogPost) {
        angular.forEach(blogPost.Cells, function (blogPostRow) {
          var blogPostObject = {};
          
          angular.forEach(blogPostRow, function (blogPostData) {
            blogPostObject[blogPostData.Key] = blogPostData.Value;
          });
          
          blogPosts.push(toBlogPost(blogPostObject));
        });
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
        link: item.RefinableString00,
        publishedDate: item.RefinableDate00
      };
    };
    //#endregion
  }]);
}(PTC.Common.Utilities));