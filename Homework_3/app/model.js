var MODEL = (function(){
    var _changeContent = function(page){
        $.get(`../pages/${page}/${page}.html`, function(data){
            console.log(data);
            $(`#app`).html(data);
        });
    }

    return{
        changeContent: _changeContent
    }
})();