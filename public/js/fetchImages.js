// call unsplash or amadeus api
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
        if (typeof data.results[0] === "undefined") {
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
