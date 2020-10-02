import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

let API = prompt('Введите API к серверу Firebase');

const config = {
    apiKey: API,
    authDomain: "my-project-vuso.firebaseapp.com",
    databaseURL: 'https://my-project-vuso.firebaseio.com',
    storageBucket: "my-project-vuso.appspot.com",
    projectId: "my-project-vuso"
};

const inputs = document.querySelectorAll('input'),
      upload = document.querySelectorAll('[name="upload"]');

const clearInputs = () => {
    inputs.forEach(item => {
        item.value = "";
    });
    upload.forEach(item => {
        item.previousElementSibling.textContent = "Файл не выбран";
    });
};

firebase.initializeApp(config);

const database = firebase.firestore();
const storageRef = firebase.storage().ref();

const postData = (url, data) => {
    clearInputs();
    return database.collection(url).add(data)
};

const uploadFile = (name, file) => {
    clearInputs();
    return storageRef.child('images/' + name).put(file)
};

const getResource = async (collection) => {
    return await database.collection(collection).get();
};

export {postData, uploadFile, getResource};