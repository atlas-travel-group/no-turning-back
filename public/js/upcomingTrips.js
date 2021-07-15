const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/trips/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/upcoming-trips");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector(".project-list")
    .addEventListener("click", delButtonHandler);
  
    