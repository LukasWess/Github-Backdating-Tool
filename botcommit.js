const { exec } = require('child_process');
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

function commitChanges() {
    console.log("Running commit function...");
    const date = getRandomDate();
    const formattedDate = formatDate(date);
    const commitMessage = `Commit on ${formattedDate}`;

    exec('git pull origin main --allow-unrelated-histories', (pullErr, pullStdout, pullStderr) => {
        if (pullErr) {
            console.error(`Error pulling: ${pullStderr}`);
            return;
        }
        console.log(`Pull output: ${pullStdout}`);

        exec('git add .', (addErr, addStdout, addStderr) => {
            if (addErr) {
                console.error(`Error adding files: ${addStderr}`);
                return;
            }
            console.log(`Files added: ${addStdout}`);

            exec(`git commit --date="${formattedDate}" -m "${commitMessage}"`, (commitErr, commitStdout, commitStderr) => {
                if (commitErr) {
                    console.error(`Error committing: ${commitStderr}`);
                    return;
                }
                console.log(`Committed: ${commitStdout}`);

                exec('git push origin main', (pushErr, pushStdout, pushStderr) => {
                    if (pushErr) {
                        console.error(`Error pushing: ${pushStderr}`);
                        return;
                    }
                    console.log(`Pushed: ${pushStdout}`);
                });
            });
        });
    });
}

// Run the commit function every 30 seconds
setInterval(commitChanges, 30 * 1000);

// Initial call to commit changes immediately
commitChanges();