
//Lógica do jogo

var timerId = null; //Variável que armazena a chamada da função timeout

function iniciaJogo(){
	// alert(' Clique em Ok para : Jogar');

	var url = window.location.search;
	// alert(url);
	var nivel_jogo = url.replace("?","");
	 // alert(nivel_jogo);

	 //1 fácil -> 120segundos
	 //2 normal -> 60 segundos
	 //3 dificil -> 30segundos
	 var tempo_segundos = 0;

	 if (nivel_jogo == 1) {
	 	//1 fácil -> 120segundo
	 	tempo_segundos = 120;

	 }

	  if (nivel_jogo == 2) {
	 	 //2 normal -> 60 segundos
	 	tempo_segundos = 60;
	 }

	  if (nivel_jogo == 3) {
	 	 //3 dificil -> 30segundos
	 	 tempo_segundos = 30;
	 	
	 }

	 //Inserir Segundos no Span
	 document.getElementById('cronometro').innerHTML = tempo_segundos;

	 //quantidade de balões

	 var qtde_baloes = 80;
		criaBaloes(qtde_baloes);

		//imprimir qtde baloes inteiros

		document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;

		//imprimit qtde baloes estourados
		document.getElementById('baloes_estourados').innerHTML = 0;

		//func contagem_tempo

		contagem_tempo(tempo_segundos+1);

}

	//decremento do cronometro
	function contagem_tempo(segundos){
		segundos-=1;

		if (segundos ==  -1){
			clearTimeout(timerId);//para a execução da função do set time out
			game_over();
			return false;
		}
		document.getElementById('cronometro').innerHTML = segundos;
		timerId = setTimeout("contagem_tempo("+segundos+")",1000);

	}

	//função game over

	function game_over(){
		 remove_eventos_baloes();
		alert('Fim de Jogo , Você não conseguiu estourar todos os balões a tempo !');
	}
	

	// função criar balões


	function criaBaloes(qtde_baloes){
		for(var i = 1; i <= qtde_baloes; i++){

			var balao = document.createElement("img");
			balao.src = 'imagens/balao_azul_pequeno.png';
			balao.style.margin = '10px';
			balao.id = 'b'+i;
			balao.onclick =  function(){estourar(this);}
			document.getElementById('cenario').appendChild(balao);
		}

	}

	//função estourar

	function estourar(e){

		var id_balao = e.id;
		document.getElementById(id_balao).setAttribute("onclick","");//correção do bug
		document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
			// alert(id_balao);
			pontuacao(-1);
	}

	//função pontuação

	function pontuacao(acao){

		var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
		var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

		baloes_inteiros = parseInt(baloes_inteiros);
		baloes_estourados = parseInt(baloes_estourados);

		baloes_inteiros += acao; 
		baloes_estourados -= acao; 

		// alert(baloes_inteiros);
		// alert(baloes_estourados);

		document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
		document.getElementById('baloes_estourados').innerHTML= baloes_estourados;

		situacao_jogo(baloes_inteiros);

		}

		// função da situacao_jogo


		function situacao_jogo(baloes_inteiros){

			if(baloes_inteiros == 0){
				alert('Parabéns , Você conseguiu estourar todos os balões a tempo !');
				parar_jogo();
			}

		}

		//parar jogo

		function parar_jogo(){
			clearTimeout(timerId);
		}

		//função para remover eventos depois do término do jogo

		function remove_eventos_baloes() {
    	var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}