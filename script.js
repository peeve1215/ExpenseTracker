// Select elements
const expenseForm = document.getElementById("expenseForm");
const expenseTable = document.getElementById("expenseTable");
const totalAmountEl = document.getElementById("totalAmount");

// Load expenses from local storage
document.addEventListener("DOMContentLoaded", loadExpenses);

// Submit form
expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById("expenseName").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;
    const date = document.getElementById("expenseDate").value;

    if (!name || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense.");
        return;
    }

    // Create expense object
    const expense = { id: Date.now(), name, amount, category,date};

    // Save to local storage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Add to table
    addExpenseToTable(expense);

    // Update total
    updateTotal();

    // Clear form
    expenseForm.reset();
});

// Load expenses from local storage and display
function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.forEach(addExpenseToTable);
    updateTotal();
}

// Add expense to the table
function addExpenseToTable(expense) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${expense.name}</td>
        <td>₱${expense.amount.toFixed(2)}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td><button class="delete-btn" data-id="${expense.id}">X</button></td>
    `;
    expenseTable.appendChild(row);
}

// Update total spending
function updateTotal() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountEl.textContent = `₱${total.toFixed(2)}`;
}

// Delete expense
expenseTable.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const id = parseInt(e.target.getAttribute("data-id"));

        // Remove from local storage
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem("expenses", JSON.stringify(expenses));

        // Remove from table
        e.target.parentElement.parentElement.remove();

        // Update total
        updateTotal();
    }
});