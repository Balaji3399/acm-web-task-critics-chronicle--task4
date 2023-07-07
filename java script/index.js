const tableBody = document.getElementById('tableBody');
const paginationContainer = document.getElementById('pagination');

const apiUrls = [
  'https://opencritic-api.p.rapidapi.com/game/463',
  'https://opencritic-api.p.rapidapi.com/game/1557',
  'https://opencritic-api.p.rapidapi.com/game/12919',
  'https://opencritic-api.p.rapidapi.com/game/188',
  'https://opencritic-api.p.rapidapi.com/game/4502'
  
];

const images = [
  'css/images/image 5.jpeg',
  'css/images/image 2.jpeg',
  'css/images/image 3.jpeg',
  'css/images/image 4.jpeg',
  'css/images/image 1.jpeg',
];

const itemsPerPage = 1;
let currentPage = 1;
async function fetchAndDisplayGameData(apiUrl, imageUrl) {
  
  const options = {
    
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '57061c4a5emshca7d5fba5484ae7p1c2e6bjsn5bb946e58648',
      'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
      
    }
  };

  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = data.name;
    row.appendChild(nameCell);

    const imageCell = document.createElement('td');
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageCell.appendChild(imageElement);
    row.appendChild(imageCell);

    const reviewCell = document.createElement('td');
    reviewCell.textContent = data.topCriticScore;
    row.appendChild(reviewCell);

    const genreCell = document.createElement('td');
    genreCell.textContent = data.Genres[0].name;
    row.appendChild(genreCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = data.description;
    row.appendChild(descriptionCell);

    tableBody.appendChild(row);
  } catch (error) {
    console.error(error);
  }
}

function displayPagination() {
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(apiUrls.length / itemsPerPage);

  for (let page = 1; page <= totalPages; page++) {
    const button = document.createElement('button');
    button.textContent = page;
    button.addEventListener('click', () => {
      currentPage = page;
      renderTable();
    });
    paginationContainer.appendChild(button);
  }
}


function renderTable() {
  tableBody.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const gamesToDisplay = apiUrls.slice(startIndex, endIndex);

  gamesToDisplay.forEach((apiUrl, index) => {
    const imageUrl = images[startIndex + index];
    fetchAndDisplayGameData(apiUrl, imageUrl);
  });
displayPagination();
}

renderTable();