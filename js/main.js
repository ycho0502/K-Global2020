'use strict'

// Navbar TransperTransparencyancy
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  // console.log(window.scrollY);
  // console.log(`navbarHeight: $(navbarHeight)`);
  if(window.scrollY > navbarHeight){
    navbar.classList.add('navbar--dark');
  }else{
    navbar.classList.remove('navbar--dark');
  }
});

//Toggle hamburger menu

const navbarMenu = document.querySelector('.navbar__menu');

const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');

navbarToggleBtn.addEventListener('click', ()=> {
  console.log('ttt');
  console.log(navbarMenu);
  navbarMenu.classList.toggle('open');


});


const subMenu = document.querySelector('.sub-menu');
const subMenuList = document.querySelector('.sub-menu__list');

subMenu.addEventListener('click', ()=>{

  subMenuList.classList.toggle('open');
});


