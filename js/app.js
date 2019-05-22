const employeeList = document.getElementById('employees');
const wrapper = document.getElementsByClassName('wrapper')[0];


function createCard(data) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('card-username', data.login.username);
  card.innerHTML = `<img src="${data.picture.large}">
  <div class="card-text">
    <h2>${data.name.first} ${data.name.last}</h2>
    <span class="email">${data.email}</span>
    <span class="city">${data.location.city}</span>
  </div>`;
  employeeList.appendChild(card);
}

function createModal(data) {
  let newModal = document.createElement('div')
  newModal.classList.add('modal');
  newModal.setAttribute('modal-username', data.login.username);
  newModal.innerHTML = `<div class="modal-content">
    <span class="close">&times;</span>
    <img src="${data.picture.large}">
    <div class="modal-text">
      <h2>${data.name.first} ${data.name.last}</h2>
      <p>${data.email}</p>
      <p class="city">${data.location.city}</p>
    </div>
    <div class="modal-contact">
      <p>${data.cell}</p>
      <p>${data.location.street}</p>
      <p>Birthday: ${data.dob.date.replace(/T.*/,'').split('-').reverse().join('/')}</p>
    </div>
  </div>`
  wrapper.appendChild(newModal);
}

const url = 'https://randomuser.me/api/?results=12&nat=gb,au,ca,us';
fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    let employees = data.results;
    return employees.map(function(employee) {
      createCard(employee);
      createModal(employee);
    })
  })
  .catch(function(error) {
  console.log(error);
});

// Modal functionality

wrapper.addEventListener('click', (e) => {
  let card = document.querySelectorAll('.card');
  let modal = document.querySelectorAll('.modal');
  let close = document.querySelectorAll('.close');
  for (i=0; i < card.length; i++) {
    if (e.target === card[i]) {
      modal[i].style.display = 'block';
    } else if (e.target === modal[i] || e.target === close[i]) {
      modal[i].style.display = 'none';
    }
  }
});