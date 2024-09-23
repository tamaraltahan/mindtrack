import { signInWithRedirect, signInWithPopup } from "firebase/auth";
import { googleProvider, db, auth } from "../config/Firebase";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { useEffect } from "react";

const imgSrc = "/images/btn_google_signin_dark_focus_web2x.png";

const Authenticator = ({ setUser }) => {

  useEffect(() => {
    console.log("Authenticator component setUser:", typeof setUser);
  }, []);

  const [currentUser, setCurrentUser] = useState(null);

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };
  
  const signInWithGoogle = async () => {
    try {
      if (isMobileDevice()) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        await signInWithPopup(auth, googleProvider);
      }
      setCurrentUser(auth.currentUser);
      if (currentUser) {
        const googleUserId = currentUser.uid;
        const email = currentUser.email;

        // Check if the user already exists
        const userRef = db.collection("Users").doc(googleUserId);
        const userSnapshot = await userRef.get();
        setUser(currentUser);
        if (userSnapshot.exists) {
          // User already exists, no need to create a new collection
          // console.log("User already exists");
        } else {
          const userCollectionRef = db
            .collection("Users")
            .doc(googleUserId)
            .collection();
          await userCollectionRef.doc("Profile").set({
            email,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {auth.currentUser ? (
        <div className="AuthContainerCenter">
          <div className="containerRight">
            <UserMenu 
              authToken={auth.currentUser}
              setUser={setUser}
              auth={auth}
            />
          </div>
        </div>
      ) : (
        <div className="containerCenter">
          <p className="text">Please sign in to get started</p>
          <img
            className="googleButton cursor-pointer"
            src={imgSrc}
            onClick={signInWithGoogle}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};

export default Authenticator;
