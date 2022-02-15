const sidebarElement = document.querySelector('#sidebar')
const currentCardElement = document.querySelector('#current-card')


function fetchData(url, method, callback) {
  const xhr = new XMLHttpRequest()

  xhr.open(method, url)

  xhr.onload = () => {
    if(xhr.status == '200') {
      callback(xhr.response)
    }
  }

  xhr.onerror = () => {
    console.error(xhr.status + ' ' + xhr.statusText);
  }

  xhr.send()
}

function templateCard({ username, email, id }) {
  return `
    <div class="card sidebar-card" style="width: 18rem; margin: 10px;" data-id=${id}>
      <div class="card-body">
        <h4>${username}</h4>
        <p class="card-text">${email}</p>
      </div>
    </div> 
  `
}

function templateCurrentCard({username, email, address: {street, suite, city}, phone, company: {name, catchPhrase}}) {
  return `
    <div class="card" style="width: 20rem; margin: 10px;">
      <div class="card-body">
        <h2>${username}</h2>
        <p class="card-text" "font-size: 20px">${email}</p>
        <p class="card-text-current" "font-size: 16px">Street: ${street}</p>
        <p class="card-text-current" "font-size: 16px">Suite: ${suite}</p>
        <p class="card-text-current" "font-size: 16px">City: ${city}</p>
        <p class="card-text-current" "font-size: 16px">Phone Number: ${phone}</p>
        <p class="card-text-current" "font-size: 16px">Company: ${name}</p>
        <p class="card-text-current" "font-size: 16px">Catch Phrase: ${catchPhrase}</p>
      </div>
    </div>
  `
}

function handleTemplateCard(event) {
  event.stopPropagation();
  event.preventDefault();

  const id = event.currentTarget.getAttribute("data-id");

  fetchData(`https://jsonplaceholder.typicode.com/users/${id}`, 'GET', (response) => {
    const data = JSON.parse(response)
    currentCardElement.innerHTML = templateCurrentCard(data);
  })

}

fetchData('https://jsonplaceholder.typicode.com/users', 'GET', (response) => {
  const data = JSON.parse(response)

  data.forEach((item) => {
    sidebarElement.innerHTML += templateCard(item)
  })

  const sidebarCardElements = sidebarElement.querySelectorAll('.sidebar-card');

  sidebarCardElements.forEach(item => item.addEventListener('click', handleTemplateCard))
})
