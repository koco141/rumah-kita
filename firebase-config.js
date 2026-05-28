// ==========================================
//  RumahKita — Firebase Configuration
// ==========================================

// Firebase configuration object (Spark Plan - Free Tier)
// NOTE: Admin/User can update these keys with their own Firebase project config in the future.
const firebaseConfig = {
  apiKey: "AIzaSyBPV3MSDPBU7x87jGav03d0Htawi7i-ACs",
  authDomain: "keluarga-sumadiwirja-portal.firebaseapp.com",
  projectId: "keluarga-sumadiwirja-portal",
  storageBucket: "keluarga-sumadiwirja-portal.firebasestorage.app",
  messagingSenderId: "922104764412",
  appId: "1:922104764412:web:32875848968d9f33f94479",
  measurementId: "G-GWPYYJX74S"
};

// Initialize Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Global database and auth shortcuts
const db = (typeof firebase !== 'undefined') ? firebase.firestore() : null;
const auth = (typeof firebase !== 'undefined') ? firebase.auth() : null;

// Enable offline persistence for Firestore if available (premium UX)
if (db) {
  db.enablePersistence().catch((err) => {
    if (err.code == 'failed-precondition') {
      console.warn("Offline persistence failed: Multiple tabs open.");
    } else if (err.code == 'unimplemented') {
      console.warn("Offline persistence is not supported by this browser.");
    }
  });
}
