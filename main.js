const peopleButton = document.getElementsByTagName("button"),
    nameHeading = document.getElementById("nameHeading"),
    bioInfo = document.getElementById("bioInfo"),
    li = document.createElement("li")
const list = document.createElement('ul')

function myFunc(id) {
    switch (id) {
        case 'people':
            getPeopleData(id)
            break;
        case 'films':
            getFilmData(id)
        default:
            break;
    }
}

function getMovieData(title) {
    console.log("title", title)
}

function getBioData(name) {
    fetch(`https://swapi.dev/api/${name}`)
        .then((response) => response.json())
        .then((data) => {
            if (!data) {
                alert("We are having technical difficulties, please try again later.")
            }
            for (const key in data) {
                switch (key) {
                    case "name":
                        $(bioInfo).append(`<h1 class="text-warning">${data[key]}</h1>`)
                        break;
                    case "height":
                        $(bioInfo).append(`<h3 class="text-primary">${key}: ${data[key]}</h3>`)
                        break;
                    case "mass":
                        $(bioInfo).append(`<h3 class="text-primary">${key}: ${data[key]}</h3>`)
                        break;
                    case "hair_color":
                        $(bioInfo).append(`<h3 class="text-primary">${key}: ${data[key]}</h3>`)
                        break;
                    case "skin_color":
                        $(bioInfo).append(`<h3 class="text-primary">${key}: ${data[key]}</h3>`)
                        break;
                    case 'films':
                        const films = data[key]
                        $(list).append(`<h3 class="text-warning">Films</h3>`)
                        films.forEach(element => {
                            fetch(`https://swapi.dev/api/${element.slice(22)}`)
                                .then((response) => response.json())
                                .then((data) => {
                                    const title = data.url.slice(22)
                                    console.log("title", title)
                                    $(bioInfo).append(list)
                                    $(list).append(`<li><h3 class="text-primary">Title: <a href="#" class="text-danger" onclick="getMovieData(${title})">
                                        ${data.title}</a></h3></li`)
                                })
                        })
                        films.sort();
                    default:
                        break;
                }
            }
            nameHeading.replaceChildren()
        })
}

function getPeopleData(searchTerm) {
    fetch(`https://swapi.dev/api/${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
            if (!data) {
                alert("We are having technical difficulties, please try again later.")
            }
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    let element = data[key];
                    if (Array.isArray(element)) {
                        element.forEach(elem => {
                            names = document.createElement('button')
                            names.innerHTML = `${elem.name}`
                            names.classList.add('bg-dark', "mt-1", "col-3", "text-danger")
                            $("#nameHeading").append(names)
                            names.onclick = () => {
                                getBioData(elem.url.slice(22))
                            }
                        });
                    }
                }
            }
        })
    bioInfo.replaceChildren()
    list.replaceChildren()
}