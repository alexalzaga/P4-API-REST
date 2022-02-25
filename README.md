# P4-API-REST
Práctica 4 de PAT

# Introducción
Este documento web funciona como una base de datos visual de Pokémon.

# Features
La página te permite seleccionar la generación de Pokémon que desees, y mostrar la información de todos los Pokémon introducidos en esa misma generación. Se mostrará la imagen, el nombre y las stats de los Pokémon, mostrando 20 por página, y permitiendo la paginación para mostrar los 20 siguientes/anteriores, con dos botones añadidos al final de la tabla.

En cuanto a los elementos incluidos, la página se ha diseñado con elementos de Bootstrap, incluye paginación y también un Spinner mientras se da el proceso de carga. Con el objetivo de mostrar los resultados al completo y no con la imagen aún cargando, se ha incluido un pequeño retardo a la hora de mostrarlos.

# Consideraciones
Previo a su uso, se ha probado la API en la home page de la misma, donde se ofrece un buscador para poder observar visualmente los resultados obtenidos de cada fetch: https://pokeapi.co/

En cuanto a los fetch empleados, el sistema de búsqueda es el siguiente: al seleccionar la opción de búsqueda, se recoge la generación seleccionada en el menú de filtros y se realiza un fetch para devolver la información sobre esa generación. De este resultado, se almacena en un vector los índices de los Pokémon introducidos en esa generación. Estos índices son únicos y son los usados para poder realizar el fetch individual de cada uno y obtener su información. Una vez obtenido este vector de índices, se realiza mediante un bucle los fetch de los primeros 20 índices, se espera a la confirmación de todos mediante Promise.all y se arrojan los resultados en la tabla. Los botones Next/Previous suman o restan 20 a una variable start, que es la que marca por dónde se empieza a contar en el vector de índices obtenido, haciendo así la paginación. Este vector de índices se guarda hasta que se realiza una nueva búsqueda.

# Link de entrada en la página: https://alexalzaga.github.io/P4-API-REST/
