const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('notes'); 
const notesList = document.getElementById('notes-list');
const saveButton = document.getElementById('save-button');
const clearNotesButton = document.getElementById('clear-notes-button');

function createNote(title, content) { 
  return {
    id: Date.now(),
    title: title,
    content: content
  };
}

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function addNote() {
  notes.push(createNote(noteTitle.value, noteContent.value));
  localStorage.setItem('notes', JSON.stringify(notes));
  render();
}

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  localStorage.setItem('notes', JSON.stringify(notes));
  render();
}

function clearNotes() {
  notes = [];
  localStorage.removeItem('notes');
  render();
}

function render() {
  notesList.innerHTML = notes.map(note => `
    <div class="note">
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="deleteNote(${note.id})">✕</button>
    </div>
  `).join('');
}

saveButton.addEventListener("click", () => {
  addNote();
});

clearNotesButton.addEventListener("click", () => {
  clearNotes();
});

render();