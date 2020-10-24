// Init. category element
const smartAppliancesList = document.getElementById(
  "cardList__smartAppliances"
);
const telecomunicateList = document.getElementById(
  "cardList__telecomunications"
);
const biotechList = document.getElementById("cardList__biotech");
const securityList = document.getElementById("cardList__security");
const adasList = document.getElementById("cardList__adas");
const roboticsList = document.getElementById("cardList__robotics");
const itServiceList = document.getElementById("cardList__itServices");

// Init etc
const overlay = document.getElementById("overlay");
const panelLogo = document.querySelector(".partnerPanel__logo");
const partnerPanel = document.querySelector(".partnerPanel");
const closeBtn = document.querySelector(".partnerPanel__closeBtn");

// Company by category
const smartAppliances = [];
const telecomunicate = [];
const biotech = [];
const security = [];
const adas = [];
const robotics = [];
const itService = [];
//===================================================================================================

//Fetching company data from json file
//Usually gives error unless json is provided from the server
fetch("data/companies.json")
  .then((response) => response.json())
  .then((companies) => {
    //Categorize
    categorizeCompany(companies);

    //Alphabetize
    sortCompany();

    renderCompanies();
  })
  .catch((err) => {
    console.error("Error fetching data");
    console.error(err);
  });

//===================================================================================================

function categorizeCompany(companies) {
  const SMARTAPPLIANCES = "smart appliances";
  const TELECOMMUNICATE = "telecommunications";
  const BIOTECT = "biotech";
  const SECURITY = "security";
  const ADAS = "adas";
  const ROBOTICS = "robotics";
  const ITSERVICES = "it services";

  let company = companies.company;

  company.forEach((item) => {
    if (item.category === SMARTAPPLIANCES) {
      smartAppliances.push(item);
    } else if (item.category === TELECOMMUNICATE) {
      telecomunicate.push(item);
    } else if (item.category === BIOTECT) {
      biotech.push(item);
    } else if (item.category === SECURITY) {
      security.push(item);
    } else if (item.category === ADAS) {
      adas.push(item);
    } else if (item.category === ROBOTICS) {
      robotics.push(item);
    } else if (item.category === ITSERVICES) {
      itService.push(item);
    }
  });
}
function sortCompany() {
  smartAppliances.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  telecomunicate.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  biotech.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  security.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  adas.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  robotics.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  itService.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
}
// Populating company cards
function renderCompanies() {
  // const biotech = biotechList
  // const security = securityList
  // const adas = adasList
  // const robotics = roboticsList
  // const itService = itServiceList
  smartAppliances.forEach((item) => {
    let card = cardCreate(item);
    smartAppliancesList.appendChild(card);
  });
  telecomunicate.forEach((item) => {
    let card = cardCreate(item);
    telecomunicateList.appendChild(card);
  });
  biotech.forEach((item) => {
    let card = cardCreate(item);
    biotechList.appendChild(card);
  });
  security.forEach((item) => {
    let card = cardCreate(item);
    securityList.appendChild(card);
  });
  adas.forEach((item) => {
    let card = cardCreate(item);
    adasList.appendChild(card);
  });
  robotics.forEach((item) => {
    let card = cardCreate(item);
    roboticsList.appendChild(card);
  });
  itService.forEach((item) => {
    let card = cardCreate(item);
    itServiceList.appendChild(card);
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
