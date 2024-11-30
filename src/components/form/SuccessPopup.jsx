import "../../App.css";
import SuccessImg from '../../assets/check.png';

export default function SuccessPopup() {
  return (
    <div className="SuccessPopup">
        <img src = {SuccessImg} className="successLogo"/>
        <div className="successText">
          <p>Your Password saved successfully</p>
        </div>
    </div>
  )
}
