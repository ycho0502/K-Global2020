const overlay = document.getElementById("overlay");
const panelLogo = document.querySelector(".partnerPanel__logo");
const partnerPanel = document.querySelector(".partnerPanel");
const closeBtn = document.querySelector(".partnerPanel__closeBtn");

//Fetching company data from json file
//Usually gives error unless json is provided from the server
fetch("data/companies.json")
  .then((response) => response.json())
  .then((companies) => renderCompanies(companies))
  .catch((err) => {
    console.error("Error fetching data");
    console.error(err);
  });

// Populating company cards
function renderCompanies(companies) {
  let company = companies.company;
  const cards = document.querySelector(".container__cardList");

  company.forEach((item) => {
    let card = cardCreate(item);
    cards.appendChild(card);
  });
}

// Creates <li> <img src="*src*"> </li>
function cardCreate(item) {
  let card = document.createElement("li");
  card.classList.add("container__cardList__card");

  let cardImg = document.createElement("img");
  cardImg.classList.add("container__cardList__card__img");
  cardImg.src = item.logo;

  let cardTitle = document.createElement("div");
  cardTitle.classList.add("container__cardList__card__title");
  cardTitle.textContent = item.name;

  // Adding event listener for panel to popup when clicked
  card.addEventListener("click", () => {
    openPanel(item);
  });

  // closing panel when close button is clicked
  closeBtn.addEventListener("click", () => {
    closePanel(item);
  });

  // Closing panel when outside of the panel is also clicked
  overlay.addEventListener("click", () => {
    closePanel(item);
  });

  card.appendChild(cardImg);
  card.appendChild(cardTitle);

  return card;
}

function openPanel(item) {
  // const header = document.querySelector(".partnerPanel__header");
  // let imgContainer = document.querySelector(".partnerPanel__imgContainer");
  let panelLogo = document.querySelector(".partnerPanel__logo");
  panelLogo.src = item.panel;

  // let panelDescription = document.querySelector(".partnerPanel__content");
  // panelDescription.textContent = item.description;

  // imgContainer.appendChild(panelLogo);
  // header.appendChild(imgContainer);
  // header.appendChild(panelDescription);

  // Enable overlay
  overlay.classList.add("active");

  // Enables panel
  partnerPanel.classList.add("active");
}

function closePanel(item) {
  // Disables panel
  overlay.classList.remove("active");
  partnerPanel.classList.remove("active");
}
