//Fetching company data from json file
//Usually gives error unless json is provided from the server
fetch("data/companies.json")
  .then((response) => response.json())
  .then((companies) => renderCompanies(companies))
  .catch((err) => {
    console.error("Error fetching data");
    console.error(err);
  });

function renderCompanies(companies) {
  let company = companies.company;
  const cards = document.querySelector(".container__cardList");

  // Populating company cards
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

  // onclick, might create seperate function...
  card.onclick = () => {
    alert(`${item.name} clicked`);
  };
  card.appendChild(cardImg);

  return card;
}
