//cria base de dados (nome,versão,descrição,tamanho)
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
//obrigatório antes de qualquer operação na nossa base de dados
db.transaction(function (tx) {
		// elimina a tabela
	//tx.executeSql('DROP TABLE books');

	//cria a table se não existir
    tx.executeSql('CREATE TABLE IF NOT EXISTS books (id unique, opinion)');
 });


function LoadDataWithHTML(book){
	var HTMLtoInsert = `
	<div class="Books col-sm-10 col-sm-offset-1">
	<img>
	<input type="hidden" class="hiddenFieldId"></input>
	<h1></h1>
	<h3></h3>
	<p></p>
	</div>`;

	$(".bookcontainer").append(HTMLtoInsert);
	$currentBook = $('.Books').eq(-1);
	$("h1",$currentBook).text(book.volumeInfo.title);
	$("p",$currentBook).text(book.volumeInfo.description);	
	$("img",$currentBook).attr("src",book.volumeInfo.imageLinks.thumbnail);
	$(".hiddenFieldId",$currentBook).text(book.id);

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

			// vamos buscar o ID ao nosso hiddenfield
		$id = $('.hiddenFieldId',$parent).text();
		// vamos buscar a opinion ao nosso custom attribute
		$opinion = $(this).attr('data-opinion');

	
		db.transaction(function (tx) {
			//insert na table que criámos
			tx.executeSql('INSERT INTO books(id, opinion) VALUES(?,?)',[$id, $opinion]);
		});
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

			// vamos buscar o ID ao nosso hiddenfield
		$id2 = $('.hiddenFieldId',$parent).text();

		// vamos buscar a opinion ao nosso custom attribute
		$opinion = $(this).attr('data-opinion');

		db.transaction(function (tx) {
			//insert na table que criámos
			tx.executeSql('INSERT INTO books(id, opinion) VALUES(?,?)',[$id2, $opinion]);
		});
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
	
	$('#consultDb').click(function(){
	db.transaction(function (tx) {
		//buscar todos os resultados da nossa table
		tx.executeSql('SELECT * FROM books', [], function (tx, results) {
	   		$.each(results.rows,function(index,item){
	   			//output de todas as rows/todos os resultados
				console.log(item);
				var html = `<p>` + item.id + item.opinion + `</p>`;
				$("#stats h4").append(html);
			});
		}, null);
	});
});


var APIKey = "AIzaSyDpvVpmWlQYfZH4D9AApOFy3wl3_5qWaIU";
var UserID = "112651269133624807357";
var ShelfID = "1002";


$.ajax({
	url:"https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" 
	+ ShelfID + "/volumes?key=" + APIKey 
}).done(function(data){
	$.each(data.items,function(index,value){
		LoadDataWithHTML(value);
	});
	$(".Books").eq(0).addClass("active");
});





// // searchbar
//   $(document).ready(function(){
//             var submitIcon = $('.searchbox-icon');
//             var inputBox = $('.searchbox-input');
//             var searchBox = $('.searchbox');
//             var isOpen = false;
//             submitIcon.click(function(){
//                 if(isOpen == false){
//                     searchBox.addClass('searchbox-open');
//                     inputBox.focus();
//                     isOpen = true;
//                 } else {
//                     searchBox.removeClass('searchbox-open');
//                     inputBox.focusout();
//                     isOpen = false;
//                 }
//             });  
//              submitIcon.mouseup(function(){
//                     return false;
//                 });
//             searchBox.mouseup(function(){
//                     return false;
//                 });
//             $(document).mouseup(function(){
//                     if(isOpen == true){
//                         $('.searchbox-icon').css('display','block');
//                         submitIcon.click();
//                     }
//                 });
//         });
//             function buttonUp(){
//                 var inputVal = $('.searchbox-input').val();
//                 inputVal = $.trim(inputVal).length;
//                 if( inputVal !== 0){
//                     $('.searchbox-icon').css('display','none');
//                 } else {
//                     $('.searchbox-input').val('');
//                     $('.searchbox-icon').css('display','block');
//                 }
//             }














