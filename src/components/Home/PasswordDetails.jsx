import "../../App.css";
import CryptoJS from "crypto-js";
import { EyeSlashed, EyeOpen, Clipboard, Edit, TrashCan } from "akar-icons";
import "animate.css";
import EditForm from "../form/EditForm";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { StoreDb } from "../../firebase/FirebaseConfig";

export default function PasswordDetails({
  PasswordData,
  currentId,
  setPasswordArray,
}) {
  const Secret_key = "TestingSecret";

  const [ToggleEditForm, setToggleEditForm] = useState(false);

  // decrypt password //
  function DecryptData(accessCode, isShown) {
    const decrypted = CryptoJS.AES.decrypt(accessCode, Secret_key).toString(
      CryptoJS.enc.Utf8
    );
    try {
      return (
        <input
          className="password_field "
          type={isShown ? "text" : "password"}
          defaultValue={JSON.parse(decrypted)}
        />
      );
    } catch (err) {
      return null;
    }
  }

  // ToggleVisibility //
  const ToggleVisibilityDiv = (id) => {
    setPasswordArray((Passwords) =>
      Passwords.map((password) =>
        password.id === id
          ? { ...password, isShown: !password.isShown }
          : password
      )
    );
  };

  // Toggle Edit Form //
  const EnableToggleEditForm = (id) => {
    setToggleEditForm(true);
  };
  //copy to clipboard //
  const CopyToClipboard = (id, accessCode) => {
    PasswordData.map((item) => {
      if (item.id === id) {
        alert("Copy to clipboard");
        const decrypted = CryptoJS.AES.decrypt(accessCode, Secret_key).toString(
          CryptoJS.enc.Utf8
        );
        navigator.clipboard.writeText(JSON.parse(decrypted));
      }
    });
  };

  // Remove Password //
  const HandleRemove = async (id) => {
    const DeletePassword = doc(StoreDb, "MyAccessCodes", id);
    await deleteDoc(DeletePassword);
  };

  return (
    <div className="Password_details animate__animated animate__fadeIn">
      {PasswordData.map((item, id) => {
        if (currentId === item.id) {
          return (
            <div key={id} className="details_data">
              <p>{item.AccessCodeName}</p>
              {DecryptData(item.AccessCode, item.isShown)}
              <div className="Action_btn">
                {item.isShown ? (
                  <EyeSlashed
                    color="#413F42"
                    className="btn"
                    size={17}
                    onClick={() => ToggleVisibilityDiv(item.id)}
                  />
                ) : (
                  <EyeOpen
                    color="#413F42"
                    size={17}
                    className="btn"
                    onClick={() => ToggleVisibilityDiv(item.id)}
                  />
                )}
                <Edit
                  className="btn"
                  onClick={() => EnableToggleEditForm(item.id)}
                  size={17}
                  color="#413F42"
                />
                <Clipboard
                  className="btn"
                  size={17}
                  color="#413F42"
                  onClick={() => CopyToClipboard(item.id, item.AccessCode)}
                />
                <TrashCan
                  className="btn"
                  size={17}
                  color="#413F42"
                  onClick={() => HandleRemove(item.id)}
                />
                {ToggleEditForm && (
                  <EditForm
                    PasswordName={item.AccessCodeName}
                    id={item.id}
                    setToggleEditForm={setToggleEditForm}
                  />
                )}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
