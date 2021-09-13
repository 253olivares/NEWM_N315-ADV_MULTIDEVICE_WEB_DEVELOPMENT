// console.log("model")
var MODEL = (function(){
    
    var _myVar = "Model";

    var _getMyVariable = function(buttonID){
        console.log("getter " + _myVar+ " " + buttonID)
        return _myVar;

    };
    return{
        getMyVariable: _getMyVariable,
    };
})();