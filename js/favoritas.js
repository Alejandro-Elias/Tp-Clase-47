window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  try {

    let local = JSON.parse(localStorage.getItem("favorites22"))

    console.log(local);

    const response = await fetch("http://localhost:3031/api/movies")
    const result = await response.json()
    const { meta, data } = result

    if (local.length > 0) {
      data.filter(movie => local.includes(movie.id)).forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
    });
    } else {

      const vacio = document.getElementById("vacio");
      
      const h2 = document.createElement("h2");
      h2.textContent = "No hay peliculas para mostrar";
      vacio.appendChild(h2)
    }

    

    console.log(data);
  } catch (error) {

  }




  /** Codigo que debemos usar para mostrar los datos en el frontend*/
    /* let data = peliculas.data; */

   
  
};
