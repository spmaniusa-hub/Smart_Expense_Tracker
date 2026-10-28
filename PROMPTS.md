# Prompting for Development: Practical Assignment
## Smart Expense Tracker — Prompts Log (`PROMPTS.md`)
**Student / Developer:** Mani Subramanian  
**Course Assignment:** Practical Assignment — Smart Expense Tracker (Prepared by Somya Barolia)  
**Repository:** `Smart_Expense_Tracker`  

---

## 1. Initial Structured Prompt (The 7 Ingredients)

In accordance with the assignment guidelines, the initial prompt incorporates all **seven essential ingredients**:
1. **Role**
2. **Context**
3. **Task**
4. **Constraints**
5. **Examples**
6. **Output Format**
7. **Success Criteria**

```text
[ROLE]
You are a Senior Frontend Engineer and Technical Mentor specializing in accessible, clean, and beginner-friendly web application development.

[CONTEXT]
I am an entry-level programmer with 5+ years of prior software experience learning web development fundamentals. I am building a "Smart Expense Tracker" practical assignment. The goal is to create a clean, working single-page application that is easy to understand, inspect, and maintain without relying on heavy external frameworks.

[TASK]
Design and develop a complete, client-side Smart Expense Tracker web application that:
1. Allows users to add an expense with a name, an amount, and a category (e.g., Food, Travel, Shopping, Bills, Entertainment, Other).
2. Displays all entered expenses in a structured list/table.
3. Calculates and displays the total amount spent dynamically.
4. Allows users to delete an expense from the list and immediately recalculates the total.
5. Performs robust input validation and shows clear, user-friendly feedback if:
   - The expense name is empty or only whitespace.
   - The amount is empty, non-numeric, zero, or negative.
   - The category is unselected.

[CONSTRAINTS]
- Pure HTML, CSS, and Vanilla JavaScript only.
- No third-party UI libraries (no React, Angular, Vue, Bootstrap, or TailwindCSS).
- No backend server or persistent database required; in-memory state is sufficient (data resets upon page refresh).
- Modern, clean CSS using CSS Custom Properties (variables) and responsive layout.
- The JavaScript must be thoroughly commented and divided into logical sections so an entry-level developer can easily follow each step.

[EXAMPLES]
- Valid Input Example:
  Name: "Grocery shopping", Amount: 45.50, Category: "Food"
  -> Added to list, total increases by $45.50, status banner: 'Added "Grocery shopping" ($45.50) successfully!'
- Invalid Input Example 1:
  Name: "", Amount: 20, Category: "Food"
  -> Form blocked, status banner: "Please enter an expense name. The name cannot be blank."
- Invalid Input Example 2:
  Name: "Coffee", Amount: -5.00, Category: "Food"
  -> Form blocked, status banner: "Amount must be greater than zero. Negative amounts or $0.00 are not allowed."

[OUTPUT FORMAT]
Provide the application split cleanly across three files:
1. `index.html`: Semantic HTML5 markup with accessible form controls and ARIA attributes.
2. `style.css`: Clean, modern vanilla stylesheet with CSS variables, responsive grid, card layout, and category badges.
3. `app.js`: Clean vanilla JavaScript organized into state, DOM selectors, validation, calculation, rendering, and event handlers.

[SUCCESS CRITERIA]
- The web page opens directly in any standard browser.
- Users can smoothly add, view, and delete expenses.
- Total amount spent updates dynamically and accurately formats as currency ($X.XX).
- All invalid inputs display helpful, human-readable error messages and do not break the page.
- Code contains clear comments explaining the rationale behind design choices.
```

---

## 2. Task Decomposition

Prompt used to decompose the development process into manageable milestones:

```text
Break down the construction of this Smart Expense Tracker into a step-by-step development roadmap following Task Decomposition:
1. Step 1: Semantic HTML wireframe & accessible form structure.
2. Step 2: CSS layout, color system, typography, and card components.
3. Step 3: Core JavaScript state management & DOM selection.
4. Step 4: Validation functions for edge cases (empty strings, zero, negative numbers).
5. Step 5: Render pipeline, currency formatting, and dynamic table generation.
6. Step 6: Expense deletion and metric recalculation via event delegation.
7. Step 7: Automated unit testing & edge-case verification.
```

---

## 3. Prompt Chaining

The application was built iteratively using prompt chaining, ensuring each layer was validated before moving to the next.

### Chain 1: HTML Structure
```text
Write the semantic HTML markup for the Smart Expense Tracker (`index.html`).
Include:
- An app header with icon and description.
- A 3-card summary section (Total Spent, Total Count, Top Category).
- A notification banner container for error and success alerts.
- A card containing the input form (Expense Name, Amount with $ prefix, Category dropdown, and Add button).
- A card displaying the expense history with an empty-state placeholder and an accessible HTML table.
Ensure all form inputs have proper <label> tags and IDs for accessibility.
```

### Chain 2: CSS Styling & Responsive Design
```text
Create the vanilla CSS stylesheet (`style.css`) for the Smart Expense Tracker.
Requirements:
- Use CSS variables (:root) for color palette (indigo brand color, slate neutrals, emerald success, rose error).
- Use Google Font 'Plus Jakarta Sans'.
- Implement a two-column desktop layout (form on left, table on right) that gracefully collapses to a single column on mobile screens (<860px).
- Add distinct color-coded badges/pills for each category (Food, Travel, Shopping, Bills, Entertainment, Other).
- Style the alert notification banner for both error and success states.
- Style the delete button with subtle hover effects.
```

### Chain 3: JavaScript Core Logic & Validation
```text
Write `app.js` using vanilla JavaScript.
Structure the code into clearly commented sections:
1. State management (an in-memory `expenses` array).
2. Cached DOM element references.
3. `validateExpenseInput(rawName, rawAmount, rawCategory)`:
   - Trim whitespace.
   - Verify name is not empty.
   - Verify amount is a valid number strictly greater than 0.
   - Return structured validation result.
4. `showAlert(message, type)`: displays feedback and auto-dismisses after 4 seconds.
5. Calculation functions: `calculateTotalSpent`, `findTopCategory`, `formatCurrency`.
6. `renderExpenses()`: updates metric cards, toggles empty state vs table, safely creates DOM nodes.
7. Event handlers: `handleAddExpense` and `handleDeleteExpense` (using event delegation).
```

---

## 4. Code Explanation Prompt

Prompt used to deep-dive into specific design patterns:

```text
Explain the concept of 'Event Delegation' used in `expenseListBody.addEventListener("click", handleDeleteExpense)`.
Why is this approach superior to attaching individual `addEventListener` listeners to each delete button whenever a new row is added?
```

**AI Explanation Summary:**
> In dynamic web apps where list items are continuously created and destroyed, attaching individual event listeners to every delete button consumes extra memory and requires re-attaching listeners every time the DOM re-renders. With **Event Delegation**, a single click listener is placed on the parent `<tbody>` element. When a click occurs, the event bubbles up, and `event.target.closest('.btn-delete')` identifies if a delete button was clicked. This makes the code faster, simpler, and immune to memory leaks.

---

## 5. Iterative Prompting & Code Improvement

Prompt used to refine validation and user feedback:

```text
During testing, I noticed two opportunities for improvement:
1. When a user submits an empty or invalid form, standard browser alerts (e.g. alert('error')) feel jarring and block the UI thread.
2. Floating point calculations in JavaScript (e.g. 0.1 + 0.2 = 0.30000000000000004) can corrupt currency totals.
Please update the code to:
- Use an integrated, styled banner notification with auto-dismissal.
- Use `Math.round(parsedAmount * 100) / 100` and `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })` for mathematically sound currency handling.
```

---

## 6. Testing Prompt

Prompt used to design a comprehensive test suite:

```text
Suggest a comprehensive list of test cases for testing the Smart Expense Tracker, covering:
1. Normal valid inputs.
2. Boundary / edge cases (decimal cents, large numbers).
3. Invalid inputs (empty strings, whitespace-only strings, zero amount, negative amount, non-numeric strings).
4. Deletion and recalculation integrity.
Also provide a standalone Node.js test script (`test_suite.js`) using assertions to verify the validation and calculation functions automatically.
```

---

## 7. Code Review & Mentor Improvement Prompt

Prompt used for self-review and mentor critique:

```text
Act as a senior code reviewer. Review our HTML, CSS, and JS files. Suggest one simple, high-impact improvement that enhances usability or code maintainability without adding unnecessary complexity. Explain why it is beneficial.
```

**Outcome / Mentor Recommendation:**
> Added a dynamic **"Top Spending Category"** metric card and category count badge (`3 items`). It provides immediate analytical value to the user at a glance without adding backend complexity or external dependencies.
