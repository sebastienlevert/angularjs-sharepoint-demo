var PTC = PTC || {};
PTC.Common = PTC.Common || {};
PTC.Common.Utilities = PTC.Common.Utilities || {};

(function (Utilities, jQuery, undefined) {
    /// <summary>
    /// Utilities module
    /// </summary>
    /// <param name="Utilities">The Utilities Namespace</param>
    /// <param name="$">jQuery</param>
    /// <param name="undefined">Security parameter</param>

    Utilities.GetAbsoluteWebApplicationUrl = function () {
        /// <summary>
        /// Gets the current absolute web application url
        /// </summary>
        /// <returns type="string">The absolute url</returns>
        return window.location.protocol + "//" + window.location.host;
    };

    Utilities.GetAbsoluteSiteCollectionUrl = function () {
        /// <summary>
        /// Gets the current absolute site collection url
        /// </summary>
        /// <returns type="string">The absolute url</returns>
        return Utilities.GetAbsoluteWebApplicationUrl() + _spPageContextInfo.siteServerRelativeUrl;
    };

    Utilities.GetServerRelativeSiteCollectionUrl = function () {
        /// <summary>
        /// Gets the current absolute site collection url
        /// </summary>
        /// <returns type="string">The absolute url</returns>
        return _spPageContextInfo.siteServerRelativeUrl;
    };

    Utilities.GetAbsoluteWebUrl = function () {
        /// <summary>
        /// Gets the current absolute web url
        /// </summary>
        /// <returns type="string">The absolute url</returns>
        return Utilities.GetAbsoluteWebApplicationUrl() + _spPageContextInfo.webServerRelativeUrl;
    };

    Utilities.IsEditMode = function (webPartId) {
        /// <summary>
        /// Checks if the current page or wiki page is in edit mode
        /// </summary>
        /// <param name="webPartId">The WebPart Id to validate</param>
        /// <returns type="">True if in Edit Mode</returns>        
        var editMode = false;
        var wikiMode = document.forms[MSOWebPartPageFormName]._wikiPageMode;
        var pageLayoutMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode;

        //----------------------------------------------------------------------
        // Checks the Edit mode for a wiki page
        //----------------------------------------------------------------------
        if (wikiMode != undefined && wikiMode != null) {
            editMode = wikiMode.value == "Edit";
        }

        //----------------------------------------------------------------------
        // Checks the Edit mode for a regular Page Layout
        //----------------------------------------------------------------------
        if (pageLayoutMode != undefined && pageLayoutMode != null) {
            editMode = pageLayoutMode.value == "1";
        }

        //----------------------------------------------------------------------
        // Checks for a webpart Edit mode without a Page Edit mode
        //----------------------------------------------------------------------
        if (!editMode) {
            editMode = SP.Ribbon.PageState.Handlers.isInEditMode() && jQuery("div[id$='_MSOTlPn_EditorZone_Edit0" + webPartId + "']").hasClass("ms-TPBody")
        }

        return editMode;
    };

    Utilities.GetLanguage = function () {
        /// <summary>
        /// Gets the current executing UI language
        /// </summary>
        /// <returns type="string">The LCID of the current language</returns>
        return _spPageContextInfo.currentLanguage;
    };

    Utilities.CollectionToArray = function (collection) {
        /// <summary>
        /// Converts a SPCollection to an Array
        /// </summary>
        /// <param name="collection">The SharePoint object collection</param>
        /// <returns type="Array">The transformed collection</returns>
        var items = [];
        var enumerator = collection.getEnumerator();

        //----------------------------------------------------------------------
        // Iterates through all the items in the collection and adds it to an array
        //----------------------------------------------------------------------
        while (enumerator.moveNext()) {
            items.push(enumerator.get_current());
        }

        return items;
    };

    Utilities.Format = function (value) {
        /// <summary>
        /// Formats a string based on the .NET String.Format methods
        /// </summary>
        /// <param name="value">The value to format</param>
        /// <returns type="string">The formatted value</returns>
        var args = arguments;
        return value.replace(/{(\d+)}/g, function (match, number) {
            var index = parseInt(number);
            return typeof args[index + 1] != 'undefined' ? args[index + 1] : match;
        });
    };

    Utilities.StartsWith = function (value, str) {
        /// <summary>
        /// Validates if the value starts with the 
        /// </summary>
        /// <param name="value">The value to check upon</param>
        /// <param name="str">The substring to check</param>
        /// <returns type="boolean">If the value starts with the requested value</returns>
        return value.slice(0, str.length) == str;
    };

    Utilities.EndsWith = function (value, str) {
        /// <summary>
        /// Validates if the value ends with the 
        /// </summary>
        /// <param name="value">The value to check upon</param>
        /// <param name="str">The substring to check</param>
        /// <returns type="boolean">If the value ends with the requested value</returns>
        return value.slice(-str.length) == str;
    };

    Utilities.ExtendArray = function (arrayA, arrayB) {
        /// <summary>
        /// Extends a distinct array 
        /// </summary>
        /// <param name="arrayA">The source Array</param>
        /// <param name="arrayB">The added Array</param>
        /// <returns type="array">The distinct extended array</returns>
        var concatArray = arrayA.concat(arrayB);
        return Enumerable.From(concatArray).Distinct().ToArray();                        
    };

}(PTC.Common.Utilities, jQuery));