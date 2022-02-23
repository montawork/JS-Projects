// create new note
const addBtn = document.querySelector('.add');

const allNotes = JSON.parse(localStorage.getItem('notes'));
if (allNotes) {
  allNotes.forEach((note) => {
    createNote(note);
  });
}

addBtn.addEventListener('click', createNote);
function createNote(noteLS = '') {
  const note = document.createElement('div');
  //note.classList.add('notes');
  note.innerHTML = `
      <section class="notes">
        <div class="tools">
          <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="notes-body ${noteLS ? '' : 'hidden'}"></div>
        <textarea class="${noteLS ? 'hidden' : ''}"></textarea>
      </section>
      `;
  document.body.appendChild(note);
  // edit Note
  // select elements from html
  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const notesBody = note.querySelector('.notes-body');
  const textArea = note.querySelector('textarea');

  textArea.value = noteLS;
  notesBody.innerHTML = marked(noteLS);

  // events listener

  editBtn.addEventListener('click', (e) => {
    notesBody.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  deleteBtn.addEventListener('click', () => note.remove());

  textArea.addEventListener('input', (e) => {
    const { value } = e.target;
    notesBody.innerHTML = marked(value);
    updateLS();
  });
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea');
  const notes = [];
  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem('notes', JSON.stringify(notes));
}
