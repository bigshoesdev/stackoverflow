# Frontend For Stack Overflow Application

This frontend application allows users to:
- View a list of questions.
- Search for questions using Elasticsearch.
- View detailed pages for each question, including answers and comments.
- Navigate between pages using React Router.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that helps catch errors during development.
- **Redux Toolkit**: For managing global state.
- **Axios**: For making HTTP requests.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Router**: For client-side routing.

## Installation

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn**

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bigshoesdev/stackoverflow.git
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Project

### Development Mode

To start the development server with hot-reloading:
```bash
npm run start
# or
yarn start
```

This will start the application at `http://localhost:3000`.


## Features

- **Search Page**: A page where users can search for questions and view results.
- **Question Details Page**: A detailed view that displays the question, answers, and comments.
- **Responsive Design**: Optimized for various screen sizes using Tailwind CSS.
- **State Management**: Global state is managed using Redux Toolkit.
- **API Integration**: The frontend communicates with a backend service to fetch data using Axios.

## Usage

1. **Search for Questions**: Use the search bar on the `SearchResultsPage` to search for questions. The search results will be displayed in a list format, with links to the `QuestionDetailsPage`.
2. **View Question Details**: Click on a question title to navigate to the `QuestionDetailsPage`, which shows the question body, answers, and comments.
3. **Responsive Design**: The application layout adapts to different screen sizes.
