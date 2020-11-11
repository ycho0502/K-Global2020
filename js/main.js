"use strict";

// Speaker popup modal

var speakerCard = document.querySelectorAll(".speaker__card");
var speakerimg = document.querySelectorAll(".speaker__img");
var speakerModal = document.querySelector(".speaker__modal");
var speakerModalButton = document.querySelector(".speaker__modal__closeButton");
var speakerCardFront = document.querySelector(".card__front");
var speakerCardBack = document.querySelector(".card__back");

// Init. category element
var smartAppliancesList = document.getElementById("cardList__smartAppliances");
var telecomunicateList = document.getElementById("cardList__telecomunications");
var biotechList = document.getElementById("cardList__biotech");
var securityList = document.getElementById("cardList__security");
var adasList = document.getElementById("cardList__adas");
var roboticsList = document.getElementById("cardList__robotics");
var itServiceList = document.getElementById("cardList__itServices");

// Init etc
var companyOverlay = document.getElementById("companyCardOverlay");
var speakerOverlay = document.getElementById("speakerOverlay");
var partnerPanel = document.querySelector(".partnerPanel");
var closeBtn = document.querySelector(".partnerPanel__closeBtn");

// Company by category
var smartAppliances = [];
var telecomunicate = [];
var biotech = [];
var security = [];
var adas = [];
var robotics = [];
var itService = [];

// Navbar TransperTransparencyancy
var navbar = document.querySelector("#navbar");
var navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", function () {
  if (window.scrollY > 5) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Toggle hamburger menu

var navbarMenu = document.querySelector(".navbar__menu");

var navbarToggleBtn = document.querySelector(".navbar__toggle-btn");

navbarToggleBtn.addEventListener("click", function () {
  navbarMenu.classList.toggle("open");
});

var subMenu = document.querySelector(".sub-menu");
var subMenuList = document.querySelector(".sub-menu__list");

subMenu.addEventListener("click", function () {
  subMenuList.classList.toggle("open");
});

//Fetching company data from json file
//Usually gives error unless json is provided from the server

if (smartAppliancesList !== null) {
  fetch("data/companies.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (companies) {
      //Categorize
      categorizeCompany(companies);

      //Alphabetize
      sortCompany();

      renderCompanies();
    })
    .catch(function (err) {
      console.error("Error fetching data");
      console.error(err);
    });
}

function categorizeCompany(companies) {
  var SMARTAPPLIANCES = "smart appliances";
  var TELECOMMUNICATE = "telecommunications";
  var BIOTECT = "biotech";
  var SECURITY = "security";
  var ADAS = "adas";
  var ROBOTICS = "robotics";
  var ITSERVICES = "it services";

  var company = companies.company;

  company.forEach(function (item) {
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
  smartAppliances.forEach(function (item) {
    var card = cardCreate(item);
    smartAppliancesList.appendChild(card);
  });
  telecomunicate.forEach(function (item) {
    var card = cardCreate(item);
    telecomunicateList.appendChild(card);
  });
  biotech.forEach(function (item) {
    var card = cardCreate(item);
    biotechList.appendChild(card);
  });
  security.forEach(function (item) {
    var card = cardCreate(item);
    securityList.appendChild(card);
  });
  adas.forEach(function (item) {
    var card = cardCreate(item);
    adasList.appendChild(card);
  });
  robotics.forEach(function (item) {
    var card = cardCreate(item);
    roboticsList.appendChild(card);
  });
  itService.forEach(function (item) {
    var card = cardCreate(item);
    itServiceList.appendChild(card);
  });
}

function cardCreate(item) {
  var card = document.createElement("li");
  card.classList.add("container__cardList__card");

  var cardImgContainer = document.createElement("div");
  cardImgContainer.classList.add("container__cardList__card__container");

  var cardImg = document.createElement("img");
  cardImg.classList.add("container__cardList__card__img");
  cardImg.src = item.logo;

  var cardTitle = document.createElement("div");
  cardTitle.classList.add("container__cardList__card__title");
  cardTitle.textContent = item.name;

  var hover = document.createElement("div");
  hover.classList.add("speaker__card__content__more");

  var hoverText = document.createElement("div");
  hoverText.classList.add("text");
  hoverText.textContent = "More Info";

  // Adding event listener for panel to popup when clicked
  card.addEventListener("click", function () {
    var panelLogo = document.querySelector(".partnerPanel__logo");
    panelLogo.src = "";
    openCompanyModal(item);
  });

  // closing panel when close button is clicked
  closeBtn.addEventListener("click", function () {
    closeCompanyModal();
  });

  // Closing panel when outside of the panel is also clicked
  companyOverlay.addEventListener("click", function () {
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
  var body = document.body;
  var panelLogo = document.querySelector(".partnerPanel__logo");
  panelLogo.src = item.panel;

  // Enable overlay
  companyOverlay.classList.add("active");

  // Enables panel
  partnerPanel.classList.add("active");

  // Disable scrolls other then modal
  document.querySelector("html").style.overflowY = "hidden";
  body.style.overflowY = "hidden";
}

function closeCompanyModal() {
  // Disables panel
  companyOverlay.classList.remove("active");
  partnerPanel.classList.remove("active");

  var body = document.body;
  body.style.position = "";
  body.style.overflowY = "";
  document.querySelector("html").style.overflowY = "";
}
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
speakerCard.forEach(function (card) {
  card.addEventListener("click", function (e) {
    // Speaker modal fillout
    var speakerName = document.querySelector(".speaker__modal__speakerName");
    var image = document.querySelector(".speaker__modal__img");
    var speakerTitle = document.querySelector(".speaker__modal__subTitle");
    var speakerDescription = document.querySelector(
      ".speaker__modal__description"
    );
    var linkedIn = document.querySelector(".speaker__modal__linkedin");
    var name = e.currentTarget.getAttribute("value");

    fetch("data/speakers.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (speaker) {
        // Initiating speaker modal from data
        speakerName.textContent = name;
        image.src = speaker[name].picture;
        speakerTitle.textContent = speaker[name].title;
        speakerDescription.textContent = speaker[name].description;
        linkedIn.href = speaker[name].linkedin;
      })
      .catch(function (err) {
        console.error("Error fetching data");
        console.error(err);
      });

    openSpeakerModal();
  });
});

speakerimg.forEach(function (img) {
  img.addEventListener("click", function (e) {
    // Speaker modal fillout
    var speakerName = document.querySelector(".speaker__modal__speakerName");
    var image = document.querySelector(".speaker__modal__img");
    var speakerTitle = document.querySelector(".speaker__modal__subTitle");
    var speakerDescription = document.querySelector(
      ".speaker__modal__description"
    );
    var linkedIn = document.querySelector(".speaker__modal__linkedin");
    var name = e.currentTarget.getAttribute("value");

    fetch("data/speakers.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (speaker) {
        // Initiating speaker modal from data
        speakerName.textContent = name;
        image.src = speaker[name].picture;
        speakerTitle.textContent = speaker[name].title;
        speakerDescription.textContent = speaker[name].description;
        linkedIn.href = speaker[name].linkedin;
      })
      .catch(function (err) {
        console.error("Error fetching data");
        console.error(err);
      });

    openSpeakerModal();
  });
});

if (speakerModalButton !== null) {
  speakerModalButton.addEventListener("click", function () {
    closeSpeakerModal();
  });
}

if (speakerOverlay !== null) {
  // Closing panel when outside of the panel is also clicked
  speakerOverlay.addEventListener("click", function () {
    closeSpeakerModal();
  });
}

function openSpeakerModal() {
  var body = document.body;
  // Enable overlay
  speakerOverlay.classList.add("active");

  // Enables modal
  speakerModal.classList.add("active");

  // Disable scrolls other then modal
  document.querySelector("html").style.overflowY = "hidden";
  body.style.overflowY = "hidden";
}

function closeSpeakerModal() {
  // Disables panel
  speakerOverlay.classList.remove("active");
  speakerModal.classList.remove("active");

  var body = document.body;
  body.style.position = "";
  body.style.overflowY = "";
  document.querySelector("html").style.overflowY = "";
}

// Enable animation after content loaded
if (speakerModal !== null) {
  speakerModal.style.transition = "900ms ease-in-out";
}

if (partnerPanel !== null) {
  partnerPanel.style.transition = "900ms ease-in-out";
}
