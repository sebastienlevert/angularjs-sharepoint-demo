(function (Utilities, undefined) {
  angular.module('BlogPostsList').service('BlogPostsServiceCSOM', ['$http', '$q', function ($http, $q) {
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
      // Builds the current context
      //----------------------------------------------------------------------
      var clientContext = SP.ClientContext.get_current();

      //----------------------------------------------------------------------
      // Loads the list
      //----------------------------------------------------------------------
      var list = clientContext.get_web().get_lists().getByTitle("Blog Posts");

      //----------------------------------------------------------------------
      // Builds the ViewFields of the CAML query
      //----------------------------------------------------------------------
      var viewFields = [
        'ID',
        'Title',
        'BlogPostLink',
        'BlogPostPubDate'
      ];

      //----------------------------------------------------------------------
      // Builds the view based on the mappings provided
      //----------------------------------------------------------------------
      var viewXml = new CamlBuilder()
        .View(viewFields)
        .Query()
        .Where()
        .IntegerField("ID")
        .GreaterThan(-1)
        .OrderBy('BlogPostPubDate')
        .ToString();

      //----------------------------------------------------------------------
      // Builds the camlQuery with the specified viewXml
      //----------------------------------------------------------------------
      var camlQuery = new SP.CamlQuery();
      camlQuery.set_viewXml(viewXml);

      //----------------------------------------------------------------------
      // Loads the items based on the CAML query
      //----------------------------------------------------------------------
      var listItems = list.getItems(camlQuery);
      clientContext.load(listItems, "Include(Title,BlogPostLink,BlogPostPubDate)");

      //----------------------------------------------------------------------
      // Executes the query on SharePoint
      //----------------------------------------------------------------------
      clientContext.executeQueryAsync(function () {
        //----------------------------------------------------------------------
        // If the request is successful, resolve the items as an array and
        // convert the SP.ListItem[] to a Session[] Object
        //----------------------------------------------------------------------
        var items = Utilities.CollectionToArray(listItems);
        var blogPosts = buildBlogPosts(items);

        //----------------------------------------------------------------------
        // Resolve the typed sessions
        //----------------------------------------------------------------------
        deferred.resolve(blogPosts);
      }, function (sender, args) {
        //----------------------------------------------------------------------
        // If the request is unsuccessful, reject the promise
        //----------------------------------------------------------------------
        deferred.reject(sender);
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
      // Return a new instance of a Competency
      //----------------------------------------------------------------------
      return {
        title: item.get_item("Title"),
        link: item.get_item("BlogPostLink"),
        publishedDate: item.get_item("BlogPostPubDate")
      };
    };
    //#endregion
  }]);
}(PTC.Common.Utilities));