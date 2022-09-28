//assets
import RejectedIcon from "../assets/x_mark.png";
import RejectedIconLowOpacity from "../assets/x_mark_lowOpacity.png";
import PendingIcon from "../assets/hourGlass.png";
import PendingIconLowOpacity from "../assets/hourGlass_lowOpacity.png";
import ApprovedIcon from "../assets/approved.png";
import ApprovedIconLowOpacity from "../assets/approved_lowOpacity.png";

//css
import "../css/CrmStatus.css";

function CrmStatus({ title, isActive, status, ...rest }) {
  const selectIconHighOpacity =
    status === "rejected"
      ? RejectedIcon
      : status === "pending"
      ? PendingIcon
      : ApprovedIcon;

  const selectIconLowOpacity =
    status === "rejected"
      ? RejectedIconLowOpacity
      : status === "pending"
      ? PendingIconLowOpacity
      : ApprovedIconLowOpacity;

  const selectBackground = `crm_filter ${isActive ? status : "white"}`;

  const selectColor = isActive
    ? `crm_status crm_status_${status}`
    : "crm_status crm_status_NotActive";

  return (
    <div className={selectBackground}>
      <h1 className={selectColor}>{title}</h1>
      <img
        className="crm_icon"
        src={isActive === true ? selectIconHighOpacity : selectIconLowOpacity}
        alt="Icone de X"
      /> 
    </div>
  );
}

export default CrmStatus;
