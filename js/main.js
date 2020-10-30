"use strict";

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

    openPanel();
  });
});

speakerModalButton.addEventListener("click", () => {
  closePanel();
});

// Closing panel when outside of the panel is also clicked
overlay.addEventListener("click", () => {
  closePanel();
});

function openPanel() {
  const body = document.body;
  // Enable overlay
  overlay.classList.add("active");

  // Enables modal
  speakerModal.classList.add("active");

  // Disable scrolls other then modal
  body.style.height = "100vh";
  body.style.overflowY = "hidden";
}

function closePanel() {
  // Disables panel
  overlay.classList.remove("active");
  speakerModal.classList.remove("active");

  const body = document.body;
  body.style.position = "";
  body.style.top = "";
  body.style.height = "";
  body.style.overflowY = "";
}
