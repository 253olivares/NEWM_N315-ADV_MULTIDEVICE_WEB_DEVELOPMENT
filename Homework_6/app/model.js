var MODEL = (function(){

    var _changeContent = function(page){
        $.get(`pages/${page}/${page}.html`, function(data){
            console.log(data);
            let butnPlace = page + "Btn"
            console.log(butnPlace);
            if(page == "home"){
                $(".navMen").removeClass("selected");
                $("#page-container").css("background-image", "linear-gradient(to right, rgba(242,92,84,.6),rgba(242,92,84,.6)), url(../images/hero.jpg)");
                $("#page-container").css("background-color", "none");
                $("."+butnPlace).addClass("selected");
                $('#app').html(data);
            } else if (page == "login") {
                $(".navMen").removeClass("selected");
                $("#page-container").css("background-image", "none");
                $("#page-container").css("background-color", "#FFD972");
                $('#app').html(data);
            } else {
                $('#app').html(data);
            }
        });
    }
    
    return {
        changeContent: _changeContent,
    }

})();