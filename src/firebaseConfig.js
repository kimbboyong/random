import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // 이 부분을 추가합니다.

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "random-react-f7b1b.firebaseapp.com",
  databaseURL:
    "https://random-react-f7b1b-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "random-react-f7b1b",
  storageBucket: "random-react-f7b1b.appspot.com",
  messagingSenderId: "1067429448057",
  appId: "1:1067429448057:web:906ec84fd1e9a6a96287a8",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const reference = ref(db, "path/to/your/data");

onValue(reference, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

export const googleLogin = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
};
