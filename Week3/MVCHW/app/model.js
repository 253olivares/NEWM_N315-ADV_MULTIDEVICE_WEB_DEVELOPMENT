var MODEL = (function(){
    // here we create our hidden variables of the pages content. It gets stored here and swapped out when needed
    var _homePageInfo = `<div class="bible">
    <img src="img/Bible.png" width="500px" alt="Bible">
</div>
<br>
<br>
<div class="daily">
    <hr class="left">
    <p><b>Today's Scripture</b></p>
    <hr class="right">
</div>
<br>
<br>
<div class="scripture">
    <h2>Ephesians 2:8-10 </h2>
    <br>
    <p>"(8) For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God— (9) not by works, so that no one can boast. (10) For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do."</p>
</div>`;
    var _aboutPageInfo = `<div class="church">
    <img src="img/SaintAnothony.jpg" width="700px" alt="Bible">
</div>
<br>
<br>
<br>
<div class="name">
    <p><b>Saint Anthony Catholic Church</b></p>
</div>
<br>
<hr>
<br>
<br>
<div class="aboutUs">
    <p>St. Anthony Catholic Church is a parish that celebrates diversity and unity within the body of Christ. Through the celebration of our sacramental and prayer life and the breakdown of language and cultural barriers, we seek to build one spirit-led community that nurtures our children, cares for our elderly, forms all members in faith, reaches out to the poor, welcomes all who seek Christ and has fun together.</p>
</div>
<br>
<br>
<br>
<img class="family" src="img/family.jpg" alt="">`;
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