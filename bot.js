const fs = require('fs');
const path = require('path');

// Path to the file you want to append to
const filePath = path.join(__dirname, './target.js');

// Function to append lines of code
function appendCode() {
    // Set the date to the past (e.g., 1 day ago)
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const codeToAdd = `
// This is a new line of code
console.log('New line of code added at ' + '${pastDate.toISOString()}');
`;

    fs.appendFile(filePath, codeToAdd, (err) => {
        if (err) throw err;
        console.log('The code was appended to the file!');
    });
}

// Set an interval to run the appendCode function every few minutes (e.g., every 5 minutes)
setInterval(appendCode, 5 * 60 * 1000);

// Initial call to append code immediately
appendCode();
function getRandomDate() {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 3);
    const end = new Date();
    let date;
    do {
        date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    } while (date.getDay() === 0 || isHoliday(date));
    return date;
}

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
setInterval(appendString, 10 * 1000);

// Initial call to append the string immediately
appendString();

