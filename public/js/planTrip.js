const newFormHandler = async (event) => {
  event.preventDefault();

  const destination = document.querySelector("#destination").value.trim();
  const tripBudget = document.querySelector("#trip-budget").value.trim();
  const startDate = document.querySelector("#start-date").value.trim();
  const endDate = document.querySelector("#end-date").value.trim();

  if (destination && tripBudget && startDate && endDate) {
    const response = await fetch(`/api/trips`, {
      method: "POST",
      body: JSON.stringify({ destination, tripBudget, startDate, endDate }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/upcoming-trips");
    } else {
      alert("Failed to create trip");
    }
  }
};

document
  .querySelector(".new-trip-form")
  .addEventListener("submit", newFormHandler);
