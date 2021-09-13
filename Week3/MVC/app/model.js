// console.log("model")
var MODEL = (function(){
    
    var _myVar = "Model";
    var _homePageInfo = "";

    var _getMyVariable = function(buttonID, callback){
        console.log("Model.js 6 " + buttonID);
        let newName = buttonID + " Callback";

        if(buttonID == "home"){
            $("#homePage").append(buttonID);
        } else{
            $("#aboutPage").append(buttonID);
        }
        // return _myVar;
        if(callback){
            callback(newName);
        };
    };

    var _getCatDogVariable = function(btnID, callback){
        let Name = btnID + " pets they are really cool!";

        if(btnID == "dog"){
            $("#dogPage").append("You like "+ btnID+ " ");
        }else{
            $("#catPage").append("You like "+ btnID+ " ");
        }
        callback(Name);

    };
    return{
        getMyVariable: _getMyVariable,
        getCatDogVariable: _getCatDogVariable,
    };
})();