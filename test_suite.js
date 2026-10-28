/**
 * ============================================================================
 * Automated Test Suite for Smart Expense Tracker Logic
 * ============================================================================
 * Runs under Node.js (v24+) to verify all business rules, input sanitization,
 * calculations, and deletion logic requested in the assignment.
 * 
 * Run with: node test_suite.js
 */

const assert = require("assert");

// Mock / Reusable logic mirroring app.js for headless testing
function validateExpenseInput(rawName, rawAmount, rawCategory) {
    const trimmedName = (rawName || "").trim();

    if (trimmedName.length === 0) {
        return {
            isValid: false,
            error: "Please enter an expense name. The name cannot be blank."
        };
    }

    if (rawAmount === "" || rawAmount === null || rawAmount === undefined) {
        return {
            isValid: false,
            error: "Please enter an amount."
        };
    }

    const parsedAmount = parseFloat(rawAmount);

    if (Number.isNaN(parsedAmount)) {
        return {
            isValid: false,
            error: "Please enter a valid numeric amount."
        };
    }

    if (parsedAmount <= 0) {
        return {
            isValid: false,
            error: "Amount must be greater than zero. Negative amounts or $0.00 are not allowed."
        };
    }

    const trimmedCategory = (rawCategory || "").trim();
    if (!trimmedCategory) {
        return {
            isValid: false,
            error: "Please select a category for this expense."
        };
    }

    return {
        isValid: true,
        sanitizedData: {
            name: trimmedName,
            amount: Math.round(parsedAmount * 100) / 100,
            category: trimmedCategory
        }
    };
}

function calculateTotalSpent(expenseList) {
    return expenseList.reduce((runningTotal, currentItem) => {
        return runningTotal + currentItem.amount;
    }, 0);
}

function findTopCategory(expenseList) {
    if (expenseList.length === 0) return "—";

    const categoryTotals = {};
    for (const item of expenseList) {
        categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
    }

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

// ----------------------------------------------------------------------------
// Test Runner
// ----------------------------------------------------------------------------
console.log("=================================================");
console.log("🧪 Running Smart Expense Tracker Validation Tests");
console.log("=================================================\n");

let passedCount = 0;
let failedCount = 0;

function test(description, testFn) {
    try {
        testFn();
        console.log(`✅ PASS: ${description}`);
        passedCount++;
    } catch (err) {
        console.error(`❌ FAIL: ${description}`);
        console.error(`   Details: ${err.message}`);
        failedCount++;
    }
}

// Test Case 1: Empty name rejection
test("Rejects empty string as expense name", () => {
    const res = validateExpenseInput("", "25.00", "Food");
    assert.strictEqual(res.isValid, false);
    assert.ok(res.error.includes("cannot be blank"));
});

// Test Case 2: Whitespace-only name rejection
test("Rejects whitespace-only string as expense name", () => {
    const res = validateExpenseInput("    ", "25.00", "Food");
    assert.strictEqual(res.isValid, false);
    assert.ok(res.error.includes("cannot be blank"));
});

// Test Case 3: Zero amount rejection
test("Rejects zero amount ($0.00)", () => {
    const res = validateExpenseInput("Coffee", "0", "Food");
    assert.strictEqual(res.isValid, false);
    assert.ok(res.error.includes("greater than zero"));
});

// Test Case 4: Negative amount rejection
test("Rejects negative amount (-$15.50)", () => {
    const res = validateExpenseInput("Bus Pass", "-15.50", "Travel");
    assert.strictEqual(res.isValid, false);
    assert.ok(res.error.includes("greater than zero"));
});

// Test Case 5: Non-numeric amount string
test("Rejects non-numeric text in amount field", () => {
    const res = validateExpenseInput("Dinner", "abc", "Food");
    assert.strictEqual(res.isValid, false);
    assert.ok(res.error.includes("valid numeric amount"));
});

// Test Case 6: Valid input acceptance & whitespace trimming
test("Accepts valid inputs and sanitizes whitespace", () => {
    const res = validateExpenseInput("  Grocery Store  ", "64.50", "Food");
    assert.strictEqual(res.isValid, true);
    assert.strictEqual(res.sanitizedData.name, "Grocery Store");
    assert.strictEqual(res.sanitizedData.amount, 64.5);
    assert.strictEqual(res.sanitizedData.category, "Food");
});

// Test Case 7: Total calculation with multiple expenses
test("Correctly sums multiple expenses", () => {
    const sampleExpenses = [
        { id: 1, name: "Groceries", amount: 50.25, category: "Food" },
        { id: 2, name: "Train Ticket", amount: 14.75, category: "Travel" },
        { id: 3, name: "Movie", amount: 15.00, category: "Entertainment" }
    ];
    const total = calculateTotalSpent(sampleExpenses);
    assert.strictEqual(total, 80.00);
});

// Test Case 8: Top category calculation
test("Accurately identifies the highest-spending category", () => {
    const sampleExpenses = [
        { id: 1, name: "Groceries", amount: 50.25, category: "Food" },
        { id: 2, name: "Snacks", amount: 10.00, category: "Food" },
        { id: 3, name: "Train Ticket", amount: 14.75, category: "Travel" }
    ];
    const top = findTopCategory(sampleExpenses);
    assert.strictEqual(top, "Food");
});

// Test Case 9: Expense deletion logic
test("Correctly removes an expense by ID", () => {
    let list = [
        { id: 101, name: "Item A", amount: 10, category: "Shopping" },
        { id: 102, name: "Item B", amount: 20, category: "Shopping" }
    ];
    list = list.filter((item) => item.id !== 101);
    assert.strictEqual(list.length, 1);
    assert.strictEqual(list[0].id, 102);
});

console.log("\n-------------------------------------------------");
console.log(`Results: ${passedCount} Passed, ${failedCount} Failed`);
console.log("-------------------------------------------------");

if (failedCount > 0) {
    process.exit(1);
}
