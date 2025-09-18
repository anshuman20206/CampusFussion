import { experimental_taintObjectReference } from 'react';

export const env = {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL!,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY!,
};

experimental_taintObjectReference(
  'Do not pass the entire `env` object to the client. ' +
    'Instead, destructure the variables you need.',
  env
);
