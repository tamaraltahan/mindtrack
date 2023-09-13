# MindTrack

### Mental Health Tracking. 

Welcome to MindTrack. This is a web application which functions as a digital diary. 
Write in entrties, or simply leave an emoji as a record of how you're feeling for the day which you can view as a graph over time to get an idea of how your mental health has been over a period of time, or view it in a compact chart.
Sort through your best and worst days, check our your notes, and get a better understanding of which days have the most impact for you.

Originally inspired by my Fitbit App, I wanted to be able to not only log the mood I was in, but I wanted to be able to keep a log of what I was feeling.
Created entirely in Next.js using NextUI's component library.
Updated to NextUI 2.0

### New Entry
![entry](https://github.com/tamaraltahan/mindtrack/assets/3060378/11078163-a55f-423d-9112-26c4c8a8191e)

### Chart
![chart](https://github.com/tamaraltahan/mindtrack/assets/3060378/48a22ffe-dc51-41d8-ac24-3b18d8b83252)

### History
![history](https://github.com/tamaraltahan/mindtrack/assets/3060378/fcba7bc8-2249-4abb-8961-3fd031f30b8e)

### Individual entry view
![modal](https://github.com/tamaraltahan/mindtrack/assets/3060378/06dedf99-67b9-4753-bed0-ba8967bb4130)

### Data Storage

All storage is handled by Firebase (Firestore). Entries are in plain text, so while other users won't see your data, the admin (me) can.
Adapting this to being market-ready would require setting up a backend to handle data encryption and decryption which is well outside the scope of my project (for no other reason than hosting).

### OAuth

Using the Application as is requires a google account to sign in with. Effectively needs a login to access the app.

# cloning

To clone this project you will need to set up your own Firebase project to get a configuration file from Firebase.
Create the file, `.env.local` in the root folder of the project, then set the key value pairs that coincide with the ones in /src/config/Firebase.js

# Misc

#### Known Bugs

Table will auto sort on deleting an entry. Only way I know how to fix it is with using a state manager which is too high a time investment for such a small bug.

#### Future plans
1. Add an insights tab - include some stats.\
   a. entry count\
   b. month with the most given entries\
   c. best and worst days of the week\
   d. variance between seasons\
2. Debating on adding an anonymous mode where anyone can contribute an entry to a 'global' user so users can interact with the site without logging in. This invites risk, may choose to display a dummy profile which cannot be edited by end users.
3. minor fixes including cleaning up the logout button, change the cursor highlight on the emojis to not be text
   

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
