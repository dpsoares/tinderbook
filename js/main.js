//cria base de dados (nome,versão,descrição,tamanho)
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
//obrigatório antes de qualquer operação na nossa base de dados
db.transaction(function (tx) {
		// elimina a tabela
	tx.executeSql('DROP TABLE books');

	//cria a table se não existir
    tx.executeSql('CREATE TABLE IF NOT EXISTS books (id unique, opinion)');
 });

$("#Resultado").click(function(){
			$(".borda").hide();
			$("#stats").show();
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
	$(".hiddenFieldId",$currentBook).text(book.volumeInfo.title);

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
				var html = `<p>` + item.id + " " + item.opinion + `</p>`;
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


$("#search").val("Pesquisar...").addClass("empty");

$("#search").focus(function(){
   $(this).removeClass("empty");
   if($(this).val() == "Pesquisar...") {
      $(this).val("");
   }
});

$("#search").blur(function(){
   if($(this).val() == "") {
      $(this).val("Pesquisar...").addClass("empty");
   }
});

// var fullscreen = 0;

// $(".fullscreen").click(function(){
//   if(fullscreen == 0){
//     fullscreen = 1;
//     $("video").appendTo('body');
//     $("#vidControls").appendTo('body');
//     $("video").css('position', 'absolute').css('width', '100%').css('height', '90%').css('margin', 0).css('margin-top', '5%').css('top', '0').css('left', '0').css('float', 'left').css('z-index', 600);
//     $("#vidControls").css('position', 'absolute').css('bottom', '5%').css('width', '90%').css('backgroundColor', 'rgba(150, 150, 150, 0.5)').css('float', 'none').css('left', '5%').css('z-index', 700).css('-webkit-border-radius', '10px');

// }
// else
//     {

//         fullscreen = 0;

//         $("video").appendTo('#videoPlayer');
//         $("#vidControls").appendTo('#videoPlayer');

//         //change <video> css back to normal

//         //change "#vidControls" css back to normal

//     }

// });