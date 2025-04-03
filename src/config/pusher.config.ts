


// const pusher = new Pusher({
//     appId: "1884305",
//     key: "c462b5bac64f9adbfdcf",
//     secret: "a063729c1300ec571571",
//     cluster: "mt1",
//     useTLS: true
// });

// src/config/pusher.ts
import Pusher from 'pusher';


// Function to validate environment variables
function getRequiredEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

// Get and validate environment variables
const PUSHER_APP_ID = getRequiredEnvVar('PUSHER_APP_ID');
const PUSHER_APP_KEY = getRequiredEnvVar('PUSHER_APP_KEY');
const PUSHER_APP_SECRET = getRequiredEnvVar('PUSHER_APP_SECRET');
const PUSHER_APP_CLUSTER = getRequiredEnvVar('PUSHER_APP_CLUSTER');

// Initialize Pusher with validated environment variables
const pusher = new Pusher({
    appId: PUSHER_APP_ID,
    key: PUSHER_APP_KEY,
    secret: PUSHER_APP_SECRET,
    cluster: PUSHER_APP_CLUSTER,
    useTLS: true
});

export default pusher;

// Optional: Export the environment checking function for reuse
export { getRequiredEnvVar };