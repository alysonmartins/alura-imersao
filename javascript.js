const input = document.getElementById('search');
const list = document.getElementById('result');

let data = [];


// initialDATA
window.addEventListener('DOMContentLoaded', async () => {
  list.innerHTML = "<h3>Digite algo para começar a pesquisa...</h3>";
  data = await loadData();
})

// Evento de input para pesquisa
input.addEventListener('input', () => {
  const searchTerm = input.value.toLowerCase().trim();
  if (searchTerm === '') {
    list.innerHTML = "<h3>Digite algo para começar a pesquisa...</h3>";
  } else {
    const filteredData = data.filter(item => `${item.nome.toLowerCase()}${item.resumo.toLowerCase()}${item.inventos}${item.nacionalidade.toLowerCase()}${item.anos_de_vida}${item.inventos.toString().toLowerCase()}`.includes(searchTerm));
    renderData(filteredData);
  }
});

async function loadData() {
  const response = await fetch('dados.json');
  return await response.json();
}


function renderData(data) {
  const resultados = document.getElementById('result');
  resultados.innerHTML = ''; // Limpa os resultados anteriores

  if (data == 0) {
    list.innerHTML = "<h3>Nada foi encontrado</h3>";
  } else {
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'item-resultado drop-shadow-2xl text-black';

      div.innerHTML = `
      <div class='flex items-center gap-2'>
      <h2>${item.nome}</h2>
      <a href=${item.wikipedia_url} target="_blank">(Ir Wikipedia 🔗)</a>
      </div>
        <p>Nacionalidade: ${item.nacionalidade}</p>
        <p class="descricao-meta">Resumo: ${item.resumo}</p>
        <p>${item.inventos}</p>
        <div class="flex">
          <span>Nacimento / Morte:</span>
          <p>⭐ ${item.anos_de_vida} ✝️</p>
        </div>
      `;

      resultados.appendChild(div);
    });
  }
}



