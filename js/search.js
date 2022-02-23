
const cButton = document.getElementById("search-form");
var pokemon = [];
var datos = [];
cButton.addEventListener("submit",function(e){
	console.log("boton funciona")
	e.preventDefault();
	fetch("https://pokeapi.co/api/v2/pokemon?version=red", {
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
		pokemon=r;
		if (pokemon.results.length > 0) {
		  document.getElementById('tabla').style.visibility = "visible";
          var temp = '';
          for (var i = 0; i < pokemon.results.length - 1; i++) {
          	var parts = pokemon.results[i].url.split("/pokemon/");
          	var num = parts[1].substr(0,parts[1].length - 1);
          	var pokeData = "https://pokeapi.co/api/v2/pokemon/" + num;
          	var imagen = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
          	imagen += num;
          	imagen += '.png';
          	temp += '<tr>';
            temp += '<td><img src="'+ imagen +'" height="120px" width="auto"></td>';
            temp += '<td>' + pokemon.results[i].name + '</td>';
            fetch(pokeData, {
				"method": 'GET',
		      	"headers": {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		      }
			})
			.then(res2 => {
				if(res2.ok){
					console.log("fetch2OK");
					return res2.json();  //devuelvo la respuesta del fetch como json
				} else {
					throw res2;
				}
			})
			.then(r2 => {
				datos=r2;
				console.log(datos.types[0].type.name);
				temp += '<td>' + datos.types[0].type.name + '</td>';
            	if(datos.types.length > 1) {
	            	temp += '<td>' + datos.types[1].type.name + '</td>';
	            } else {
	            	temp += '<td></td>';
	            }
	            temp += '<td>' + datos.stats[0].base_stat + '</td>';
	            temp += '<td>' + datos.stats[1].base_stat + '</td>';
	            temp += '<td>' + datos.stats[2].base_stat + '</td>';
	            temp += '<td>' + datos.stats[3].base_stat + '</td>';
	            temp += '<td>' + datos.stats[4].base_stat + '</td>';
	            temp += '<td>' + datos.stats[5].base_stat + '</td></tr>';
			})
          }
          document.getElementById('data').innerHTML = temp;
        }
    })
})