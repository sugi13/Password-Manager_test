import { useState } from "react";
import "../../App.css"
import { doc, updateDoc } from "firebase/firestore";
import { StoreDb } from "../../firebase/FirebaseConfig";
import CryptoJS from "crypto-js";

export default function EditForm({setToggleEditForm, id, PasswordName}) {

    const Secret_key = 'TestingSecret';
    const [EditPasswordValue, setEditPasswordValue] = useState("");

    const closeEditForm = () => {
        setToggleEditForm(false);
    }

    const HandlePasswordUpdate = async(e) => {
        e.preventDefault();

        const UpdateEncryptedCode = CryptoJS.AES.encrypt(JSON.stringify(EditPasswordValue), Secret_key).toString();

        const updationInfo = doc(StoreDb, "MyAccessCodes", id);
        const newData = {
            AccessCode: UpdateEncryptedCode
        }

        await updateDoc(updationInfo, newData);
    }

  return (
    <div className="Edit_Password_form">
        <div className="form_content">
          <div className="form_header">
            <h2>Edit Password</h2>
          </div>
          <div className="form_inputs">
            <div className="password_name">
              <label>Password Name</label>
              <input type="text" value={PasswordName}/>
            </div>
            <div className="password">
              <label>Password</label>
              <input type="text" placeholder="Password" onChange={e => setEditPasswordValue(e.target.value)}/>
            </div>
          </div>
          <div className="form_button">
            <button id='save_btn' onClick={HandlePasswordUpdate}>Update password </button>
            <button id='cancel_btn' onClick={closeEditForm}>Cancel</button>
          </div>
        </div>
    </div>
  )
}
