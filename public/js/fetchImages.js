// call unsplash api
const tripLocations = document.querySelectorAll(".destination");

function getPhoto() {
  for (let i = 0; i < tripLocations.length; i++) {
    const specificLocation = tripLocations[i].innerHTML;
    fetch(
      `https://api.unsplash.com/search/photos?page=2&query=${specificLocation}&per_page=24`,
      {
        headers: {
          Authorization:
            "Client-ID j6cJTd3RyKJW1iISoJEHKwHS841Xp1rzQDxUJOQjCjg",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // default photo if search comes back null
        if (typeof data.results[0] === "undefined") {
          const photoContainer = document.getElementById(specificLocation);
          const newPhoto = document.createElement("img");
          newPhoto.setAttribute(
            "src",
            "https://images.unsplash.com/photo-1437846972679-9e6e537be46e?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDYyODl8MHwxfHNlYXJjaHwyOHx8dHJhdmVsfGVufDB8fHx8MTYyNjI5ODE4Nw&ixlib=rb-1.2.1&q=85"
          );
          newPhoto.setAttribute("class", "destination-photo");
          photoContainer.append(newPhoto);
        } else {
          const photoContainer = document.getElementById(specificLocation);
          const newPhoto = document.createElement("img");
          newPhoto.setAttribute("src", data.results[0].urls.full);
          newPhoto.setAttribute("class", "destination-photo");
          photoContainer.append(newPhoto);
        }
      });
  }
}

getPhoto();
