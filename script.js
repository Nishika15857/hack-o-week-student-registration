// ==============================================================================
// Hack-O-Week Project: Student Registration
// Topic: JavaScript Error Handling (try, catch, throw, and Custom Errors)
// ==============================================================================

// ------------------------------------------------------------------------------
// 1. CUSTOM ERROR CLASS
// We extend the built-in 'Error' class to create our own custom error type.
// This is called "Custom Error Handling".
// ------------------------------------------------------------------------------
class ValidationError extends Error {
    constructor(message) {
        super(message); // Call the parent Error constructor
        this.name = "ValidationError"; // Set custom error name
    }
}

// ------------------------------------------------------------------------------
// 2. DOM ELEMENTS (Accessing HTML elements using JavaScript)
// ------------------------------------------------------------------------------
const registrationForm = document.getElementById("registrationForm");
const studentNameInput = document.getElementById("studentName");
const rollNumberInput = document.getElementById("rollNumber");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const messageBox = document.getElementById("messageBox");
const studentsList = document.getElementById("studentsList");

// Array to store registered students
const registeredStudents = [];

// ------------------------------------------------------------------------------
// 3. VALIDATION FUNCTION (Demonstrating 'throw' and Custom Errors)
// ------------------------------------------------------------------------------
function validateStudentData(name, roll, email, age) {
    // Condition 1: Check if Student Name is empty
    if (!name || name.trim() === "") {
        throw new ValidationError("Student name cannot be empty.");
    }

    // Condition 2: Check if Roll Number is empty
    if (!roll || roll.trim() === "") {
        throw new ValidationError("Roll number is required.");
    }

    // Condition 3: Check if Email is valid
    if (!email || !email.includes("@") || !email.includes(".")) {
        throw new ValidationError("Please enter a valid email address (e.g. name@domain.com).");
    }

    // Condition 4: Check if Age is empty
    if (!age || isNaN(age)) {
        throw new ValidationError("Please enter a valid numeric age.");
    }

    // Condition 5: Check if Age is below 18 (Custom rule)
    if (Number(age) < 18) {
        throw new ValidationError("Age must be 18 or above to register.");
    }
}

// ------------------------------------------------------------------------------
// 4. FORM SUBMISSION HANDLER (Demonstrating 'try' and 'catch')
// ------------------------------------------------------------------------------
registrationForm.addEventListener("submit", function (event) {
    // Prevent the default form reload behavior
    event.preventDefault();

    // Read input values
    const name = studentNameInput.value.trim();
    const roll = rollNumberInput.value.trim();
    const email = emailInput.value.trim();
    const age = ageInput.value.trim();

    // ==========================================================================
    // TRY - CATCH BLOCK
    // - 'try' contains code that might generate/throw an error.
    // - 'catch' catches any error that was thrown and handles it safely.
    // ==========================================================================
    try {
        // Step A: Validate inputs (Will THROW an error if validation fails)
        validateStudentData(name, roll, email, age);

        // Step B: If no error was thrown, register the student
        const newStudent = {
            name: name,
            roll: roll,
            email: email,
            age: Number(age)
        };

        registeredStudents.push(newStudent);

        // Step C: Display success message on screen
        showSuccessMessage(`Success: Student ${name} (Roll: ${roll}) registered successfully!`);

        // Step D: Update UI list and reset form
        updateStudentsList();
        registrationForm.reset();

    } catch (error) {
        // 'catch' block handles the thrown error gracefully without crashing the app
        console.error("Caught an error:", error.name, "-", error.message);

        // Display user-friendly error message on webpage
        showErrorMessage(`Error: ${error.message}`);
    }
});

// ------------------------------------------------------------------------------
// 5. HELPER FUNCTIONS TO DISPLAY MESSAGES ON SCREEN
// ------------------------------------------------------------------------------

// Show Error Message Box
function showErrorMessage(message) {
    messageBox.className = "message-box error";
    messageBox.textContent = message;
    messageBox.classList.remove("hidden");
}

// Show Success Message Box
function showSuccessMessage(message) {
    messageBox.className = "message-box success";
    messageBox.textContent = message;
    messageBox.classList.remove("hidden");
}

// Update the list of registered students on the webpage
function updateStudentsList() {
    studentsList.innerHTML = "";

    if (registeredStudents.length === 0) {
        studentsList.innerHTML = '<li class="empty-notice">No students registered yet.</li>';
        return;
    }

    registeredStudents.forEach((student, index) => {
        const li = document.createElement("li");
        li.className = "student-item";
        li.innerHTML = `
            <div>
                <span class="name">${index + 1}. ${student.name}</span> (${student.roll})
                <br><small style="color: #64748b;">${student.email} | Age: ${student.age}</small>
            </div>
        `;
        studentsList.appendChild(li);
    });
}
