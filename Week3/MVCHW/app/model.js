var MODEL = (function(){
    // here we create our hidden variables of the pages content. It gets stored here and swapped out when needed
    var _homePageInfo = ``;
    var _aboutPageInfo = ``;
    var _servicesPageInfo = ``;
    var _contactPageInfo = ``;

    // this is out hidden function that controls the page changes that occure. Here is where are var is loaded and changes when needed.
    // it does this by targeting our content div and change out the html elements within with what ever information was stored in the var file.
    var _changePageContent = function(pageName){
        let newName = "__" + pageName + "PageInfo"
        console.log(newName);
        //$()
    }

    return{
        changePageContent: _changePageContent,
    };
})();