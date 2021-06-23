import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCaEPba6gIRtNlvobIn1snqL8Dph-ylIyc",
  authDomain: "cartitem-a2d51.firebaseapp.com",
  projectId: "cartitem-a2d51",
  storageBucket: "cartitem-a2d51.appspot.com",
  messagingSenderId: "738736079489",
  appId: "1:738736079489:web:b16c9a748466ec2a5fc380"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

