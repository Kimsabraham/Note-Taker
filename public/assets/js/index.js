var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// tracks note in textarea
var activeNote = {};

// gets notes from db
var getNotes = function () {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

// save notes
var saveNote = function (note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

// delets note from db
var deleteNote = function (id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};


// displays active note otherwise display empty
var renderActiveNote = function () {
  $saveNoteBtn.hide();

  if (typeof activeNote.id === "number") {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// saves to db
var handleNoteSave = function () {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };

  saveNote(newNote);
  getAndRenderNotes();
  renderActiveNote();
};

// delete note
var handleNoteDelete = function (event) {
  //keeps click inside button only
  event.stopPropagation();

  var note = $(this).data("id");

  if (activeNote.id === note) {
    activeNote = {};
  }

  deleteNote(note);
  getAndRenderNotes();
  renderActiveNote();
};

// displays active note
var handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};

//render a new note
var handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};

// save button displays when title has input
var handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// displays list of notes
var renderNoteList = function (notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    $li.data("id", i);

    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note' data-id=" +
        i +
        ">"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// display notes on sideview
var getAndRenderNotes = function () {
  return getNotes().then(function (data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// calls and render notes
getAndRenderNotes();
