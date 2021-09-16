var MODEL = (function(){
    // here we create our hidden variables of the pages content. It gets stored here and swapped out when needed


    // this is out hidden function that controls the page changes that occure. Here is where are var is loaded and changes when needed.
    // it does this by targeting our content div and change out the html elements within with what ever information was stored in the var file.
    var __changePageContent = function (pageNamee){

    }

    return{
        getPageContent: __changePageContent,
    };
});