// src/config/firebase.config.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage, Messaging } from "firebase/messaging";
import { API_URL } from "../serviceUrl";
import { VAPID_KEY } from "../serviceUrl";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const messaging: Messaging = getMessaging(app);

export const requestFcmToken = async (email: string): Promise<void> => {
  try {
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    console.log("FCM Token:", token);

    await fetch(`${API_URL}/v1/api/user/fcm-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email }),
    });
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

// Handle foreground notifications
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
  // Handle foreground notifications (e.g., show a toast)
});

export default storage;