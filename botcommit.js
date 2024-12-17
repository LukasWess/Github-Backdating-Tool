const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("Starting botcommit.js...");

const holidays = [
    '2021-01-01', '2021-12-25', '2022-01-01', '2022-12-25', '2023-01-01', '2023-12-25'
];

function getRandomDate() {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    // Ensure date is not Sunday or a holiday
    while (date.getDay() === 0 || holidays.includes(date.toISOString().split('T')[0])) {
        date.setDate(date.getDate() + 1);
    }

    return date;
}

function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

function commit() {
    console.log("Running commit function...");
    const date = getRandomDate();
    const formattedDate = formatDate(date);
    const commitMessage = `Commit on ${formattedDate}`;

    // Append a comment to the target.js file
    const targetFilePath = path.join(__dirname, 'target.js');
    try {
        fs.appendFileSync(targetFilePath, `\n// test`);
        console.log(`Appended to ${targetFilePath}`);
    } catch (err) {
        console.error(`Error appending to file: ${err}`);
        return;
    }

    exec(`git add ${targetFilePath}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error adding file: ${stderr}`);
            return;
        }
        console.log(`File added: ${stdout}`);

        exec(`git commit --amend --date="${formattedDate}" -m "test"`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error committing: ${stderr}`);
                return;
            }
            console.log(`Committed: ${stdout}`);

            exec(`git push`, (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error pushing: ${stderr}`);
                } else {
                    console.log(`Pushed: ${stdout}`);
                }
            });
        });
    });
}

setInterval(commit, 30 * 1000); // Commit every 30 seconds