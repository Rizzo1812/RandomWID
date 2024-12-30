let words = [];
let usedWords = [];
let currentWord = null;

async function loadWords() {
  const response = await fetch('dataset.json');
  words = await response.json();
}

function generateWord() {
  if (words.length === 0) {
    alert('Tutte le parole sono state estratte!');
    return;
  }

  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words.splice(randomIndex, 1)[0]; // Rimuovi parola selezionata
  usedWords.push(currentWord);

  // Mostra la parola
  document.getElementById('word-display').textContent = currentWord;
}

function handleCorrect() {
  if (!currentWord) {
    alert('Nessuna parola da classificare!');
    return;
  }

  addToTable('correct-body', currentWord);
  currentWord = null;
  document.getElementById('word-display').textContent = 'Premi "Genera" per una nuova parola';
}

function handleWrong() {
  if (!currentWord) {
    alert('Nessuna parola da classificare!');
    return;
  }

  addToTable('wrong-body', currentWord);
  currentWord = null;
  document.getElementById('word-display').textContent = 'Premi "Genera" per una nuova parola';
}

function addToTable(tableId, word) {
  const tableBody = document.getElementById(tableId);
  const newRow = document.createElement('tr');
  const newCell = document.createElement('td');
  newCell.textContent = word;
  newRow.appendChild(newCell);
  tableBody.appendChild(newRow);
}

// Event listeners
document.getElementById('generate-btn').addEventListener('click', generateWord);
document.getElementById('correct-btn').addEventListener('click', handleCorrect);
document.getElementById('wrong-btn').addEventListener('click', handleWrong);

// Carica parole al caricamento della pagina
window.addEventListener('load', loadWords);
