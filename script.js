let words = [];
let usedWords = [];
let currentWord = null;

async function loadWords() {
  try {
    const response = await fetch('dataset.json');
    if (!response.ok) {
      throw new Error('Errore nel caricamento del dataset.');
    }
    words = await response.json();
  } catch (error) {
    console.error('Errore:', error);
    alert('Impossibile caricare il dataset delle parole. Controlla il file dataset.json.');
  }
}

function generateWord() {
  if (words.length === 0) {
    alert('Tutte le parole sono state estratte!');
    currentWord = null;
    document.getElementById('word-display').textContent = 'Nessuna parola disponibile.';
    return;
  }

  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words.splice(randomIndex, 1)[0]; // Rimuovi parola selezionata
  usedWords.push(currentWord);

  // Mostra la parola
  const wordDisplay = document.getElementById('word-display');
  wordDisplay.textContent = currentWord;
  wordDisplay.classList.add('active');

  setTimeout(() => wordDisplay.classList.remove('active'), 300);
}

function handleCorrect() {
  if (!currentWord) {
    alert('Nessuna parola da classificare!');
    return;
  }

  addToTable('correct-body', currentWord);
  generateWord(); // Genera una nuova parola
}

function handleWrong() {
  if (!currentWord) {
    alert('Nessuna parola da classificare!');
    return;
  }

  addToTable('wrong-body', currentWord);
  generateWord(); // Genera una nuova parola
}

function addToTable(tableId, word) {
  const tableBody = document.getElementById(tableId);
  const newRow = document.createElement('tr');
  const newCell = document.createElement('td');
  newCell.textContent = word;
  newRow.appendChild(newCell);
  tableBody.appendChild(newRow);
}

let timer = 120;
let timerInterval = null;
let isRunning = false;

// Aggiorna il display del timer
function updateTimerDisplay() {
  document.getElementById('timer-display').textContent = timer;
}

// Gestisci avvio/pausa del timer
function toggleTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    document.getElementById('start-pause-btn').textContent = 'Avvia';
  } else {
    timerInterval = setInterval(() => {
      if (timer > 0) {
        timer--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
        document.getElementById('start-pause-btn').textContent = 'Avvia';
        alert('Tempo scaduto!');
      }
    }, 1000);
    isRunning = true;
    document.getElementById('start-pause-btn').textContent = 'Pausa';
  }
}

// Aggiungi 5 secondi
function addTime() {
  timer += 5;
  updateTimerDisplay();
}

// Rimuovi 5 secondi
function removeTime() {
  if (timer > 5) {
    timer -= 5;
  } else {
    timer = 0;
  }
  updateTimerDisplay();
}

// Event listeners per i pulsanti del timer
document.getElementById('start-pause-btn').addEventListener('click', toggleTimer);
document.getElementById('add-time-btn').addEventListener('click', addTime);
document.getElementById('remove-time-btn').addEventListener('click', removeTime);

// Inizializza il display del timer
updateTimerDisplay();


// Event listeners
document.getElementById('generate-btn').addEventListener('click', generateWord);
document.getElementById('correct-btn').addEventListener('click', handleCorrect);
document.getElementById('wrong-btn').addEventListener('click', handleWrong);

// Carica parole al caricamento della pagina
window.addEventListener('load', loadWords);
