
# Eventra - AI-Powered Event Discovery

This is a Next.js application built in Firebase Studio that allows users to discover tech events, get AI-powered recommendations, and search for events in specific locations.

## Features

- **AI Event Search:** Find tech events by city.
- **AI Recommendations:** Get personalized event suggestions based on your profile and interests.
- **User Authentication:** Secure sign-up and login with Firebase Authentication (Google & Phone).
- **User Profiles:** Users can manage their profile information, including skills and professional links.
- **Event Submission & Approval:** Users can submit new events, which admins can approve or reject from a dedicated dashboard.
- **Admin Dashboard:** A protected area for administrators to view platform analytics and manage event submissions.

## Tech Stack & Specifications

This project is a modern, full-stack web application built with the following technologies:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Generative AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
- **UI/UX**: Responsive design, dark mode, and a consistent, modern aesthetic.

---

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [Git](https://git-scm.com/)
- A [Firebase](https://firebase.google.com/) account with a new project created.

### 1. Clone the Repository

First, clone the project from GitHub to your local machine:

```bash
git clone <your-repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Install the necessary npm packages:

```bash
npm install
```

### 3. Set Up Firebase

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (or use an existing one).
2.  In your project dashboard, click the **</>** icon to add a web app.
3.  Give your app a nickname and click "Register app".
4.  Firebase will provide you with a `firebaseConfig` object. You will need these values for the next step.
5.  In the Firebase console, go to **Build > Authentication** and enable a sign-in method (e.g., Google). This is also where you will add your app's domain to the list of **Authorized domains**.
6.  Go to **Build > Firestore Database** and create a database. Start in test mode for easy setup.

### 4. Set Up Environment Variables

1.  In the root of your project, create a new file named `.env`.
2.  Copy the configuration keys from the `firebaseConfig` object (from Step 3.4) and your Google AI API key into the `.env` file. It should look like this:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"

# Google AI (for Genkit)
GOOGLE_API_KEY="YOUR_GOOGLE_AI_API_KEY"
```

**Where to find `GOOGLE_API_KEY`**:
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
- Click "Create API key" and copy the generated key.

### 5. Run the Development Server

You are now ready to start the application:

```bash
npm run dev
```

The application should now be running on [http://localhost:9002](http://localhost:9002).

## Deployment

Firebase App Hosting is a fully-managed, serverless hosting service for web applications. It's an excellent way to host your Next.js app for free.

### 1. Install the Firebase CLI

If you haven't already, install the Firebase Command Line Interface (CLI) globally on your machine.
```bash
npm install -g firebase-tools
```

### 2. Log In to Firebase
Log in to your Firebase account using the CLI. This will open a browser window for you to authenticate.
```bash
firebase login
```

### 3. Initialize App Hosting
In your project's root directory, run the initialization command.
```bash
firebase init apphosting
```
The CLI will guide you through a few steps:
- Select your Firebase project.
- Choose a location for your backend (e.g., `us-central1`).
- It will detect your `apphosting.yaml` file and set up the backend.

### 4. Deploy Your App
Now you can deploy your application to the cloud. First, build the app, then deploy.
```bash
npm run build
firebase apphosting:backends:deploy
```
The CLI will ask which backend to deploy. Select the one you just initialized. After a few minutes, the deployment will complete, and the CLI will provide you with a live URL where you can view your hosted application!
