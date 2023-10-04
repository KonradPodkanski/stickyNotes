const addNoteBtn = document.querySelector(".add");
const delAllBtn = document.querySelector(".delete-all");
const noteArea = document.querySelector(".note-area");
const notePanel = document.querySelector(".note-panel");
const typeOfNote = document.querySelector("#category");
const content = document.querySelector("#text");
const error = document.querySelector(".error");
let cardID = 1;
let valueOfCategory;

const showEditor = () => {
	notePanel.style.display = "block";
};
const makeNote = () => {
	const note = document.createElement("div");
	const header = document.createElement("div");
	const body = document.createElement("div");
	const title = document.createElement("h3");
	const canelBtn = document.createElement("button");
	const icon = document.createElement("i");
	valueOfCategory = typeOfNote.options[typeOfNote.selectedIndex].text;

	note.setAttribute("id", cardID);
	note.classList.add("note");
	header.classList.add("note-header");
	body.classList.add("note-body");
	title.classList.add("note-title");
	canelBtn.classList.add("delete-note");
	icon.classList.add("fas", "fa-times", "icon");

	body.textContent = content.value;
	title.textContent = `${valueOfCategory} #${cardID}`;

	checkColor(note);
	canelBtn.appendChild(icon);
	header.append(title, canelBtn);
	note.append(header, body);
	noteArea.appendChild(note);
	cardID++;
};
const setPresets = () => {
	error.style.visibility = "hidden";
	error.textContent = "";
	notePanel.style.display = "none";
	content.value = "";
	typeOfNote.selectedIndex = 0;
};
const checkError = () => {
	if (content.value === "" || typeOfNote.value === 0) {
		error.style.visibility = "visible";
		error.textContent = "Uzupełnij wszystkie pola!";
	} else {
		makeNote();
		setPresets();
	}
};
const editorEvents = e => {
	if (e.target.classList.contains("cancel")) {
		setPresets();
	}
	if (e.target.classList.contains("save")) {
		checkError();
	}
};

const removeAllNotes = () => {
	while (noteArea.firstChild) {
		noteArea.removeChild(noteArea.firstChild);
	}
	cardID = 1;
};
const removeNote = e => {
	if (e.target.classList.contains("fas", "fa-times", "icon")) {
		e.target.closest(".note").remove();
	}
};
const checkColor = note => {
	switch (valueOfCategory) {
		case "Zakupy":
			note.style.backgroundColor = "rgb(72,255,0)";
			break;
		case "Praca":
			note.style.backgroundColor = "rgb(169, 95, 170)";
			break;
		case "Inne":
			note.style.backgroundColor = "rgb(64, 85, 170)";
			break;
	}
};
addNoteBtn.addEventListener("click", showEditor);
notePanel.addEventListener("click", editorEvents);
noteArea.addEventListener("click", removeNote);
delAllBtn.addEventListener("click", removeAllNotes);
