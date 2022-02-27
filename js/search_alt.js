const cButton = document.getElementById("search-form"); //boton buscar
//botones paginacion
const nextButton = document.getElementById("next"); 
const previousButton = document.getElementById("previous");
const nextBtn = document.querySelector("#btn-next");
const prevBtn = document.querySelector("#btn-previous");
//spinner
const loading = document.querySelector("#loading");
var pokemon = [];
var datos = [];
var index = [];
var start = -1;
var gen1;
var gen2;
var gen3;
var gen4;
var gen5;
var gen6;
var disabled_p = true;
var disabled_n = false;

function comparar ( a, b ){ return a - b; } //usada para ordenar el vector de indices

//funcion de la busqueda, devuelve y muestra en la tabla los datos de 20 pokemon, los cuales son elegidos segun el vector de indices
function busqueda (index, start) {
	var urls = [];
	document.getElementById('tabla').style.visibility = "hidden"; //ocultamos la tabla mientras se busca
	document.getElementById('pagination').style.visibility = "hidden";
	for (var i = 0; i < (index.length-start) && i < 20; i++) { //max 20 resultados
        	var pokeData = "https://pokeapi.co/api/v2/pokemon/" + index[i+start];
          	urls[i] = pokeData; //generamos vector de urls a las que vamos a hacer fetch
        }

        let requests = urls.map(url=>fetch(url)); //vector de fetchs

        Promise.all(requests) //esperamos a que se confirmen todos
			.then(responses => {
				for(let response of responses) {
			      console.log("fetch2OK");
			    }
			    return responses;
			})

			.then(responses => Promise.all(responses.map(r => r.json())))

			//una vez confirmado las busquedas y almacenados los resultados procedemos a la operacion de muestra de resultados
			.then(r2 => {	
				datos=r2;
				if (datos.length > 0) {
		          var temp = '';
		          document.getElementById('data').innerHTML = temp; //vaciamos las rows previas
		          for (var i = 0; i < datos.length; i++) { // rellenamos fila por fila
		          	var imagen = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
		          	imagen += datos[i].id;
		          	imagen += '.png';
		          	temp += '<tr>';
		            temp += '<td><img src="'+ imagen +'" height="120px" width="auto"></td>';
		            temp += '<td>' + datos[i].name + '</td>';
		            temp += '<td>' + datos[i].types[0].type.name + '</td>';
		            if(datos[i].types.length > 1) {
			           	temp += '<td>' + datos[i].types[1].type.name + '</td>';
			        } else {
		            	temp += '<td></td>';
		            }
		            temp += '<td>' + datos[i].stats[0].base_stat + '</td>';
		            temp += '<td>' + datos[i].stats[1].base_stat + '</td>';
		            temp += '<td>' + datos[i].stats[2].base_stat + '</td>';
		            temp += '<td>' + datos[i].stats[3].base_stat + '</td>';
		            temp += '<td>' + datos[i].stats[4].base_stat + '</td>';
		            temp += '<td>' + datos[i].stats[5].base_stat + '</td></tr>';
        		}
        		 document.getElementById('data').innerHTML = temp; // metemos las filas ya modificadas
        		 //metemos un pequeño retardo para asegurarnos de que las imagenes se cargan al completo antes de mostrar
        		 setTimeout(function(){
        		 	//tras este retardo, escondemos spinner y mostramos tabla
				    document.getElementById('tabla').style.visibility = "visible";
				    document.getElementById('pagination').style.visibility = "visible";
				    loading.classList.add("visually-hidden");
				 }, 600);
          }
      	})
}

//funcion de la busqueda de una generacion de pokemon, de la que se quiere conseguir el vector de indices de pokemons introducidos en X generacion. 
//Estos indices son identificadores unicos de cada pokemon en esta API
cButton.addEventListener("submit",function(e){
	console.log("boton funciona")
	e.preventDefault();
	start = 0; //variable usada para la paginacion: indica a partir de que posicion del vector se empieza a buscar en la funcion busqueda
	disabled_p = true;
	disabled_n = false;
	prevBtn.classList.add("disabled");
	nextBtn.classList.remove("disabled");
	loading.classList.remove("visually-hidden");
	//comprobamos que gen se ha elegido
	gen1 = document.getElementById('btnGen1').checked;
	gen2 = document.getElementById('btnGen2').checked;
	gen3 = document.getElementById('btnGen3').checked;
	gen4 = document.getElementById('btnGen4').checked;
	gen5 = document.getElementById('btnGen5').checked;
	gen6 = document.getElementById('btnGen6').checked;
	gen7 = document.getElementById('btnGen7').checked;
	gen8 = document.getElementById('btnGen8').checked;
	var genSelected = selectedGen();
	var url_ini = "https://pokeapi.co/api/v2/generation/generation-"+genSelected
	fetch(url_ini, {
		"method": 'GET',
      	"headers": {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
	})

	.then(res => {
		if(res.ok){
			console.log("fetchOK");
			console.log(res);
			return res.json();  //devuelvo la respuesta del fetch como json
		} else {
			throw res;
		}
	})

	.then(r => {
		//sacamos los indices: este vector de indices queda intocable hasta que se haga otra busqueda (paginacion no va a reiniciar/cambiar este vector)
		pokemon=r;
		index = [];
		for (var i = 0; i < pokemon.pokemon_species.length; i++) {
          	var parts = pokemon.pokemon_species[i].url.split("/pokemon-species/");
          	index[i] = parts[1].substr(0,parts[1].length - 1);
          }

        index.sort(comparar); //ordenamos
        busqueda(index,start); //mostrado de 20 primeros resultados    
    })      	   
})

nextButton.addEventListener("submit",function(e){
	console.log("boton next funciona")
	e.preventDefault();
	loading.classList.remove("visually-hidden");
	backToTop();
	if (start == -1) {
		return;
	} else {
		start += 20; //si pulasmos next (page) sumamos 20 a la variable start, por tanto mostrara la tabla los 20 siguientes resultados a los anteriores
		busqueda(index,start);
		if(disabled_p) {
			prevBtn.classList.remove("disabled");
			disabled_p = false;
		}
		if(start+20 >= index.length) {
			nextBtn.classList.add("disabled");
			disabled_n = true;
		}
	}
})

previousButton.addEventListener("submit",function(e){
	console.log("boton previous funciona")
	e.preventDefault();
	loading.classList.remove("visually-hidden");
	backToTop();
	if (start == -1) {
		return;
	} else {
		start -= 20; //inverso a next, muestra los 20 previos
		busqueda(index,start); 
		if (start <= 0) {
			prevBtn.classList.add("disabled");
			disabled_p = true;
			start = 0;
		}
		if (disabled_n) {
			nextBtn.classList.remove("disabled");
			disabled_n = false;
		}
	}
})

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function selectedGen() {
	if(gen1){return 'i'}
	else if(gen2){return 'ii'}
	else if(gen3){return 'iii'}
	else if(gen4){return 'iv'}
	else if(gen5){return 'v'}
	else if(gen6){return 'vi'}
	else if(gen7){return 'vii'}
	else if(gen8){return 'viii'}
}

