// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, addDoc, setDoc } from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const auth = getAuth(app);
const storage = getStorage(app);
let allTasks = []

export async function getTasks() {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        allTasks.push({ ...doc.data(), id: doc.id })
    });

    return allTasks;
}

export async function addUserToDb(userInfo, id) {
    try {
        await setDoc(doc(db, "users", id), userInfo);
        console.log("user written with ID: ", id);   
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

export async function createUser(userInfo){

    try{
    userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.pass) 
    
    // Signed in

    const user = userCredential.user;
    console.log(user)

    //subir imagen

       const url = await uploadFile(user.uid+userInfo.picture.name, userInfo.picture, 'profilePicture')
    
       // crear usuario en DB

    const dbInfo = {
        url,
        email: userInfo.email,
        birthday: userInfo.birthday,
        username: userInfo.username
    }
addUserToDb(dbInfo, user.uid)

    }

  catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error.message)
    // ..
  }
}

export async function uploadFile(name, file, folder) {
    
    try {
        const taskImgRef = ref(storage, `${folder}/${name}`);
        await uploadBytes(taskImgRef, file);
        const url = await getDownloadURL(taskImgRef);
        return url;
    } catch (error) {
        console.log("error creando imagen ->", error);
    }
}
