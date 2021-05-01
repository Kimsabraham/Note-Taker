const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");
const $updateBtn = $("#updateMe");

// keeps track of note in text area
let activeNote = {};

// retrieves notes from db
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

// saves note to db
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

// deletes notes from db
const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

//display active note otherwise display empty
const renderActiveNote = () => {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    // only true
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    // only false
    $noteTitle.val("");
    $noteText.val("");
  }
};

// update view based on saves notes
const handleNoteSave = function () {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// delete active note
const handleNoteDelete = function (event) {
  // click can only register inside button
  event.stopPropagation();

  const note = $(this).parent(".list-group-item").data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

