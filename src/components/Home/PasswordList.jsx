import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { StoreDb } from "../../firebase/FirebaseConfig";
import CryptoJS from "crypto-js";
import "../../App.css";
import { ChevronDownSmall, ChevronUpSmall } from "akar-icons";
import PasswordDetails from "./PasswordDetails";

export default function PasswordList() {
  const [PasswordArray, setPasswordArray] = useState([]);

  const DbStore = collection(StoreDb, "MyAccessCodes");

  const Secret_key = "TestingSecret";

  // Fetch data from firestore
  useEffect(() => {
    const Unsubscribe = onSnapshot(DbStore, (snapshot) => {
      setPasswordArray(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return Unsubscribe;
  }, []);

  // Toggle visibility //
  const ToggleVisibilityDiv = (id) => {
    setPasswordArray((Passwords) =>
      Passwords.map((password) =>
        password.id === id
          ? { ...password, ToggleOpen: !password.ToggleOpen }
          : password
      )
    );
  };


  return (
    <div className="PasswordList">
      <h1 id="Header">All Passwords</h1>
      <p className="Header_phrase">
        Safeguarding your passwords has never been easier.
      </p>
      {PasswordArray.map((Password, Id) => {
        return (
          <div key={Id} className="Password-container-list">
            <div className="Name_toggle-btn">
              <div className="Password_Name">
                <p>{Password.AccessCodeName}</p>
              </div>
              <div className="Show_password">
                {Password.ToggleOpen ? (
                  <ChevronUpSmall
                    size={17}
                    className="btn"
                    onClick={() => ToggleVisibilityDiv(Password.id)}
                  />
                ) : (
                  <ChevronDownSmall
                    size={17}
                    className="btn"
                    onClick={() => ToggleVisibilityDiv(Password.id)}
                  />
                )}
              </div>
            </div>
            {Password.ToggleOpen ? (
              <PasswordDetails
                PasswordData={PasswordArray}
                currentId={Password.id}
                setPasswordArray={setPasswordArray}
              />
            ) : (
              <div></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
