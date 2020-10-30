"use strict";

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
const speakerOverlay = document.getElementById("speakerOverlay");
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

// Navbar TransperTransparencyancy
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

//Toggle hamburger menu

const navbarMenu = document.querySelector(".navbar__menu");

const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");

navbarToggleBtn.addEventListener("click", () => {
  console.log("ttt");
  console.log(navbarMenu);
  navbarMenu.classList.toggle("open");
});

const subMenu = document.querySelector(".sub-menu");
const subMenuList = document.querySelector(".sub-menu__list");

subMenu.addEventListener("click", () => {
  subMenuList.classList.toggle("open");
});

//Fetching company data from json file
//Usually gives error unless json is provided from the server

if (smartAppliancesList !== null) {
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
}
// fetch("data/companies.json")
//   .then((response) => response.json())
//   .then((companies) => {
//     //Categorize
//     categorizeCompany(companies);

//     //Alphabetize
//     sortCompany();

//     renderCompanies();
//   })
//   .catch((err) => {
//     console.error("Error fetching data");
//     console.error(err);
//   });

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

// Speaker popup modal
const speakerCard = document.querySelectorAll(".speaker__card");
const speakerModal = document.querySelector(".speaker__modal");
const speakerModalButton = document.querySelector(
  ".speaker__modal__closeButton"
);

speakerCard.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Speaker modal fillout
    let speakerName = document.querySelector(".speaker__modal__speakerName");
    let image = document.querySelector(".speaker__modal__img");
    let speakerTitle = document.querySelector(".speaker__modal__subTitle");
    let speakerDescription = document.querySelector(
      ".speaker__modal__description"
    );
    let linkedIn = document.querySelector(".speaker__modal__linkedin");
    let name = e.currentTarget.getAttribute("value");

    fetch("data/speakers.json")
      .then((response) => response.json())
      .then((speaker) => {
        // Initiating speaker modal from data
        speakerName.textContent = name;
        image.src = speaker[name].picture;
        speakerTitle.textContent = speaker[name].title;
        speakerDescription.textContent = speaker[name].description;
        linkedIn.href = speaker[name].linkedin;
      })
      .catch((err) => {
        console.error("Error fetching data");
        console.error(err);
      });

    openSpeakerModal();
  });
});

speakerModalButton.addEventListener("click", () => {
  closeSpeakerModal();
});

// Closing panel when outside of the panel is also clicked
speakerOverlay.addEventListener("click", () => {
  closeSpeakerModal();
});

function openSpeakerModal() {
  const body = document.body;
  // Enable overlay
  speakerOverlay.classList.add("active");

  // Enables modal
  speakerModal.classList.add("active");

  // Disable scrolls other then modal
  body.style.height = "100vh";
  body.style.overflowY = "hidden";
}

function closeSpeakerModal() {
  // Disables panel
  speakerOverlay.classList.remove("active");
  speakerModal.classList.remove("active");

  const body = document.body;
  body.style.position = "";
  body.style.top = "";
  body.style.height = "";
  body.style.overflowY = "";
}
