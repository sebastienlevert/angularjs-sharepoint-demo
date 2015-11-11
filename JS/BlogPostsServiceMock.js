(function (Utilities, undefined) {
  angular.module('BlogPostsList').service('BlogPostsServiceMock', ['$http', '$q', function ($http, $q) {
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

      var blogPosts = [
        {
          "title":"Episode 070 at the MVP Summit—Office 365 Developer Podcast",
          "link":"https://blogs.office.com/2015/11/05/episode-070-at-the-mvp-summit-office-365-developer-podcast/",
          "publishedDate":"2015-11-05 00:00:00"
        },
        {
          "title":"Office 365 news roundup",
          "link":"https://blogs.office.com/2015/10/30/office-365-news-roundup-16/",
          "publishedDate":"2015-10-30 00:00:00"
        },
        {
          "title":"The new Office—October feature update",
          "link":"https://blogs.office.com/2015/10/29/the-new-office-october-feature-update/",
          "publishedDate":"2015-10-29 00:00:00"
        },
        {
          "title":"Episode 069 with Bradly Green on AngularJS—Office 365 Developer Podcast",
          "link":"https://blogs.office.com/2015/10/29/episode-069-with-bradly-green-on-angularjs-office-365-developer-podcast/",
          "publishedDate":"2015-10-29 00:00:00"
        },
        {
          "title":"Join Connect (); // 2015—virtual event for developers",
          "link":"https://blogs.office.com/2015/10/28/join-connect-2015-virtual-event-for-developers/",
          "publishedDate":"2015-10-28 00:00:00"
        },
        {
          "title":"Gartner recognizes Microsoft as a Leader in the 2015 Magic Quadrant for Social Software in the Workplace for seven years running!","link":"https://blogs.office.com/2015/10/28/gartner-recognizes-microsoft-as-a-leade…gic-quadrant-for-social-software-in-the-workplace-for-seven-years-running/",
          "publishedDate":"2015-10-28 00:00:00"
        },
        {
          "title":"Office Lens now includes Office 365 support for iOS and more features for business professionals, teachers and students",
          "link":"https://blogs.office.com/2015/10/26/office-lens-now-includes-office-365-sup…or-ios-and-more-features-for-business-professionals-teachers-and-students/",
          "publishedDate":"2015-10-26 00:00:00"
        },
        {
          "title":"Office Mechanics is expanding to become Microsoft Mechanics",
          "link":"https://blogs.office.com/2015/10/22/office-mechanics-is-expanding-to-become-microsoft-mechanics/",
          "publishedDate":"2015-10-22 00:00:00"
        },
        {
          "title":"Episode 068 on the Angular Connect event—Office 365 Developer Podcast",
          "link":"https://blogs.office.com/2015/10/22/episode-068-on-angular-connect-event-office-365-developer-podcast/",
          "publishedDate":"2015-10-22 00:00:00"
        },
        {
          "title":"Office 365—monthly Dev Digest for October",
          "link":"https://blogs.office.com/2015/10/20/office-365-monthly-dev-digest-for-october/",
          "publishedDate":"2015-10-20 00:00:00"
        },
        {
          "title":"Episode 067 on SharePoint Search with Matthew McDermott—Office 365 Developer Podcast",
          "link":"https://blogs.office.com/2015/10/15/episode-067-on-sharepoint-search-with-matthew-mcdermott-office-365-developer-podcast/",
          "publishedDate":"2015-10-15 00:00:00"
        },
        {
          "title":"Episode 066 on TechCrunch Disrupt SF 2015—Office 365 Developer Podcast",
          "link":"https://blogs.office.com/2015/10/08/episode-066-on-techcrunch-disrupt-sf-2015-office-365-developer-podcast/",
          "publishedDate":"2015-10-08 00:00:00"
        }
      ];
      
      deferred.resolve(blogPosts);

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