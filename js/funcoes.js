var canvas, stage, raiz, primeiraOpcao, restart;



function init() {
	primeiraOpcao = false;
	restart = false;
	
	
	canvas = document.getElementById("canvas");
	images = images||{};

	var manifest = [
		{src:"images/mapa_mundi.png", id:"mapa_mundi"}
	];

	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", handleFileLoad);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest);
	
}

function handleFileLoad(evt) {
	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function handleComplete() {
	raiz = new lib.povoamentoAmerica();

	stage = new createjs.Stage(canvas);
	stage.addChild(raiz);
	stage.update();

	createjs.Ticker.setFPS(24);
	createjs.Ticker.addEventListener("tick", stage);
	
	stage.enableMouseOver(55);
	
	//Mc barra inicia exposta
	raiz.barra.gotoAndStop("barraExposta");
		
	//Redimensionamento do stage (canvas)
	windowResize();	
	
		
	eventos();
	
	createjs.Ticker.addEventListener("tick", enterFrameRaiz);
	createjs.Ticker.addEventListener("tick", enterFrameMapa);	
}


function eventos(){
	
	//rollover cursor
	raiz.bt_iniciar.onMouseOver = cursorSobre;
	raiz.bt_iniciar.onMouseOut = cursorFora;
	raiz.barra.exibeBarra.onMouseOver = cursorSobre;
	raiz.barra.exibeBarra.onMouseOut = cursorFora;
	raiz.barra.exibeInfo.onMouseOver = cursorSobre;
	raiz.barra.exibeInfo.onMouseOut = cursorFora;
	raiz.barra.caixaInformacaoBarra.fecharInfoBarra.onMouseOver = cursorSobre;
	raiz.barra.caixaInformacaoBarra.fecharInfoBarra.onMouseOut = cursorFora;
	
	raiz.mc_mapa_mundi.mcSitioHadar.onMouseOver = cursorSobre;
	raiz.mc_mapa_mundi.mcSitioAramis.onMouseOver = cursorSobre;
	raiz.mc_mapa_mundi.mcSitioClovis.onMouseOver = cursorSobre;
	raiz.mc_mapa_mundi.mcSitioPedraPintada.onMouseOver = cursorSobre;
	raiz.mc_mapa_mundi.mcSitioToca.onMouseOver = cursorSobre;
	raiz.mc_mapa_mundi.mcSitioLapaVermelha.onMouseOver = cursorSobre;
	
	raiz.mc_mapa_mundi.mcSitioHadar.onMouseOut = cursorFora;
	raiz.mc_mapa_mundi.mcSitioAramis.onMouseOut = cursorFora;
	raiz.mc_mapa_mundi.mcSitioClovis.onMouseOut = cursorFora;
	raiz.mc_mapa_mundi.mcSitioPedraPintada.onMouseOut = cursorFora;
	raiz.mc_mapa_mundi.mcSitioToca.onMouseOut = cursorFora;
	raiz.mc_mapa_mundi.mcSitioLapaVermelha.onMouseOut = cursorFora;
		
	raiz.mc_Notas_Mapa.alpha = 0;
	raiz.mc_escalaRosaVentos.alpha = 0;
	
	
	//botoes q. dão sequancia na timeline principal (play)
	var tl = raiz.barra.timeline;
	
	raiz.bt_iniciar.onClick = function(){
		if(tl.position == 20){
			raiz.barra.play();
		}
		raiz.play();
	};
	
	//barra de informacoes
	raiz.barra.exibeBarra.onClick = function(){
		//verifica timeline do MC barra
		if(tl.position == 20){
			raiz.barra.play();
		}else{
			raiz.barra.gotoAndPlay("desceBarra");
		}		
	};
	raiz.barra.exibeInfo.onClick = function(){
		$("#tampaPreta").fadeIn(500);
		$("#avisoInfo").animate({top:'150px'});
		//raiz.barra.gotoAndPlay("mostraInfo");
	};
	$("#avisoInfo .fechar").click(function(){
		$("#tampaPreta").fadeOut(500);
		$("#avisoInfo").css('display', 'block');
		$("#avisoInfo").animate({top:'-1000px'});
	});
	//raiz.barra.caixaInformacaoBarra.fecharInfoBarra.onClick = function(){		
		//raiz.barra.play();
	//};
	
	//exibir sítios 
	raiz.mc_mapa_mundi.mcSitioHadar.onClick = function(){
		ocultaSitios();
		exibePopUp('#hadar');
		$('#showReiniciar').css('display', 'block');
	}
	raiz.mc_mapa_mundi.mcSitioAramis.onClick = function(){
		ocultaSitios();
		exibePopUp('#aramis');
		$('#showReiniciar').css('display', 'block');
	}
	raiz.mc_mapa_mundi.mcSitioClovis.onClick = function(){
		ocultaSitios();
		exibePopUp('#clovis');
		$('#showReiniciar').css('display', 'block');
	}
	raiz.mc_mapa_mundi.mcSitioPedraPintada.onClick = function(){
		ocultaSitios();
		exibePopUp('#pedraPintada');
		$('#showReiniciar').css('display', 'block');
	}
	raiz.mc_mapa_mundi.mcSitioToca.onClick = function(){
		ocultaSitios();
		exibePopUp('#toca');
		$('#showReiniciar').css('display', 'block');
	}
	raiz.mc_mapa_mundi.mcSitioLapaVermelha.onClick = function(){
		ocultaSitios();
		exibePopUp('#lapaVermelha');
		$('#showReiniciar').css('display', 'block');
	}
}

function ocultaSitios(){
	$('msgSitios').css('display', 'none');
    $('#clovis').css('display', 'none');
    $('#pedraPintada').css('display', 'none');
    $('#lapaVermelha').css('display', 'none');
    $('#aramis').css('display', 'none');
    $('#toca').css('display', 'none');
   $('#hadar').css('display', 'none');
}

function fadeInOut(grafico, tempo){
	if(grafico.alpha == 0){
		createjs.Tween.get(grafico).to({alpha:1},tempo);
	}else{
		createjs.Tween.get(grafico).to({alpha:0},tempo);
	}	
}

function windowResize(){
   stage.canvas.width = window.innerWidth;
   stage.canvas.height = window.innerHeight; 
   var test = (window.innerWidth/(1024))*0.75;
   raiz.scaleY = raiz.scaleX = test;
   
   //redimensiona elementos DOM
   escalaElemento($('#msgInicio'), '0%', test);
   escalaElemento($('#msgRotas'), '0%', test);
   escalaElemento($('#hipotese1'), '0%', test);
   escalaElemento($('#hipotese2'), '0%', test);
   escalaElemento($('#showMapaCompleto'), '0%', test);
   escalaElemento($('#msgSitios'), '0%', test);
   escalaElemento($('#showReiniciar'), '0%', test);
   escalaElemento($('#hadar'), '0%', test);
   escalaElemento($('#toca'), '0%', test);
   escalaElemento($('#aramis'), '0%', test);
   escalaElemento($('#lapaVermelha'), '0%', test);
   escalaElemento($('#pedraPintada'), '0%', test);
   escalaElemento($('#clovis'), '0%', test);
   escalaElemento($("#avisoInfo"), '0%', test);
   /*escalaElemento($('#msgInicio'), '-100%', test);
   escalaElemento($('#msgRotas'), '-100%', test);
   escalaElemento($('#hipotese1'), '-100%', test);
   escalaElemento($('#hipotese2'), '-100%', test);
   escalaElemento($('#showMapaCompleto'), '-100%', test);
   escalaElemento($('#msgSitios'), '-100%', test);
   escalaElemento($('#showReiniciar'), '-100%', test);
   escalaElemento($('#hadar'), '-50%', test);
   escalaElemento($('#toca'), '-50%', test);
   escalaElemento($('#aramis'), '-50%', test);
   escalaElemento($('#lapaVermelha'), '-50%', test);
   escalaElemento($('#pedraPintada'), '-50%', test);
   escalaElemento($('#clovis'), '-50%', test);
   escalaElemento($("#avisoInfo"), '-100%', test);*/
}

function escalaElemento(eleDom, posicao, fator){	
	eleDom.css('transform','scale('+fator+')');
	eleDom.css('-o-transform','scale('+fator+')');
	eleDom.css('-ms-transform','scale('+fator+')');
	eleDom.css('-webkit-transform','scale('+fator+')');
	eleDom.css('-moz-transform','scale('+fator+')');
	eleDom.css('-o-transform','scale('+fator+')');
	
	eleDom.css('transform-origin',''+posicao+' 0%');
	eleDom.css('-ms-transform-origin',''+posicao+' 0%');
	eleDom.css('-webkit-transform-origin',''+posicao+' 0%');		
}




function cursorSobre(e){
	document.body.style.cursor='pointer';
}
function cursorFora(e){
	document.body.style.cursor='default';
}


function playRaiz(){
	raiz.play();
}

function playRotaPacifico(){
	raiz.mc_mapa_mundi.gotoAndPlay("rotaOceanoPacifico");
	
}

function playRotaBering(){
	raiz.mc_mapa_mundi.gotoAndPlay("rotaEstreitoBering");
}

function playMapaCompleto(){
	raiz.mc_mapa_mundi.gotoAndPlay("mapaCompleto");
}


////Funções para detectar o fluxo da timeline
function enterFrameRaiz(event) {     	
	var tl_raiz = raiz.timeline;
	if(tl_raiz.position == 30){
		raiz.mc_Notas_Mapa.alpha = 1;
		raiz.mc_escalaRosaVentos.alpha = 1;
		cxAberta = '#msgInicio';
		exibePopUp('#msgInicio');
		$('#msgSitios').css('display', 'none');
	}
	
	if(tl_raiz.position == 20){
		$('#msgSitios').css('display', 'none');
	}
	
	if(tl_raiz.position == 62){
		raiz.mc_mapa_mundi.play();
	}
	
	if(tl_raiz.position == 218){
		raiz.mc_escalaRosaVentos.alpha = 1;
	}
	
	
     //if (!event.paused) {
        // Actions carried out when the Ticker is not paused.
     //}
}

function enterFrameMapa(event) {     	
	var tl_Mapa = raiz.mc_mapa_mundi.timeline;
	if(tl_Mapa.position == 202){
		exibePopUp('#msgRotas');
	}
	
		
	//verifica se está no final de "rota Oceano Pacifico"
	if(tl_Mapa.position == 279){
		if(primeiraOpcao){
			exibePopUp('#hipotese1');
		}else{
			exibePopUp('#showMapaCompleto');
		}
	}
	
	
	
	
	//
	
	//verifica se está no final de "rota Estreito de Bering"
	if(tl_Mapa.position == 383){
		if(primeiraOpcao){
			exibePopUp('#hipotese2');
		}else{
			exibePopUp('#showMapaCompleto');
		}	
	}
	
	//Mostra instrução p/ver sítio arqueológico
	if(tl_Mapa.position == 398){
		exibePopUp('#msgSitios');
	}
     //if (!event.paused) {
        // Actions carried out when the Ticker is not paused.
     //}
}



//////////////////////////////////// DOM e jQuery   /////////////////////////////////////////////////////////

function exibePopUp(elemento){
	$(elemento).fadeIn(500);
}



//inserir eventos e funções jQuery
$(document).ready(function(){
	
	
	scaleContainer();
	
	
	//REINICIAR
	$('#btShowReiniciar').click(function(){
		restart = true;
		 ocultaSitios();
		 primeiraOpcao = false;
		 $('#showReiniciar').css('display', 'none');
		 $('#msgSitios').css('display', 'none');
		 raiz.mc_mapa_mundi.gotoAndStop(0);
		 raiz.gotoAndPlay("intro");
		 raiz.mc_Notas_Mapa.alpha = 0;
		 raiz.mc_escalaRosaVentos.alpha = 0;
	});	
	
	
	
	
	//botões dos popUps
	 $('#continuar').click(function(){
	   playRaiz();
	   raiz.mc_Notas_Mapa.alpha = 0;
	   raiz.mc_escalaRosaVentos.alpha = 0;
	   $('#msgInicio').css('display', 'none');
  	});
	
	
	$('#rotaPacifico').click(function(){
		playRotaPacifico();
		$('#msgRotas').css('display', 'none');
			primeiraOpcao = true;
	});	
	$('#rotaBering').click(function(){
		playRotaBering();
		$('#msgRotas').css('display', 'none');
			primeiraOpcao = true;
	});
	
	//botões para ver a outra hipótese
	$('#verRotaBering').click(function(){
		playRotaBering();
		$('#hipotese1').css('display', 'none');
		primeiraOpcao = false;
	});
	$('#verRotaPacifico').click(function(){
		playRotaPacifico();
		$('#hipotese2').css('display', 'none');
		primeiraOpcao = false;
	});
	
	$('#btShowMapaCompleto').click(function(){
		playMapaCompleto();
		$('#showMapaCompleto').css('display', 'none');
	});
	
	
	$('.fechar').click(function(){
		$(this).parent().css('display', 'none');
	
});



/*(function($){
  $(window).resize(function(){
     windowResize();  
	 scaleContainer();                    
  });         
})(jQuery);*/




function scaleContainer(){
	var stage=$('.reescalar');
	var parent=$('.reescalar').parent();
	
	var parentWidth=stage.parent().width();
	var stageWidth=stage.width();
	var stageHeight = stage.height();
	
	var desiredWidth=Math.round(parentWidth*1);	
	
	var rescale=(desiredWidth/stageWidth);
	//var rescale=0.7;
	
	stage.css('transform','scale('+rescale+')');
	stage.css('-o-transform','scale('+rescale+')');
	stage.css('-ms-transform','scale('+rescale+')');
	stage.css('-webkit-transform','scale('+rescale+')');
	stage.css('-moz-transform','scale('+rescale+')');
	stage.css('-o-transform','scale('+rescale+')');
	
	stage.css('transform-origin','0% 0%');
	stage.css('-ms-transform-origin','0% 0%');
	stage.css('-webkit-transform-origin','0% 0%');
	//parent.height(stageHeight*rescale);
 }
	
});





