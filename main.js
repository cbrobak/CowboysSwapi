const peopleButton = document.getElementsByTagName("button"),
    nameHeading = document.getElementById("nameHeading"),
    bioInfo = document.getElementById("bioInfo"),
    list = document.createElement('ul'),
    films = "https://swapi.dev/api/films/"


String.prototype.capper = function () {
    let str = this;
    return str[0].toUpperCase() + str.slice(1)
};

function sorting(a, b) {
    return a - b
}

function myFunc(id) {
    switch (id) {
        case 'people':
            getPeopleData(id)
            break;
        case 'films':
            getFilmList(films)
        default:
            break;
    }
}

function getFilmList(url) {
    fetch(url)
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
                            title = document.createElement('button')
                            title.innerHTML = `${elem.title}`
                            title.classList.add("col-4", "offset-4")
                            $(bioInfo).append(title)
                            title.onclick = () => {
                                getMovieData(elem.url)
                            }
                        })
                    }
                }
            }
        })
}

function getMovieData(url) {
    list.replaceChildren()
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (!data) {
                alert("We are having technical difficulties, please try again later.")
            }
            for (const key in data) {

                switch (key) {
                    case "title":
                        $(bioInfo).append(`
                        <div class=" col-12"><h1 class="text-warning">${key.capper()}: ${data[key]}</h1></div>`)
                        break;
                    case "director":
                        $(bioInfo).append(`
                        <div class=" col-12"><h1 class="text-warning">${key.capper()}: ${data[key]}</h1></div>`)
                        break;
                    case "producer":
                        $(bioInfo).append(`
                            <div class=" col-12"><h1 class="text-warning">${key.capper()}: ${data[key]}</h1></div>`)
                        break;
                    case "characters":
                        $(bioInfo).append(`<h1 class="text-warning">Characters: `)
                        if (Array.isArray(data.characters)) {
                            data.characters.forEach(element => {
                                fetch(element)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        for (const key in data) {
                                            if (key === "name") {
                                                button = document.createElement('button')
                                                button.innerHTML = `${data.name}`
                                                $(list).append(button)
                                                $(bioInfo).append(list)
                                                button.onclick = () => {
                                                    getBioData(data.url.slice(22))
                                                }
                                            }

                                        }
                                    })
                            })
                        }
                        break;
                }
            }
        })
    bioInfo.replaceChildren()
}

function getBioData(name) {
    bioInfo.replaceChildren()
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
                        $(bioInfo).append(`<h3 class="text-warning">Films</h3>`)
                        films.forEach(element => {
                            fetch(element)
                                .then((response) => response.json())
                                .then((data) => {
                                    const button = document.createElement("button")
                                    button.classList.add("d-flex", "flex-column", "col-4", "offset-4")
                                    button.innerHTML = `${data.title}`
                                    $(list).append(button)
                                    $(bioInfo).append(list)
                                    button.onclick = () => {
                                        getMovieData(data.url)
                                    }
                                })
                        })
                        films.sort(sorting);
                    default:
                        break;
                }
            }
            list.replaceChildren()
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
                            names.classList.add("col-4", "offset-4")
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