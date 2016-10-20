$(document).ready(function(){
    $("a").click(function(){
        $("a").removeClass("active");
        $(this).addClass("active");
    });

    $(".responsive-menu").hide();

    $("#menu-btn").click(function() {
        $(".responsive-menu").toggle();
    });

});
