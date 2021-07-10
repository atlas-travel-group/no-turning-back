const newFormHandler = async (event) => {
  event.preventDefault();

  const destination = document.querySelector("#destination").value.trim();
  const tripBudget = document.querySelector("#trip-budget").value.trim();
    const startDate = document.querySelector("#start-date").value.trim();
    const endDate = document.querySelector("#end-date").value.trim();

  if (destination && tripBudget && startDate && endDate) {
    const response = await fetch(`/api/tripRoutes`, {
      method: "POST",
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create project");
    }
  }
    
};

document
  .querySelector(".new-trip-form")
  .addEventListener("submit", newFormHandler);