# Todo List App

This is a simple Todo List application built with React, TanStack Query (React Query), and Axios. It allows users to fetch, add, and delete todos with optimistic updates for a smooth user experience.

## Features
- Fetch a list of todos from an API.
- Add new todos with optimistic updates (UI updates instantly, rolls back on error).
- Delete todos with optimistic updates.
- Error handling and rollback for failed requests.

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (package managers)

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd todo-list-app
```

### 2. Install Dependencies
Install the required packages using npm or yarn:
```bash
npm install
```
or
```bash
yarn install
```

### 3. Configure the API
The app uses an external API to manage todos. Update the `API_URL` in `src/config/api.ts` to point to your API endpoint. For example:
```typescript
export const API_URL = "https://jsonplaceholder.typicode.com/todos";
```
- **Note**: The example above uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free fake API for testing. Replace it with your actual API if needed.

### 4. Run the Project
Start the development server:
```bash
npm run dev
```
or
```bash
yarn dev
```
- The app will typically run on `http://localhost:3000` (check your terminal for the exact URL).

### 5. Open the App
Open your browser and navigate to `http://localhost:3000` (or the port shown in your terminal) to see the app in action.

