# 💰 Smart Expense Tracker

A modern, responsive, client-side web application built to track and manage personal expenses. Developed as part of the **Prompting for Development** course assignment (*Prepared by Somya Barolia*).

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Features](#-features)
3. [Technology Stack](#-technology-stack)
4. [File Structure](#-file-structure)
5. [How to Run the Application](#-how-to-run-the-application)
6. [Running the Automated Tests](#-running-the-automated-tests)
7. [Assignment Requirements Compliance](#-assignment-requirements-compliance)
8. [Prompting Methodology](#-prompting-methodology)
9. [Key Improvement Note](#-key-improvement-note)

---

## 🌟 Project Overview

The **Smart Expense Tracker** is a lightweight, single-page web application that allows users to quickly record daily expenses, categorize them, inspect their total spending, and delete items as needed. 

Designed with an emphasis on **code clarity, accessibility, and clean architecture**, this application demonstrates how structured AI prompting (using the 7 core ingredients, task decomposition, and prompt chaining) produces maintainable, production-conscious code.

---

## ✨ Features

- **➕ Add Expenses:** Enter an expense with a descriptive name, dollar amount, and specific category (e.g., Food & Dining, Travel, Shopping, Bills & Utilities, Entertainment, Other).
- **📊 Real-time Summary Cards:**
  - **Total Amount Spent:** Dynamically sums all active expenses and formats cleanly as currency (`$X.XX`).
  - **Total Expenses:** Live counter of recorded entries.
  - **Top Category:** Identifies which spending category holds the highest total dollar amount.
- **📜 Dynamic Expense History:**
  - Displays expenses in reverse chronological order (newest on top).
  - Categorized with color-coded pill badges for instant visual identification.
  - Friendly empty-state illustration when no expenses have been recorded.
- **🗑️ Delete Expense:** Allows one-click deletion of any individual expense with instant recalculation of metrics.
- **🛡️ Comprehensive Input Validation:**
  - Rejects empty or whitespace-only expense titles.
  - Rejects missing, non-numeric, zero, or negative dollar amounts.
  - Displays polite, non-blocking notification banners with auto-dismissal.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Semantic elements (`<header>`, `<main>`, `<section>`, `<table>`, ARIA labels) |
| **Styling** | Vanilla CSS3 | Custom Properties (variables), Flexbox, CSS Grid, mobile-first responsive layout |
| **Logic** | Vanilla JavaScript | Clean modular architecture, DOM event delegation, strict validation |
| **Typography** | Google Fonts | *Plus Jakarta Sans* for clean, modern readability |
| **Testing** | Node.js (v24+) | Built-in `assert` module for headless automated business-logic validation |

> **Note:** As specified in the assignment guidelines, external frontend libraries (React, Angular, Vue, Bootstrap, TailwindCSS) and backend databases were intentionally omitted. In-memory state is utilized and safely resets upon page reload.

---

## 📁 File Structure

```text
Smart_Expense_Tracker/
├── index.html          # Semantic HTML structure & accessible form layout
├── style.css           # Vanilla CSS design system, responsive grid & themes
├── app.js              # State management, validation, calculations & DOM updates
├── test_suite.js       # Standalone automated unit test suite (Node.js)
├── PROMPTS.md          # Full log of structured prompts used (7 ingredients, chaining)
├── USER_GUIDE.md       # Step-by-step user manual & complete testing matrix
├── IMPROVEMENT_NOTE.md # Detailed write-up of improvements made through iteration
└── README.md           # Project documentation and setup guide
```

---

## 🚀 How to Run the Application

The application requires **zero installations or dependencies**. You can run it via either of the methods below:

### Method 1: Direct File Opening (Quickest)
1. Navigate to the project folder:
   ```bash
   cd /Users/manisubramanian/Documents/GitHub/Smart_Expense_Tracker
   ```
2. Double-click `index.html` in your file explorer (Finder), or open it from your terminal:
   ```bash
   open index.html
   ```

### Method 2: Local HTTP Server (Recommended)
You can serve the application using Python's built-in HTTP server:
```bash
# Inside the Smart_Expense_Tracker directory:
python3 -m http.server 8085
```
Open your favorite web browser and visit:  
👉 **[http://localhost:8085](http://localhost:8085)**

---

## 🧪 Running the Automated Tests

An automated test suite (`test_suite.js`) is included to verify all business rules, boundary conditions, input sanitization, and mathematical calculations:

```bash
node test_suite.js
```

### Expected Output:
```text
=================================================
🧪 Running Smart Expense Tracker Validation Tests
=================================================

✅ PASS: Rejects empty string as expense name
✅ PASS: Rejects whitespace-only string as expense name
✅ PASS: Rejects zero amount ($0.00)
✅ PASS: Rejects negative amount (-$15.50)
✅ PASS: Rejects non-numeric text in amount field
✅ PASS: Accepts valid inputs and sanitizes whitespace
✅ PASS: Correctly sums multiple expenses
✅ PASS: Accurately identifies the highest-spending category
✅ PASS: Correctly removes an expense by ID

-------------------------------------------------
Results: 9 Passed, 0 Failed
-------------------------------------------------
```

---

## 📝 Assignment Requirements Compliance

| Assignment Requirement | Implementation Status | Location |
| :--- | :--- | :--- |
| **Add expense (name, amount, category)** | ✅ Fully implemented | `index.html`, `app.js` |
| **Display expenses entered by user** | ✅ Fully implemented (table + category badges) | `index.html`, `app.js` |
| **Show total amount spent** | ✅ Fully implemented (dynamic currency format) | `app.js` (`calculateTotalSpent`) |
| **Allow user to delete an expense** | ✅ Fully implemented (via event delegation) | `app.js` (`handleDeleteExpense`) |
| **Show simple message for invalid inputs** | ✅ Fully implemented (custom animated banner) | `app.js` (`validateExpenseInput`, `showAlert`) |
| **Pure HTML, CSS, JavaScript (No backend)** | ✅ Fully compliant | Root directory |
| **Document Prompts (7 ingredients)** | ✅ Fully documented | `PROMPTS.md` |
| **User Guide with test cases & steps** | ✅ Fully documented | `USER_GUIDE.md` |
| **Improvement Note after reviewing AI output** | ✅ Fully documented | `IMPROVEMENT_NOTE.md` |

---

## 💡 Prompting Methodology

This project followed a strict, methodical prompting process:
1. **The 7 Ingredients:** Engineered an initial prompt specifying *Role, Context, Task, Constraints, Examples, Output Format,* and *Success Criteria*.
2. **Task Decomposition:** Broke the single problem into 7 incremental steps (Markup -> Styles -> State -> Validation -> Render -> Events -> Tests).
3. **Prompt Chaining:** Sequentially created the HTML, CSS, and JS components to ensure modularity.
4. **Iterative Feedback & Code Review:** Refined validation logic, replaced invasive `window.alert` dialogs with integrated banner alerts, and added defensive float rounding for financial accuracy.

See [`PROMPTS.md`](file:///Users/manisubramanian/Documents/GitHub/Smart_Expense_Tracker/PROMPTS.md) for the complete transcript.

---

## 📌 Key Improvement Note

During iterative testing of the AI-generated code, a critical refinement was made to **replace browser-native popup dialogs (`window.alert`) with an integrated, accessible notification banner with auto-dismissal**. Furthermore, financial calculation safeguards (`Math.round(val * 100) / 100`) and event delegation were introduced to prevent floating-point drift and memory leaks.

See [`IMPROVEMENT_NOTE.md`](file:///Users/manisubramanian/Documents/GitHub/Smart_Expense_Tracker/IMPROVEMENT_NOTE.md) for a comprehensive explanation.
