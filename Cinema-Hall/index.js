//fetches data from the db.json
function fetchData() {
  fetch("http://127.0.0.1:5501/db.json")
    .then((response) => response.json())
    .then(data => {appendFirstMovie(data)});
}
fetchData();

//append first movie when the page loads
function appendFirstMovie(data) {
  let first = data.films[0];
  let butonn = document.getElementById("button");
  butonn.innerHTML = "";
  let image = document.getElementById("pic");
  let title = document.getElementById("title");
  let runtime = document.getElementById("runtime");
  let showtime = document.getElementById("showtime");
  let tickets = document.getElementById("tickets");
  let description = document.getElementById("description");
  let button = document.createElement("button");
  button.id = "btn";
  button.textContent = "Buy Ticket";
  button.addEventListener("click", () => {
     first.tickets_sold += 1;
    // handleBuying(first)
    let total = first.capacity - first.tickets_sold;
    if (first.tickets_sold < first.capacity) {
      document.getElementById("tickets").innerHTML = total;
    }
    else if (first.tickets_sold = first.capacity) {
      document.getElementById("tickets").innerHTML = "*No tickets available";
      // handleBuying(first)
    }
  });
  title.textContent = first.title;
  runtime.textContent = first.runtime;
  showtime.textContent = first.showtime;
  tickets.textContent = first.capacity - first.tickets_sold;
  description.textContent = first.description;
  image.src = `
    ${first.poster}
    `;
  butonn.appendChild(button);
}

//fetches list of movies in the menu section
function appendMenu() {
  fetch("http://127.0.0.1:5501/db.json")
    .then((response) => response.json())
    .then((data) => menuTitles(data));
}
appendMenu();

//Displays menu titles on the menu section
function menuTitles(data) {
  data.films.forEach((item) => {
    let title = document.createElement("li");
    title.id = "list";
    title.addEventListener("click", () => {
      const i = item.id;
      appendIndividualDetails(data.films[i - 1]);
    });
    let menu = document.getElementById("menu");
    title.textContent = item.title;
    menu.appendChild(title);
  });
}

//appends details of the specific name that is clicked on the
function appendIndividualDetails(item) {
  let butonn = document.getElementById("button");
  butonn.innerHTML = "";
  let image = document.getElementById("pic");
  let title = document.getElementById("title");
  let runtime = document.getElementById("runtime");
  let showtime = document.getElementById("showtime");
  let tickets = document.getElementById("tickets");
  let description = document.getElementById("description");
  let button = document.createElement("button");
  button.id = "btn";
  button.textContent = "Buy Ticket";
  let total = item.capacity - item.tickets_sold;
  //adds button for buying tickets.
  button.addEventListener("click", () => {
    //if tickets available is greater than 0 the total amount decreses by one every time it is pressed otherwise it prints a message
    item.tickets_sold += 1;
    // handleBuying(item)
    let total = item.capacity - item.tickets_sold;
    if (item.tickets_sold < item.capacity) {
      document.getElementById("tickets").innerHTML = total;
    }
    else if (item.tickets_sold = item.capacity) {
      document.getElementById("tickets").innerHTML = "*No tickets available";
      // handleBuying(item)
    }
  });

  title.textContent = item.title;
  runtime.textContent = item.runtime;
  showtime.textContent = item.showtime;
  tickets.textContent = item.capacity - item.tickets_sold;
  description.textContent = item.description;
  image.src = `
    ${item.poster}
    `;
  butonn.appendChild(button);
}
