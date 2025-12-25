import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Firebase config 
const firebaseConfig = {
  apiKey: "AIzaSyBd-01zperwcquxGUSbYL5GU0LG_4rh_P0",
  authDomain: "myportfolio-1711.firebaseapp.com",
  projectId: "myportfolio-1711",
  storageBucket: "myportfolio-1711.firebasestorage.app",
  messagingSenderId: "237285794426",
  appId: "1:237285794426:web:93cac3db696e976347d1c3"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 DOM element
const visitEl = document.getElementById("visitCount");
if (!visitEl) {
  console.error("visitCount element not found");
}

// 🔹 Firestore document
const counterRef = doc(db, "counters", "visitors");

// 🔹 Prevent refresh counts
const hasVisited = localStorage.getItem("visited");

async function updateVisitorCount() {
  try {
    if (!hasVisited) {
      await updateDoc(counterRef, {
        count: increment(1)
      });
      localStorage.setItem("visited", "true");
    }

    const snapshot = await getDoc(counterRef);
    if (snapshot.exists()) {
      visitEl.innerText = snapshot.data().count;
    }
  } catch (err) {
    console.error("Visitor counter error:", err);
    visitEl.innerText = "—";
  }
}

updateVisitorCount();
