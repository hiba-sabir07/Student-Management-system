#! /usr/bin/env node 

import inquirer from "inquirer";

// Generate a random student ID
const randomNumber: number = Math.floor(10000 + Math.random() * 90000);

let myBalance: number = 0;

async function main() {
    // Prompt for student details and course enrollment
    const answer = await inquirer.prompt([
        {
            message: "Enter student name:",
            name: "students",
            type: "input",   
            validate: function(value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter a non-empty value.";
            },
        },
        {
            message: "Select the course to enroll:",
            name: "courses",
            type: "list",
            choices: ["MS.Office", "HTML", "Javascript", "Python", "SQL", "Typescript"]
        }
    ]);

    // Define tuition fees for each course
    const tuitionFee: { [key: string]: number } = {
        "MS.Office": 2000,
        "HTML": 2500,
        "Javascript": 5000,
        "Python": 10000,
        "SQL": 7000,
        "Typescript": 6000,
    };

    // Display tuition fees and balance
    console.log(`\nTuition Fees: ${tuitionFee[answer.courses]}/-\n`);
    console.log(`Balance: ${myBalance}\n`);

    // Prompt for payment method and amount
    const paymentInfo = await inquirer.prompt([
        {
            message: "Select the payment method:",
            name: "paymentMethod",
            type: "list",
            choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
        },
        {
            message: "Enter the amount to transfer:",
            name: "amount",
            type: "input",
            validate: function(value) {
                const amount = parseFloat(value);
                if (isNaN(amount) || amount <= 0) {
                    return "Please enter a valid amount.";
                }
                return true;
            },
        }
    ]);

    console.log(`\nSelected payment method: ${paymentInfo.paymentMethod}\n`);

    const tuitionFees = tuitionFee[answer.courses];
    const paymentAmount = parseFloat(paymentInfo.amount);

    // Check if the payment amount matches the tuition fee
    if (tuitionFees === paymentAmount) {
        console.log(`\nCongrats, you have successfully enrolled in ${answer.courses}.\n`);

        // Prompt for the next action
        const nextAction = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: "What would you like to do next?",
                choices: ["View status", "Exit"]
            },
        ]);

        if (nextAction.select === "View status") {
            console.log("\n********Status********\n");
            console.log(`Student Name: ${answer.students}`);
            console.log(`Student ID: ${randomNumber}`);
            console.log(`Course: ${answer.courses}`);
            console.log(`Tuition Fees Paid: ${paymentAmount}`);
            console.log(`Balance: ${myBalance += paymentAmount}`);
        } else {
            console.log(`\nExiting Student Management System\n`);
        }
    } else {
        console.log(`\nInvalid Amount\n`);
    }
}

// Run the main function
main().catch((err) => {
    console.error("An error occurred:", err);
});
