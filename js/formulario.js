window.onload = async () => {
    let query = new URLSearchParams(location.search)

    if (!query.has("id")) {
        alert("necesito un Id")
        location.href = "http://127.0.0.1:5500/home.html"
    }

    const id = query.get("id")

    try {

        const selectGenres = document.getElementById("genre")

        const responseGenres = await fetch("http://localhost:3031/api/genres/")
        const resultGenres = await responseGenres.json()

        resultGenres.data.forEach(genre => {
            const option = document.createElement("option")
            option.textContent = genre.name

            option.setAttribute("value", genre.id)

            selectGenres.appendChild(option)

        });


        const response = await fetch("http://localhost:3031/api/movies/" + id)
        const result = await response.json()

        const { data, meta } = result;

        const inputTitle = document.getElementById("title")
        inputTitle.setAttribute("value", data.title)

        const inputRating = document.getElementById("rating")
        inputRating.setAttribute("value", data.rating)

        const inputAwards = document.getElementById("awards")
        inputAwards.setAttribute("value", data.awards)

        const inputRelease_date = document.getElementById("release_date")

        const result_date = result.data.release_date.split("T");

        inputRelease_date.setAttribute("value", result_date[0])

        const inputLength = document.getElementById("length")
        inputLength.setAttribute("value", data.length)

    } catch (error) {
        console.log(error);
    }

    const form = document.querySelector("form")
    const btnAgregar = document.getElementById("btn-agregar")
    const btnEnviar = document.getElementById("btn-enviar")    

    btnAgregar.addEventListener("click", () => {

        for (let i = 0; i < form.elements.length; i++) {
            form.elements[i].value = null
            
        }

        btnEnviar.textContent = "Guardar"
        query.set("edit", false)

    })

    form.addEventListener("submit", async function (e) {
        e.preventDefault()

        const endPoint = query.get("edit") == "true" ? `http://localhost:3031/api/movies/update/${id}` : `http://localhost:3031/api/movies/create`


        try {

            const response = await fetch(endPoint,{
                method :  query.get("edit") == "true" ? "PUT" : "POST",
                headers : {
                    "content-Type" : "application/json"
                },
                body : JSON.stringify({
                    title : this.elements[1].value,
                    rating : this.elements[2].value,
                    awards : this.elements[3].value,
                    release_date : this.elements[4].value,
                    length : this.elements[5].value,
                    genre_id : this.elements[6].value

                }) 
            })
           await response.json()

           Swal.fire({
            position: "center",
            icon: "success",
            title: "Cambios guardados",
            showConfirmButton: false,
            timer: 1500
          })
          
          setTimeout(() => {            
            location.href = "http://127.0.0.1:5500/home.html"
          }, 1500);



        } catch (error) {
            console.log(error);            
        }
    })

}