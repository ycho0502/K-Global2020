const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

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
const companyOverlay = document.getElementById("companyCardOverlay");
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

// Navbar scroll event
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

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

function cardCreate(item) {
  let card = document.createElement("li");
  card.classList.add("container__cardList__card");

  let cardImgContainer = document.createElement("div");
  cardImgContainer.classList.add("container__cardList__card__container");

  let cardImg = document.createElement("img");
  cardImg.classList.add("container__cardList__card__img");
  cardImg.src = item.logo;

  let cardTitle = document.createElement("div");
  cardTitle.classList.add("container__cardList__card__title");
  cardTitle.textContent = item.name;

  let hover = document.createElement("div");
  hover.classList.add("speaker__card__content__more");

  let hoverText = document.createElement("div");
  hoverText.classList.add("text");
  hoverText.textContent = "More Info";

  // Adding event listener for panel to popup when clicked
  card.addEventListener("click", () => {
    openCompanyModal(item);
  });

  // closing panel when close button is clicked
  closeBtn.addEventListener("click", () => {
    closeCompanyModal();
  });

  // Closing panel when outside of the panel is also clicked
  companyOverlay.addEventListener("click", () => {
    closeCompanyModal(item);
  });

  hover.appendChild(hoverText);
  cardImgContainer.appendChild(cardImg);
  card.appendChild(cardImgContainer);
  card.appendChild(cardTitle);
  card.appendChild(hover);

  return card;
}

function openCompanyModal(item) {
  let panelLogo = document.querySelector(".partnerPanel__logo");
  panelLogo.src = item.panel;

  // Enable overlay
  companyOverlay.classList.add("active");

  // Enables panel
  partnerPanel.classList.add("active");
}

function closeCompanyModal() {
  // Disables panel
  companyOverlay.classList.remove("active");
  partnerPanel.classList.remove("active");
}
