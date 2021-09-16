var MODEL = (function(){
    // here we create our hidden variables of the pages content. It gets stored here and swapped out when needed
    var _homePageInfo = `<p>home page</p>`;
    var _aboutPageInfo = `<p>about page</p>`;
    var _servicesPageInfo = `<p>service page</p>`;
    var _contactPageInfo = `<p>contact page</p>`;

    // this is out hidden function that controls the page changes that occure. Here is where are var is loaded and changes when needed.
    // it does this by targeting our content div and change out the html elements within with what ever information was stored in the var file.
    var _changePageContent = function(pageName){
        if(pageName == "home"){
            $(".content").html(_homePageInfo);
        } else if (pageName == "about"){
            $(".content").html(_aboutPageInfo);
        } else if (pageName =="services"){
            $(".content").html(_servicesPageInfo);
        }else if(pageName=="contact"){
            $(".content").html(_contactPageInfo);
        }
    }

    return{
        changePageContent: _changePageContent,
    };
})();