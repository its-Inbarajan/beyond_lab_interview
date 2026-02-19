# Beyond Labs Frontend Interview Task

## Project Overview
This is a React + Vite + TypeScript frontend project implementing a multi-step form with validation.

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository from GitHub:**
   ```bash
   git clone https://github.com/Itsinbarajan/beyond_labs_frontend_interview.git
   cd beyond_labs_interview
   ```

2. **Navigate to the project directory:**
   ```bash
   cd vite-project
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Lint the code:**
   ```bash
   npm run lint
   ```

## Project Structure

```
vite-project/
├── src/
│   ├── App.tsx          # Main form component
│   ├── App.css          # Styling
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles
│   ├── components/
│   │   └── ui/          # (Empty - no reusable components created)
│   └── assets/
├── public/              # Static assets
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Implementation Details

### App Component - Multi-Step Form

Due to time constraints, a single-component solution was implemented directly in the App component without extracting reusable components.

#### Features:
- **Two-Step Form Process:**
  - **Step 1:** Name and Email input fields
  - **Step 2:** Role selection (Developer, Designer, Manager) and Terms & Conditions checkbox

- **Form Validation:**
  - Email validation using regex pattern
  - Name validation with minimum length check (4 characters)
  - Required field validation for all inputs
  - Real-time error state management

- **State Management:**
  - Form state tracking for all fields (name, email, role, terms)
  - Error state management for validation feedback
  - User details storage and display

- **User Submission:**
  - Multi-step form navigation with Next/Back buttons
  - Form submission on Step 2
  - Display of submitted user details below the form

### TypeScript Interfaces:

```typescript
interface IForm {
  name: string;
  email: string;
  role: string;
  terms: string;
}

interface ValidationType {
  message: string;
  alterNativeMessage?: string;
  isRequired: boolean;
  regex?: RegExp;
  minLength?: number;
}
```

## Component Reusability Note

**⚠️ Due to time constraints, no reusable components were created or extracted.**

All form logic, validation, and UI elements are contained within the main `App.tsx` component. The `components/ui` folder remains empty. Future improvements should include:
- Extracting form fields into reusable `Input`, `Select`, and `Checkbox` components
- Creating a separate `Form` component for multi-step form logic
- Extracting validation logic into a custom hook
- Creating a `UserDetails` display component

## Technologies Used

- **React** 19.2.0
- **React DOM** 19.2.0
- **TypeScript** ~5.9.3
- **Vite** 7.3.1
- **ESLint** for code linting

## Author Notes

This project was completed as interview task with focus on functionality rather than component architecture. The form successfully demonstrates React state management, form handling, validation logic, and TypeScript typing in a single component implementation.
