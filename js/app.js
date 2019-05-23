const employeeList = document.getElementById('employees');
const wrapper = document.getElementsByClassName('wrapper')[0];
const search = document.getElementById('mySearch');

function createCard(data) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.id = data.login.username;
  card.innerHTML = `<img src="${data.picture.large}">
  <div class="card-text">
    <h2 class="name">${data.name.first} ${data.name.last}</h2>
    <span class="email">${data.email}</span>
    <span class="city">${data.location.city}</span>
  </div>`;
  employeeList.appendChild(card);
}

function createModal(data) {
  let newModal = document.createElement('div');
  newModal.classList.add('modal');
  newModal.innerHTML = `<div class="modal-content">
    <span class="close">&times;</span>
    <img src="${data.picture.large}">
    <div class="arrows">
      <span class="prev">&#9668;</span>
      <span class="next">&#9658;</span>
    </div>
    <div class="modal-text">
      <h2>${data.name.first} ${data.name.last}</h2>
      <p>${data.email}</p>
      <p class="city">${data.location.city}</p>
    </div>
    <div class="modal-contact">
      <p>${data.cell}</p>
      <p class="city">${data.location.street}, ${data.location.state} ${data.location.postcode}</p>
      <p>Birthday: ${data.dob.date.replace(/T.*/,'').split('-').reverse().join('/')}</p>
    </div>
  </div>`;
  wrapper.appendChild(newModal);
}

const url = 'https://randomuser.me/api/?results=12&nat=au';
fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    let employees = data.results;
    return employees.map(function(employee) {
      createCard(employee);
      createModal(employee);
    });
  })
  .catch(function(error) {
  console.log(error);
});

// Modal functionality

wrapper.addEventListener('click', (e) => {
  let card = document.querySelectorAll('.card');
  let modal = document.querySelectorAll('.modal');
  let close = document.querySelectorAll('.close');
  let next = document.querySelectorAll('.next');
  let prev = document.querySelectorAll('.prev');
  for (i = 0; i < card.length; i++) {
    if (e.target === card[i]) {
      modal[i].style.display = 'block';
      if (card[0]) {
        prev[0].style.visibility = 'hidden';
        if (card[card.length - 1]) {
          next[next.length - 1].style.visibility = 'hidden';
        }
      } 
    } else if (e.target === modal[i] || e.target === close[i]) {
      modal[i].style.display = 'none';
    } else if (e.target === next[i]) {
      modal[i].style.display = 'none';
      modal[i+1].style.display = 'block';
    } else if (e.target === prev[i]) {
      modal[i].style.display = 'none';
      modal[i-1].style.display = 'block';
    }
  }
});

search.addEventListener('keyup', () => {
  let searchVal = search.value.toLowerCase();
  let nameItems = document.querySelectorAll('h2.name'); //get name by nameItems[i].innerText
  let cards = document.querySelectorAll('.card'); // get id by searching cards[i].id

  for (i = 0; i < cards.length; i++) {
    let id = cards[i].id;
    let name = nameItems[i].innerText.toLowerCase();
    if (id.indexOf(searchVal) > -1 || name.indexOf(searchVal) > -1 ){
      cards[i].style.display = 'flex';
    } else {
      cards[i].style.display = 'none';
    }
  }
});