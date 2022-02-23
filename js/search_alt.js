
const cButton = document.getElementById("search-form");
var pokemon = [];
var datos = [];
var urls = [];
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
		for (var i = 0; i < pokemon.results.length; i++) {
          	var parts = pokemon.results[i].url.split("/pokemon/");
          	var index = parts[1].substr(0,parts[1].length - 1);
          	var pokeData = "https://pokeapi.co/api/v2/pokemon/" + index;
          	urls[i] = pokeData;
          }

        let requests = urls.map(url=>fetch(url));

        Promise.all(requests)
			.then(responses => {
				for(let response of responses) {
			      console.log("fetch2OK");
			    }
			    return responses;
			})

			.then(responses => Promise.all(responses.map(r => r.json())))

			.then(r2 => {
				datos=r2;
				if (datos.length > 0) {
		          var temp = '';
		          for (var i = 0; i < datos.length; i++) {
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
        		document.getElementById('data').innerHTML = temp;
        		document.getElementById('tabla').style.visibility = "visible";
          }
      	})
      
    })      	   
})

