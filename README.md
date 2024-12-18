# BotTheBuilder

This tool how simple github backdating can be done. 
Its adding a new line to target.js every 15 seconds trough bot.js. The desired output to the target.js file can be edited in the bot.js file under the: 

```
function appendString() {
    const stringToAdd = `I will be a dev\n`;
```
Every 30 seconds botcommit.js will commit the new lines with a randomized time stamp for the last year. This can easily be increased further by adjusting the minus value on this line in botcommit.js file 

```
start.setFullYear(start.getFullYear() - 1);
```




Installation and Running Guide
Prerequisites

Ensure you have Node.js installed on your machine. You can download it from nodejs.org.

Steps to Install and Run the Script

Clone the Repository: Clone the repository to your local machine using the following command: 

git clone https://github.com/LukasWess/BotTheBuilder

Navigate to the Project Directory: Open a terminal and navigate to the directory containing your project files:

cd /path/to/your/project

Install Dependencies: If there are any dependencies listed in the package.json file, install them using npm:

npm install

Run the Script: Start the script using the following command:

npm start

Additional Information

The script will append a specific string to target.js every 15 seconds.

Ensure target.js exists in the same directory as bot.js.
