function LoadDataWithHTML(book){
	var HTMLtoInsert = `
	<div class="Books col-sm-10 col-sm-offset-1">
	<img>
	<h1></h1>
	<h3></h3>
	<p></p>
	</div>`;

	$(".bookcontainer").append(HTMLtoInsert);
	$currentBook = $('.Books').eq(-1);
	$("h1",$currentBook).text(book.volumeInfo.title);
	$("p",$currentBook).text(book.volumeInfo.description);	
	$("img",$currentBook).attr("src",book.volumeInfo.imageLinks.thumbnail);
	$("a.shop",$currentBook).attr("href",book.saleInfo.buyLink);

	var countlike = 0;
	$(".bookhtml label.countlike").text("Gostos: " + countlike);
	var countdislike = 0;
	$(".bookhtml label.countdislike").text("Não Gostos: " + countdislike);

	var effectdis = false;
	$ ("button.dislike").click(function(){
		if(!effect){
			effect = true;
		$allBooks = $(".Books");
		$parent = $(".Books.active");

		var index = $allBooks.index($parent); 
		$next = $parent.next(".Books");
		if( index >= $allBooks.length-1 ){
			$next = $allBooks.eq(0);
			//esconder container dos livros
			//mostrar stats
			$(".borda").hide();
			$("#stats").show();
		} 
		$parent.fadeOut(200,function(){
			$parent.removeClass("active");
			$next.fadeIn(200,function(){
				$next.addClass("active");
				countdislike++;
				$(".bookhtml label.countdislike").text("Não Gostos: "+countdislike);
				effect = false;
			});
		});
		};
	});

	var effect = false;
	$ ("button.like").click(function(){
		if(!effect){
			effect = true;
		$allBooks = $(".Books");
		$parent = $(".Books.active");

		var index = $allBooks.index($parent); 
		$next = $parent.next(".Books");
		if( index >= $allBooks.length-1 ){
			$next = $allBooks.eq(0);
			$(".borda").hide();
			$("#stats").show();
		} 
		$parent.fadeOut(200,function(){
			$parent.removeClass("active");
			$next.fadeIn(200,function(){
				$next.addClass("active");
				countlike++;
				$(".bookhtml label.countlike").text("Gostos: "+countlike);
				effect = false;
			});
		});
	};
	});
	$("#startButton").click(function(){
		$("#startPage").hide();
		$(".borda.active").show();
	});
};

var APIKey = "AIzaSyDpvVpmWlQYfZH4D9AApOFy3wl3_5qWaIU";
var UserID = "112651269133624807357";
var ShelfID = "1002";


$.ajax({
	url:"https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" 
	+ ShelfID + "/volumes?key=" + APIKey 

}).done(function(data){
	$.each(data.items,function(index,value){
		console.log(value);
		LoadDataWithHTML(value);
	});
	$(".Books").eq(0).addClass("active");
});













