const newFormHandler = async (event) => {
  event.preventDefault();

  const trip_location = document.querySelector("#destination").value.trim();
  const trip_budget = document.querySelector("#trip-budget").value.trim();
  const trip_date_start = document.querySelector("#start-date").value.trim();
  const trip_date_end = document.querySelector("#end-date").value.trim();

  if (trip_location && trip_budget && trip_date_start && trip_date_end) {
    const response = await fetch(`/api/trips`, {
      method: "POST",
      body: JSON.stringify({
        trip_location,
        trip_budget,
        trip_date_start,
        trip_date_end,
      }),
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
