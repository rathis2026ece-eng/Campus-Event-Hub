const events = [
  {
    id: 1,
    name: "Technical Symposium",
    date: "10 December 2026",
    time: "10:00 AM",
    place: "College Auditorium"
  },
  {
    id: 2,
    name: "Coding Competition",
    date: "15 December 2026",
    time: "11:00 AM",
    place: "Computer Lab"
  },
  {
    id: 3,
    name: "Cultural Fest",
    date: "20 December 2026",
    time: "4:00 PM",
    place: "College Ground"
  },
  {
    id: 4,
    name: "Project Exhibition",
    date: "22 December 2026",
    time: "9:30 AM",
    place: "Main Block"
  }
];

let registered = JSON.parse(
  localStorage.getItem("campusEvents") || "[]"
);

const eventList = document.getElementById("eventList");
const myEvents = document.getElementById("myEvents");
const search = document.getElementById("search");

function displayEvents(items) {
  eventList.innerHTML = "";

  if (items.length === 0) {
    eventList.innerHTML = "<p>No events found.</p>";
    return;
  }

  items.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    const title = document.createElement("h3");
    title.textContent = event.name;

    const date = document.createElement("p");
    date.textContent = "Date: " + event.date;

    const time = document.createElement("p");
    time.textContent = "Time: " + event.time;

    const place = document.createElement("p");
    place.textContent = "Place: " + event.place;

    const button = document.createElement("button");
    button.textContent = registered.includes(event.id)
      ? "Registered"
      : "Register";

    button.disabled = registered.includes(event.id);

    button.addEventListener("click", () => {
      registerEvent(event.id);
    });

    card.append(title, date, time, place, button);
    eventList.appendChild(card);
  });
}

function registerEvent(id) {
  if (!registered.includes(id)) {
    registered.push(id);
    localStorage.setItem(
      "campusEvents",
      JSON.stringify(registered)
    );
    displayEvents(events);
    displayMyEvents();
  }
}

function displayMyEvents() {
  myEvents.innerHTML = "";

  const selected = events.filter(event =>
    registered.includes(event.id)
  );

  if (selected.length === 0) {
    myEvents.innerHTML = "<li>No registrations yet.</li>";
    return;
  }

  selected.forEach(event => {
    const item = document.createElement("li");
    item.textContent = event.name + " - " + event.date;
    myEvents.appendChild(item);
  });
}

search.addEventListener("input", () => {
  const keyword = search.value.toLowerCase();

  const filtered = events.filter(event =>
    event.name.toLowerCase().includes(keyword)
  );

  displayEvents(filtered);
});

displayEvents(events);
displayMyEvents();