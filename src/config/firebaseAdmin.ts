import * as admin from "firebase-admin";
import serviceAccount from "../serviceAccount.json" // Adjust the path

// Type the service account (you can refine this further if needed)
const serviceAccountTyped = serviceAccount as admin.ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountTyped),
});

export default admin;