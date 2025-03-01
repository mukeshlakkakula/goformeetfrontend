# GoForMeet

GoForMeet is a web application built with Next.js, providing user authentication, a task manager, tracking page, and more.

## Features

- **User Authentication**: Secure login and registration.
- **Home Page**: Overview of platform features.
- **Tracking Page**: Track tasks and activities.
- **Task Manager Page**: Manage and organize tasks efficiently.

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

### Clone the Repository

#### Frontend Repository:

```bash
git clone https://github.com/mukeshlakkakula/goformeetfrontend.git
cd goformeetfrontend
```

#### Backend Repository:

```bash
git clone https://github.com/mukeshlakkakula/goformeetbackend.git
cd goformeetbackend
```

### Install Dependencies

```bash
npm install  # or yarn install
```

## Running the Project

### Development Server

To start the development server, run:

```bash
npm run dev  # or yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

To create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Backend

The project uses a backend API hosted at:
[GoForMeet Backend](https://goformeetbackend-2.onrender.com/)

Ensure the backend is running to access full functionality.

## Deployment

The frontend is deployed at:
[GoForMeet Live](https://goformeetfrontend-k5vr.vercel.app/)

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **State Management:** React Hooks
- **Authentication:** JSON Web Tokens (JWT)
- **Backend:** Node.js, Express.js (Hosted on Render)
- **Styling:** Tailwind CSS
