# MindTrack

### Mental Health Tracking. 

Functionally acts as a Diary with some useful visualization.

Originally inspired by my Fitbit App, I wanted to be able to not only log the mood I was in, but I wanted to be able to keep a log of what I was feeling.

Created entirely in Next.js using NextUI's component library.

Colors may be off since I developed this entire project in Chrome using the forced dark mode for all web pages.
This is the successor to my failed mobile application which was the same thing, but using React-Native. largely recycled my code from that project to use here.


### Data Storage

All storage is handled by Firebase (Firestore). Entries are in plain text, so while other users won't see your data, the admin (me) can.
Adapting this to being market-ready would require setting up a backend to handle data encryption and decryption which is well outside the scope of my project (for no other reason than hosting).

### OAuth

Using the Application as is requires a google account to sign in with. Effectively needs a login to access the app.


# cloning

To clone this project you will need to set up your own Firebase project to get a configuration file from Firebase.

in src, set up config/Firebase.js

Will look like

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx,
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx",
  measurementId: "xxx",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

```

### Known Bugs

Table will auto sort on deleting an entry. Only way I know how to fix it is with using a state manager which is too high a time investment for such a small bug.

---
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
