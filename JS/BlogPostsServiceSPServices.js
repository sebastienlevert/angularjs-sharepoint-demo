(function (Utilities, undefined) {
  angular.module('BlogPostsList').service('BlogPostsServiceSPServices', ['$http', '$q', function ($http, $q) {
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
      // Executes the query on SharePoint
      //----------------------------------------------------------------------
      jQuery().SPServices({
        operation: "GetListItems",
        listName: "Blog Posts",
        CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='BlogPostLink' /><FieldRef Name='BlogPostPubDate' /></ViewFields>",
        completefunc: function (xData, Status) {
          if (Status == "Error") {
            //----------------------------------------------------------------------
            // If the request is unsuccessful, reject the promise
            //----------------------------------------------------------------------
            deferred.reject();
          }

          //----------------------------------------------------------------------
          // If the request is successful, resolve the items as an array and
          // convert the SP.ListItem[] to a BlogPost[] Object
          //----------------------------------------------------------------------
          var items = jQuery(xData.responseXML).SPFilterNode("z:row").SPXmlToJson({ includeAllAttrs: true, removeOws: true });
          var blogPosts = buildBlogPosts(items);

          //----------------------------------------------------------------------
          // Resolve the typed sessions
          //----------------------------------------------------------------------
          deferred.resolve(blogPosts);
        }
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