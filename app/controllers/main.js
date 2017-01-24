$(function(){
    // init Masonry
var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
//  percentPosition: true,
  columnWidth: '.grid-sizer',
  isFitWidth: true,
  // columnWidth: '.grid-sizer',
   gutter:'.grid-gutter'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
  
});  



$('.dropbtnm').on("click",function(){
  $(".dropdown-contentm").toggle(300);

  return false;
});

$(".fav").on("click",function(){
  var id=$(this).attr("id");
  if (!id)
    return true;
  var text=$(this).children().first();
  
  $.get("/api",{id:id},function(res){
    text.html(res.num);
    
  })
  return false;
})

$(".del").on("click",function() {
  //console.log("deleting")
    var id=$(this).attr("id");
    var data={id:id};
    $.ajax({
    url: '/api',
    type: 'DELETE',
    data: data,
    success: function(result) {
       location.reload();
    }
});
})


    
});


// external js: masonry.pkgd.js, imagesloaded.pkgd.js


var erMsg='<div class="alert alert-danger alert-dismissable fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.</div>'