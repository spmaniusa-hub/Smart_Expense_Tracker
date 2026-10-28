/**
 * ============================================================================
 * Smart Expense Tracker - Application Logic (app.js)
 * ============================================================================
 * 
 * This file contains the complete client-side JavaScript logic for the Smart
 * Expense Tracker application. It is organized into clear, beginner-friendly
 * modules:
 * 
 * 1. Application State (In-memory storage)
 * 2. DOM Elements (Cached selectors)
 * 3. Validation Logic (Sanitization and business rules)
 * 4. UI Notification / Alert Helpers
 * 5. Calculation & Metrics Helpers
 * 6. Rendering Logic (DOM updates)
 * 7. Event Handlers (Form submission, deletion, alert close)
 * 8. Initialization
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. APPLICATION STATE
// ----------------------------------------------------------------------------
/**
 * In-memory array of expense objects.
 * Per assignment requirements, a backend database is not required and data
 * can reset on page refresh.
 * 
 * Each expense item will have the following shape:
 * {
 *   id: number,          // Unique timestamp or identifier
 *   name: string,        // Description (e.g. "Grocery shopping")
 *   amount: number,      // Numerical value in dollars (e.g. 45.50)
 *   category: string     // Category key (e.g. "Food", "Travel", etc.)
 * }
 */
let expenses = [];

// ----------------------------------------------------------------------------
// 2. DOM ELEMENT REFERENCES
// ----------------------------------------------------------------------------
// Form controls
const expenseForm = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categorySelect = document.getElementById("expense-category");
const addBtn = document.getElementById("add-expense-btn");

// Summary metric elements
const totalAmountElement = document.getElementById("total-amount");
const totalCountElement = document.getElementById("total-count");
const topCategoryElement = document.getElementById("top-category");
const expenseCounterElement = document.getElementById("expense-counter");

// List containers & empty state
const emptyState = document.getElementById("empty-state");
const tableContainer = document.getElementById("table-container");
const expenseListBody = document.getElementById("expense-list");

// Alert banner elements
const alertBanner = document.getElementById("alert-banner");
const alertIcon = document.getElementById("alert-icon");
const alertMessage = document.getElementById("alert-message");
const alertCloseBtn = document.getElementById("alert-close");

// Timer handle for automatically clearing notifications
let alertTimeoutHandle = null;

// ----------------------------------------------------------------------------
// 3. VALIDATION LOGIC
// ----------------------------------------------------------------------------
/**
 * Validates the raw inputs entered by the user.
 * 
 * Rules:
 *  - Name: Must be non-empty after trimming leading/trailing whitespace.
 *  - Amount: Must be a valid number, not NaN, and strictly greater than 0.
 *  - Category: Must be one of the recognized categories.
 * 
 * @param {string} rawName - The raw text entered into the name input.
 * @param {string} rawAmount - The raw text entered into the amount input.
 * @param {string} rawCategory - The category selected.
 * @returns {{ isValid: boolean, error?: string, sanitizedData?: { name: string, amount: number, category: string } }}
 */
function validateExpenseInput(rawName, rawAmount, rawCategory) {
    // 1. Sanitize input: remove leading and trailing whitespace
    const trimmedName = (rawName || "").trim();

    // Check for empty name
    if (trimmedName.length === 0) {
        return {
            isValid: false,
            error: "Please enter an expense name. The name cannot be blank."
        };
    }

    // Check for missing amount
    if (rawAmount === "" || rawAmount === null || rawAmount === undefined) {
        return {
            isValid: false,
            error: "Please enter an amount."
        };
    }

    // Convert raw amount string to float number
    const parsedAmount = parseFloat(rawAmount);

    // Check if amount is NaN (not a number)
    if (Number.isNaN(parsedAmount)) {
        return {
            isValid: false,
            error: "Please enter a valid numeric amount."
        };
    }

    // Check if amount is zero or negative (Strict Assignment Requirement)
    if (parsedAmount <= 0) {
        return {
            isValid: false,
            error: "Amount must be greater than zero. Negative amounts or $0.00 are not allowed."
        };
    }

    // Check category presence
    const trimmedCategory = (rawCategory || "").trim();
    if (!trimmedCategory) {
        return {
            isValid: false,
            error: "Please select a category for this expense."
        };
    }

    // All validation rules passed! Return sanitized data
    return {
        isValid: true,
        sanitizedData: {
            name: trimmedName,
            // Round to 2 decimal places to prevent floating point inaccuracies
            amount: Math.round(parsedAmount * 100) / 100,
            category: trimmedCategory
        }
    };
}

// ----------------------------------------------------------------------------
// 4. UI NOTIFICATION & ALERT HELPERS
// ----------------------------------------------------------------------------
/**
 * Displays a visible banner message for input feedback or operation success.
 * 
 * @param {string} message - The text message to display.
 * @param {"error" | "success"} [type="error"] - Banner style type.
 */
function showAlert(message, type = "error") {
    // Clear any previous auto-dismiss timer
    if (alertTimeoutHandle) {
        clearTimeout(alertTimeoutHandle);
        alertTimeoutHandle = null;
    }

    // Set message text and icon
    alertMessage.textContent = message;
    alertIcon.textContent = type === "error" ? "⚠️" : "✅";

    // Set classes for styling
    alertBanner.className = `alert-banner ${type}`;

    // Auto-dismiss after 4 seconds
    alertTimeoutHandle = setTimeout(() => {
        dismissAlert();
    }, 4000);
}

/**
 * Hides the alert banner immediately.
 */
function dismissAlert() {
    alertBanner.className = "alert-banner hidden";
    alertMessage.textContent = "";
    if (alertTimeoutHandle) {
        clearTimeout(alertTimeoutHandle);
        alertTimeoutHandle = null;
    }
}

// ----------------------------------------------------------------------------
// 5. CALCULATION & METRICS HELPERS
// ----------------------------------------------------------------------------
/**
 * Calculates the total sum of all expenses in the list.
 * @param {Array<Object>} expenseList - Array of expense objects.
 * @returns {number} The total sum.
 */
function calculateTotalSpent(expenseList) {
    return expenseList.reduce((runningTotal, currentItem) => {
        return runningTotal + currentItem.amount;
    }, 0);
}

/**
 * Determines which category has the highest total expenditure.
 * @param {Array<Object>} expenseList - Array of expense objects.
 * @returns {string} The top category name, or "—" if empty.
 */
function findTopCategory(expenseList) {
    if (expenseList.length === 0) {
        return "—";
    }

    // Accumulate total amount spent per category
    const categoryTotals = {};
    for (const item of expenseList) {
        categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
    }

    // Find the category with maximum total
    let maxCategory = "—";
    let maxAmount = -1;

    for (const [category, amount] of Object.entries(categoryTotals)) {
        if (amount > maxAmount) {
            maxAmount = amount;
            maxCategory = category;
        }
    }

    return maxCategory;
}

/**
 * Formats a numerical amount as a standard US Dollar currency string.
 * @param {number} value - The number to format.
 * @returns {string} E.g., "$12.50"
 */
function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value);
}

// ----------------------------------------------------------------------------
// 6. RENDERING LOGIC (DOM UPDATES)
// ----------------------------------------------------------------------------
/**
 * Renders the entire UI based on current `expenses` state.
 * Refreshes metric summary cards and the dynamic table rows.
 */
function renderExpenses() {
    // 1. Calculate summary metrics
    const totalSpent = calculateTotalSpent(expenses);
    const totalCount = expenses.length;
    const topCategory = findTopCategory(expenses);

    // 2. Update metric cards in DOM
    totalAmountElement.textContent = formatCurrency(totalSpent);
    totalCountElement.textContent = totalCount.toString();
    topCategoryElement.textContent = topCategory;
    expenseCounterElement.textContent = `${totalCount} item${totalCount === 1 ? "" : "s"}`;

    // 3. Toggle Empty State vs Table Container
    if (totalCount === 0) {
        emptyState.classList.remove("hidden");
        tableContainer.classList.add("hidden");
        expenseListBody.innerHTML = "";
        return;
    }

    // If we have items, display table and hide empty placeholder
    emptyState.classList.add("hidden");
    tableContainer.classList.remove("hidden");

    // 4. Render Table Rows cleanly and safely (preventing XSS)
    expenseListBody.innerHTML = "";

    // Iterate through expenses in reverse chronological order (newest first)
    const reversedExpenses = [...expenses].reverse();

    reversedExpenses.forEach((item) => {
        const row = document.createElement("tr");

        // Expense Name Cell
        const nameCell = document.createElement("td");
        nameCell.className = "expense-name-cell";
        nameCell.textContent = item.name; // textContent protects against script injection

        // Category Cell with stylized badge pill
        const categoryCell = document.createElement("td");
        const categoryBadge = document.createElement("span");
        categoryBadge.className = `category-pill cat-${item.category}`;
        categoryBadge.textContent = item.category;
        categoryCell.appendChild(categoryBadge);

        // Amount Cell
        const amountCell = document.createElement("td");
        amountCell.className = "expense-amount-cell text-right";
        amountCell.textContent = formatCurrency(item.amount);

        // Action (Delete) Cell
        const actionCell = document.createElement("td");
        actionCell.className = "text-center";
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-delete";
        deleteBtn.type = "button";
        deleteBtn.setAttribute("data-id", item.id.toString());
        deleteBtn.setAttribute("aria-label", `Delete expense ${item.name}`);
        deleteBtn.innerHTML = "🗑️ Delete";
        actionCell.appendChild(deleteBtn);

        // Append all cells to table row
        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        row.appendChild(actionCell);

        // Append row to table body
        expenseListBody.appendChild(row);
    });
}

// ----------------------------------------------------------------------------
// 7. EVENT HANDLERS
// ----------------------------------------------------------------------------
/**
 * Handles submission of the Add Expense form.
 * @param {Event} event - The DOM submit event.
 */
function handleAddExpense(event) {
    event.preventDefault(); // Stop default browser page refresh

    const rawName = nameInput.value;
    const rawAmount = amountInput.value;
    const rawCategory = categorySelect.value;

    // Validate inputs
    const validation = validateExpenseInput(rawName, rawAmount, rawCategory);

    // If invalid, show descriptive error banner and focus the relevant field
    if (!validation.isValid) {
        showAlert(validation.error, "error");
        if (rawName.trim() === "") {
            nameInput.focus();
        } else {
            amountInput.focus();
        }
        return;
    }

    // Create new expense object
    const newExpense = {
        id: Date.now(), // Generate a unique identifier based on current millisecond
        name: validation.sanitizedData.name,
        amount: validation.sanitizedData.amount,
        category: validation.sanitizedData.category
    };

    // Add to state
    expenses.push(newExpense);

    // Clear form inputs and restore focus
    expenseForm.reset();
    nameInput.focus();

    // Show positive feedback
    showAlert(`Added "${newExpense.name}" (${formatCurrency(newExpense.amount)}) successfully!`, "success");

    // Re-render the application UI
    renderExpenses();
}

/**
 * Handles deletion of an expense by ID using event delegation on the table.
 * @param {Event} event - The click event on the table body.
 */
function handleDeleteExpense(event) {
    // Find closest delete button target
    const deleteButton = event.target.closest(".btn-delete");
    if (!deleteButton) return;

    const idToDelete = Number(deleteButton.getAttribute("data-id"));
    if (!idToDelete) return;

    // Find the item being deleted for feedback
    const itemToDelete = expenses.find((item) => item.id === idToDelete);
    const itemName = itemToDelete ? itemToDelete.name : "Expense";

    // Filter out the selected expense
    expenses = expenses.filter((item) => item.id !== idToDelete);

    // Show feedback
    showAlert(`Deleted "${itemName}".`, "success");

    // Re-render UI
    renderExpenses();
}

// ----------------------------------------------------------------------------
// 8. EVENT LISTENER REGISTRATION & INITIALIZATION
// ----------------------------------------------------------------------------
// Form submission
expenseForm.addEventListener("submit", handleAddExpense);

// Event delegation for dynamically generated delete buttons
expenseListBody.addEventListener("click", handleDeleteExpense);

// Alert dismiss button
alertCloseBtn.addEventListener("click", dismissAlert);

// Initial render to set up the default empty state
renderExpenses();
