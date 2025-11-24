# Web-Based Calculator

This is a simple, user-friendly web-based calculator application built with HTML, CSS, and JavaScript. It provides a clean interface for performing standard arithmetic calculations securely and efficiently.

## Features

- **Standard Arithmetic Operations:** Supports addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`).
- **Operator Precedence:** Correctly handles the order of operations (PEMDAS/BODMAS).
- **Parentheses:** Allows for grouping expressions with `(` and `)`.
- **Unary Minus:** Supports negative numbers (e.g., `-5` or `3 * -2`).
- **Secure Parsing:** Uses a custom Shunting-yard algorithm to parse expressions, avoiding the security risks of `eval()`.
- **Input Validation:**
  - Prevents multiple decimal points within a single number.
  - Handles division-by-zero by displaying an error.
- **Usability Features:**
  - **Clear (`C`):** Clears the entire expression.
  - **Backspace (`←`):** Deletes the last character.
  - **Implicit Multiplication:** Automatically handles implicit multiplication before a parenthesis (e.g., `5(2+1)` is treated as `5*(2+1)`).

## How to Use

To run this calculator, simply open the `index.html` file in your web browser.

No build steps or dependencies are required. The calculator is a static application that runs directly in the browser.
