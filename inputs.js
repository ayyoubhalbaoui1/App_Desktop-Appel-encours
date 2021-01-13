var phoneno = document.querySelector('#phoneno'),
    dial = document.createElement('table');
dial.id = 'dial';

/* create dial screen */
for (var rowNum = 0; rowNum < 4; rowNum++) {
    var row = dial.insertRow(rowNum);
    for (var colNum = 0; colNum < 3; colNum++) {
        /* if last row */
        if (rowNum === 3) {
            cell = row.insertCell(colNum);
            cell.textContent = '*';
            cell.className = 'dialDigit';
            cell = row.insertCell(colNum);
            cell.textContent = '0';
            cell.className = 'dialDigit';
            cell = row.insertCell(colNum);
            cell.textContent = '#';
            cell.className = 'dialDigit';
            break;
        }
        cell = row.insertCell(colNum);
        cell.className = 'dialDigit';
        cell.textContent = ((colNum + 1) + (rowNum * 3)).toString();
    }
}

/* Add dial screen to the page */
document.querySelector('#dialWrapper').appendChild(dial);

/* Add click event to dial digits, to input no. from dial screen */
dialDigits = document.querySelectorAll('.dialDigit');
for (var i = 0; i < dialDigits.length; i++) {
    dialDigits[i].addEventListener('click', dialNumber);
}

function dialNumber() {
    var val = phoneno.value + this.textContent;
    if (val.length > 15) return false;
    validate(val);
    phoneno.value = val;

}

phoneno.addEventListener('keyup', function() {
    validate(this.value);
});

pattern = new RegExp("^(\\+\\d{1,2})?(\\d+\\-*\\d+)*$");

function validate(txt) {
    if (!pattern.test(txt) || txt.length < 8) {
        phoneno.style.border = '2px solid red';
        return false;
    } else
        phoneno.style.border = 'initial';
    return true;
}

/* Add click event to dial icon, to open-close the dial screen */
document.querySelector('#dialIcon').addEventListener('click', toggleDial);

function toggleDial() {
    dial.style.visibility = dial.style.visibility === 'hidden' || dial.style.visibility === '' ? 'visible' : 'hidden';
}