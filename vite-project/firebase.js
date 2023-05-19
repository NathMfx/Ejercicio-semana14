// Import the functions you need from the SDKs you need
import { initializeApp } from "@app";
import { collection, getDocs, getFirestore, addDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAD7uZR0-kVREToBeeUNOMj7XKvQKvMX0k",
    authDomain: "todo-list-64a35.firebaseapp.com",
    projectId: "todo-list-64a35",
    storageBucket: "todo-list-64a35.appspot.com",
    messagingSenderId: "50524719749",
    appId: "1:50524719749:web:709d411cdc436fa48337ec",
    measurementId: "G-VWW6G3Y0N8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let allTasks = []

export async function getTasks() {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        allTasks.push({ ...doc.data(), id: doc.id })
    });

    return allTasks;
}

export async function addTask(taskTitle) {
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            title: taskTitle,

        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function editDocument(title, id) {

    // Add a new document in collection "cities"
    await setDoc(doc(db, "tasks", id), {
        title: title,
        completed: true,
    });
}