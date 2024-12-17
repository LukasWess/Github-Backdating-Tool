const fs = require('fs');
const path = require('path');

// Path to the file you want to append to
const filePath = path.join(__dirname, './target.js');



function isHoliday(date) {
    const holidays = [
        '01-01', // New Year's Day
        '07-04', // Independence Day
        '12-25', // Christmas Day
        // Add more holidays as needed
    ];
    const formattedDate = ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    return holidays.includes(formattedDate);
}

function appendCode() {
    const pastDate = getRandomDate();

    const codeToAdd = `
// This is a new line of code
console.log('New line of code added at ' + '${pastDate.toISOString()}');
`;

    fs.appendFile(filePath, codeToAdd, (err) => {
        if (err) throw err;
        console.log('The code was appended to the file!');
    });
}
// Function to append a specific string every 10 seconds
function appendString() {
    const stringToAdd = `I will be a dev\n`;

    fs.appendFile(filePath, stringToAdd, (err) => {
        if (err) throw err;
        console.log('The string was appended to the file!');
    });
}

// Set an interval to run the appendString function every 10 seconds
setInterval(appendString, 15 * 1000);

// Initial call to append the string immediately
appendString();

