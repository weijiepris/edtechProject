# Setup Instructions

## 1. Install Prerequisites

### Install Android Studio

Follow the instructions here to install Android Studio and set up an Android emulator:  
➡️ [https://docs.expo.dev/workflow/android-studio-emulator/](https://docs.expo.dev/workflow/android-studio-emulator/)

### Install Node.js

Ensure you are using Node.js version **v23.10.0**, which was used during development:  
➡️ [https://nodejs.org/en](https://nodejs.org/en)

### Install Docker

Install Docker to manage the PostgreSQL container for the backend:  
➡️ [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

## 🔹 If you are on Windows, please install WSL and use a WSL terminal (e.g., Ubuntu) to proceed.

Important: Environment to Run make Commands
This project uses a Makefile to automate setup and startup processes.
✅ You must be on Mac, Linux, or Windows with WSL (Windows Subsystem for Linux) to run make commands.

## 2. Setting Up Environment Variables

### Create `.env` Files

**Root Project Directory**

- Create a `.env` file at the root of the project.
- Copy the contents from `.env.example` into this newly created `.env` file.

**Backend Directory**

- Navigate to `/backend`.
- Create a `.env` file inside the `/backend` folder.
- Copy the contents from `/backend/.env.example` into this newly created `.env` file.

---

## 3. Starting the Application

### Install Dependencies

In the **root directory**, open your terminal and run:

```bash
make install
```

This installs dependencies for both the **React Native Expo frontend** and **backend service**.

### Start PostgreSQL Container

Spin up the Postgres container using Docker by running:

```bash
make start
```

### Seed Backend Data

Insert demo data into the database by running:

```bash
make seed
```

### Start Backend Service

Run the backend server locally with:

```bash
make dev
```

### Start Frontend App

Launch the frontend mobile app by running:

```bash
make app
```

When prompted in the terminal, **press `A`** to open an Android emulator.

---
