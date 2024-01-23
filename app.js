// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyz4DWLjGTWPSfTDGe55VfVuAJIUc6Du4",
  authDomain: "chatt-bd58c.firebaseapp.com",
  databaseURL: "https://chatt-bd58c-default-rtdb.firebaseio.com",
  projectId: "chatt-bd58c",
  storageBucket: "chatt-bd58c.appspot.com",
  messagingSenderId: "1041929010795",
  appId: "1:1041929010795:web:f492d17e6f2ce18c63fb2e",
  measurementId: "G-G32S5P4N89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Reference to the messages in the database
const messagesRef = firebase.database().ref('messages');

// Function to send a message
function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();

  if (message !== '') {
    messagesRef.push({
      text: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });

    messageInput.value = '';
  }
}

// Function to display messages
function displayMessages(snapshot) {
  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML = '';

  snapshot.forEach((childSnapshot) => {
    const message = childSnapshot.val();
    const messageElement = document.createElement('p');
    messageElement.textContent = message.text;
    chatBox.appendChild(messageElement);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Listen for changes in the messages
messagesRef.on('value', (snapshot) => {
  displayMessages(snapshot);
});
