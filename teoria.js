var terminou == false;

terminou == false // resultado true 
!terminou // negacao de false = true 
var counter = 0 ; 
while(terminou == false){
	counter++;
	console.log(counter++)
	if(counter >= 20){
		terminou = true;
	}
}


// podemos usaR "do while"

var terminou == false;
var counter = 0;

do{ 
	console.log(counter++)
	if(counter >= 20){
		terminou = true;
	}
} 
while(terminou == false)

// exemplo de funcoes

console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
// è preferivel fazer uma funcao exemplo em baixo 

consoleLogNumeros();
function consoleLogNumeros(){
	console.log(1);
	console.log(2);
	console.log(3);
	console.log(4);
	console.log(5);
}

// switch ser para utilazarmos em vez de varios if else if 

var teste = 1
if (teste == 0){
	console.log("Numeros positivo")
}

else if (teste > 0){
	console.log("Numeros negativo")
}

else if (){

}


teste2
 var depositoGasolina = 0;

 if(depositoGasolina == 0){
 	console.log("Deposito vazio");
 }
 else if (depositoGasolina ==25){
 	console.log("Deposito quase vazio");
 }
  else if (depositoGasolina ==50){
 	console.log("Deposito metade");
 }
  else if (depositoGasolina ==75){
 	console.log("Deposito quase cheio");
 }
  else if (depositoGasolina ==100){
 	console.log("Deposito cheio");
 }
 // ou utilizando switch
 var depositoGasolina = 0;
 switch(depositoGasolina){
 	case 0:
 	console.log("Deposito quase vazio");
 	break;
 	case 50:
 	console.log("Deposito metade");
 	break;
 	case 100:
 	console.log("Deposito cheio");
 	break;
 }

 Array 




















