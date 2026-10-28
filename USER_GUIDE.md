# 📘 Smart Expense Tracker — User Guide & Testing Manual

Welcome to the **Smart Expense Tracker User Guide**. This document provides step-by-step instructions for running the application, operating every feature, understanding input validation rules, and conducting thorough testing with normal and invalid inputs.

---

## 📑 Table of Contents
1. [System Requirements](#1-system-requirements)
2. [How to Launch the Application](#2-how-to-launch-the-application)
3. [User Interface Overview & Layout](#3-user-interface-overview--layout)
4. [Step-by-Step Usage Instructions](#4-step-by-step-usage-instructions)
   - [Adding an Expense](#step-1-adding-an-expense)
   - [Reading the Summary Metrics](#step-2-reading-the-summary-metrics)
   - [Deleting an Expense](#step-3-deleting-an-expense)
5. [Input Validation Rules & Error Messages](#5-input-validation-rules--error-messages)
6. [Comprehensive Test Cases & Results Matrix](#6-comprehensive-test-cases--results-matrix)
7. [Automated Verification (Node.js)](#7-automated-verification-nodejs)

---

## 1. System Requirements

The Smart Expense Tracker is completely self-contained and runs on any standard web browser:
- **Supported Browsers:** Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, Brave.
- **Dependencies:** None! Pure HTML5, CSS3, and JavaScript are used.
- **Node.js (Optional):** Version 18+ if you wish to run the automated unit test suite (`node test_suite.js`).

---

## 2. How to Launch the Application

You can launch the application on macOS, Windows, or Linux using either of two methods:

### Option A: Launch Directly via File Browser (Easiest)
1. Open your file manager (Finder on macOS or File Explorer on Windows).
2. Navigate to:
   ```text
   /Users/manisubramanian/Documents/GitHub/Smart_Expense_Tracker
   ```
3. Double-click the file named **`index.html`**.
4. The application will instantly open in your default browser.

### Option B: Launch via Local HTTP Server
1. Open your terminal application.
2. Navigate to the project directory:
   ```bash
   cd /Users/manisubramanian/Documents/GitHub/Smart_Expense_Tracker
   ```
3. Start Python's built-in lightweight web server:
   ```bash
   python3 -m http.server 8085
   ```
4. Open your browser and navigate to:
   ```text
   http://localhost:8085
   ```

---

## 3. User Interface Overview & Layout

The user interface is designed to be clean, responsive, and intuitive:

```text
+-------------------------------------------------------------------------------+
|  💰  Smart Expense Tracker                                                    |
|      Easily track, manage, and understand your daily expenses                |
+-------------------------------------------------------------------------------+
|  [ TOTAL SPENT ]           [ TOTAL EXPENSES ]          [ TOP CATEGORY ]       |
|      $94.50                      2                          Food              |
+-------------------------------------------------------------------------------+
|  [ Notification Banner: ⚠️ Please enter an expense name ]                     |
+-------------------------------------------------------------------------------+
|  ADD NEW EXPENSE                   |  EXPENSE HISTORY (2 items)               |
|                                    |------------------------------------------|
|  Expense Name *                    |  NAME       CATEGORY   AMOUNT   ACTION   |
|  [ Grocery shopping          ]     |------------------------------------------|
|                                    |  Subway     [Travel]   $30.00   [Delete] |
|  Amount ($) *                      |  Groceries  [Food]     $64.50   [Delete] |
|  $ [ 64.50                   ]     |                                          |
|                                    |                                          |
|  Category *                        |                                          |
|  [ 🍔 Food & Dining        v ]     |                                          |
|                                    |                                          |
|  [ + Add Expense Button      ]     |                                          |
+-------------------------------------------------------------------------------+
```

---

## 4. Step-by-Step Usage Instructions

### Step 1: Adding an Expense
1. Click into the **Expense Name** input field and type a descriptive title (e.g., `Supermarket Groceries`).
2. Click into the **Amount ($)** input field and enter the dollar amount (e.g., `52.75`).
3. Click the **Category** dropdown and select the category that best matches:
   - 🍔 **Food & Dining** (groceries, takeout, restaurants)
   - 🚗 **Travel & Transportation** (gas, train tickets, Uber, flights)
   - 🛍️ **Shopping** (clothing, electronics, home goods)
   - 💡 **Bills & Utilities** (electricity, water, Wi-Fi, phone)
   - 🎬 **Entertainment** (movies, concerts, games)
   - 📦 **Other** (miscellaneous expenses)
4. Click the purple **`+ Add Expense`** button (or press `Enter` on your keyboard).
5. **Result:**
   - A green banner confirms: `Added "Supermarket Groceries" ($52.75) successfully!`
   - The item appears at the top of the **Expense History** table.
   - The **Total Amount Spent** updates immediately.
   - The form fields reset automatically and focus returns to the name field for convenient rapid entry.

---

### Step 2: Reading the Summary Metrics
At the top of the screen, three live summary cards give you instant visibility into your finances:
1. **Total Amount Spent:** Sums all active expenses in US currency format (`$X.XX`).
2. **Total Expenses:** Counter of how many individual expense items are currently recorded.
3. **Top Category:** Computes which category accounts for the highest total spending.

---

### Step 3: Deleting an Expense
1. Locate the expense you wish to remove in the **Expense History** table.
2. Click the red **`🗑️ Delete`** button in the corresponding row.
3. **Result:**
   - The expense is immediately removed from the table.
   - The **Total Amount Spent** and **Total Count** recalculate instantly.
   - If all expenses are deleted, the table gracefully switches back to the **"No expenses yet"** empty state illustration.
   - A polite feedback message confirms: `Deleted "<Item Name>".`

---

## 5. Input Validation Rules & Error Messages

The application rigorously guards against improper user inputs with friendly, contextual alerts:

| Field | Condition | Validation Rule | Displayed Error Message |
| :--- | :--- | :--- | :--- |
| **Expense Name** | Empty string (`""`) | Required | `⚠️ Please enter an expense name. The name cannot be blank.` |
| **Expense Name** | Whitespace only (`"   "`) | Required (trimmed) | `⚠️ Please enter an expense name. The name cannot be blank.` |
| **Amount** | Empty string | Required | `⚠️ Please enter an amount.` |
| **Amount** | Zero (`0` or `0.00`) | Must be > 0 | `⚠️ Amount must be greater than zero. Negative amounts or $0.00 are not allowed.` |
| **Amount** | Negative (`-15.00`) | Must be > 0 | `⚠️ Amount must be greater than zero. Negative amounts or $0.00 are not allowed.` |
| **Amount** | Non-numeric (`abc`) | Must be numeric | `⚠️ Please enter a valid numeric amount.` |
| **Category** | Not selected | Required | `⚠️ Please select a category for this expense.` |

---

## 6. Comprehensive Test Cases & Results Matrix

Below is the verified test matrix used to confirm that all assignment criteria and edge cases operate flawlessly:

| Test ID | Description | Input Values | Expected Behavior | Actual Result | Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Add standard expense | Name: `Dinner with Friends`<br>Amount: `48.20`<br>Category: `Food` | Added to table, total becomes `$48.20`, count `1`. | Added to table, total `$48.20`, success banner shown. | **PASS** |
| **TC-02** | Add second expense | Name: `Train Ticket`<br>Amount: `12.50`<br>Category: `Travel` | Added to table, total becomes `$60.70`, count `2`. | Added to table, total `$60.70`, count `2`. | **PASS** |
| **TC-03** | Decimal cents handling | Name: `Coffee`<br>Amount: `4.99`<br>Category: `Food` | Total adds `$4.99` with exact decimal precision (`$65.69`). | Total accurate at `$65.69` without floating point drift. | **PASS** |
| **TC-04** | Invalid: Blank name | Name: ` ` (empty)<br>Amount: `20.00`<br>Category: `Food` | Form submission rejected; error banner shown. | Error banner: `"Please enter an expense name..."`. | **PASS** |
| **TC-05** | Invalid: Whitespace name | Name: `     `<br>Amount: `15.00`<br>Category: `Food` | Form submission rejected; trimmed check triggers. | Error banner: `"Please enter an expense name..."`. | **PASS** |
| **TC-06** | Invalid: Zero amount | Name: `Free Sample`<br>Amount: `0`<br>Category: `Food` | Form submission rejected; amount check triggers. | Error banner: `"Amount must be greater than zero..."`. | **PASS** |
| **TC-07** | Invalid: Negative amount | Name: `Refund`<br>Amount: `-25.00`<br>Category: `Shopping` | Form submission rejected; negative value blocked. | Error banner: `"Amount must be greater than zero..."`. | **PASS** |
| **TC-08** | Delete middle expense | Click `Delete` on `Train Ticket` | `Train Ticket` removed; total decreases by `$12.50` to `$53.19`. | Row removed immediately; total updated to `$53.19`. | **PASS** |
| **TC-09** | Delete all expenses | Delete remaining expenses | Table toggles back to "No expenses yet" empty state. | Empty state illustration appears; total is `$0.00`. | **PASS** |
| **TC-10** | Page reload reset | Refresh browser (`F5` or `Cmd+R`) | Per assignment specs, in-memory state resets to 0. | Page reloads clean with $0.00 and empty state. | **PASS** |

---

## 7. Automated Verification (Node.js)

To run the automated regression tests on your local machine:

```bash
cd /Users/manisubramanian/Documents/GitHub/Smart_Expense_Tracker
node test_suite.js
```

All 9 automated unit tests will execute and confirm:
- Rejection of empty/whitespace strings
- Rejection of zero and negative dollar amounts
- Precise decimal rounding
- Correct sum accumulation and category breakdown
- Clean item removal by unique identifier
