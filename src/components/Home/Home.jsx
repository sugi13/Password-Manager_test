import "../../App.css";
import { useState } from "react";
import PasswordForm from "../form/PasswordForm";
import PasswordList from "./PasswordList";
import { Plus } from "akar-icons";

export default function Home() {

    const [ShowForm, setShowForm] = useState(false);

    function ToggleForm() {
        setShowForm(true);
    }

    return (
        <div className="Home_div">
            <div className="title_action_btn">
                <div className="title">
                    <h2>My Passwords</h2>
                </div>
                <div className="action_btn">
                    <button id='action-btn' onClick={ToggleForm}> <Plus size={17} />Add New Password</button>
                </div>
            </div>
            {ShowForm && <PasswordForm closeForm={setShowForm} />}
            <PasswordList />
        </div>
    )
}
