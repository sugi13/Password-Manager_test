import "../../App.css";
import { useState } from "react";
import { StoreDb } from "../../firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import CryptoJS from "crypto-js";
import SuccessPopup from "./SuccessPopup";

// secret key //
const Secret_key = 'TestingSecret';

export default function PasswordForm({ closeForm }) {

  // state variables //
  const [AccessCodeName, setAccessCodeName] = useState("")
  const [AccessCode, setAccessCode] = useState("");
  const [isSent, setIsSent] = useState(false);

  //collection Ref //
  const DbStore = collection(StoreDb, 'MyAccessCodes');

  // function Send Data //
  const ForwardDataToDb = async (e) => {

    // const Encrypt data //
    const EncryptedCode = CryptoJS.AES.encrypt(JSON.stringify(AccessCode), Secret_key).toString();

    await addDoc(DbStore, {
      AccessCodeName: AccessCodeName,
      AccessCode: EncryptedCode,
      isShown: false,
      ToggleOpen: false
    })
    
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      closeForm(false);
    }, 2000)
  }

  return (
    <div className="Form_popup">
      {
        isSent ? <SuccessPopup /> : <div className="form_content">
          <div className="form_header">
            <h2>Add New Password</h2>
            <p>Enter the necessary information to save your password.</p>
          </div>
          <div className="form_inputs">
            <div className="password_name">
              <label>Password Name</label>
              <input type="text" onChange={(e) => setAccessCodeName(e.target.value)} placeholder="e.g: Wifi password" />
            </div>
            <div className="password">
              <label>Password</label>
              <input type="text" placeholder="Password" onChange={(e) => setAccessCode(e.target.value)} />
            </div>
          </div>
          <div className="form_button">
            {isSent ? <button id='save_btn' disabled onClick={ForwardDataToDb}>Save password </button>: <button id='save_btn' onClick={ForwardDataToDb}>Save password </button>}
            <button id='cancel_btn' onClick={() => closeForm(false)}>Cancel</button>
          </div>
        </div>
      }
    </div>
  )
}
