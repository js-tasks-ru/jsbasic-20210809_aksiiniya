function highlight(table) {

  for (let i = 0; i < table.rows.length; i++) {
    //*choose all fourth cells in each row with status
    let statusCells = table.rows[i].cells[3];

    //*if data-available ===  add class 'available'
    if (statusCells.dataset.available === "true") {
      table.rows[i].classList.add('available');
      //*if data-available === false add class 'unavailable'
    } else if (statusCells.dataset.available === "false") {
      table.rows[i].classList.add('unavailable');
      //*check if there keyword 'available' in datasets, set attribute 'hidden '
    } else if (!('available' in statusCells.dataset)) {
      table.rows[i].setAttribute('hidden', 'hidden');
    }
    //*choose all third cells in each row with gender
    let genderCells = table.rows[i].cells[2];
    //*add class to gender cell in dependence of it textContent
    if (genderCells.textContent === "m") {
      table.rows[i].classList.add('male');
    } else if (genderCells.textContent === "f") {
      table.rows[i].classList.add('female');
    }
    //*choose all second cells in each row with age
    let ageCells = table.rows[i].cells[1];
    //*add styles if textContent < 18
    if (ageCells.textContent < '18') {
      table.rows[i].style.textDecoration = 'line-through';
    }
  }

}
