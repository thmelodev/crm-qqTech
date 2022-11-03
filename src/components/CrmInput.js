import "../css/CrmInput.css";

function CrmInput({ title, label, name, type, onChange, value, readOnly }) {

  function isReadOnly() {
    if (readOnly) {
      const divInput = document.getElementsByClassName(`input_crm_${name}`);
      if (!!divInput[0]) {
        if (!!divInput[0].querySelector("input")) {
          divInput[0].querySelector("input").style.opacity = 0.8;
          divInput[0].querySelector("input").style.cursor = "default";
        } else {
          divInput[0].querySelector("textarea").style.opacity = 0.8;
          divInput[0].querySelector("textarea").style.cursor = "default";
        }
      }
    } else {
      const divInput = document.getElementsByClassName(`input_crm_${name}`);
      if (!!divInput[0]) {
        if (!!divInput[0].querySelector("input")) {
          divInput[0].querySelector("input").style.opacity = 1;
        } else {
          divInput[0].querySelector("textarea").style.opacity = 1;
        }
      }
    }
    return readOnly;
  }

  function displayFlex() {
    const radioYes = document.getElementById("yes");
    const dateInput = document.getElementById("date");
    if (!!radioYes && radioYes.checked) {
      dateInput.style.display = "flex";
    }
  }

  return (
    <div className={`input_crm_${name} container_input_crm`}>
      {title === undefined ? (
        label === undefined ? (
          type !== "date" ? (
            isReadOnly() ? (
              <input
                className="title_crm"
                type={type}
                name={name}
                value={value}
                placeholder="NOME DA CRM"
                onChange={onChange}
                readOnly
              />
            ) : (
              <input
                className="title_crm"
                type={type}
                name={name}
                value={value}
                placeholder="NOME DA CRM"
                onChange={onChange}
              />
            )
          ) : isReadOnly() ? (
            <>
              {displayFlex()}
              <input
                className="input_crm date_crm"
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                readOnly
              />
            </>
          ) : (
            <>
              <input
                className="input_crm date_crm"
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
              />
              {displayFlex()}
            </>
          )
        ) : (
          <div className="div_crmInfo">
            <label className="label_crm" htmlFor={name}>
              {label}
            </label>
            {isReadOnly() ? (
              <textarea
                className="input_crm textarea_crm"
                type={type}
                name={name}
                id={name}
                onChange={onChange}
                value={value}
                readOnly
              />
            ) : (
              <textarea
                className="input_crm textarea_crm"
                type={type}
                name={name}
                id={name}
                onChange={onChange}
                value={value}
              />
            )}
          </div>
        )
      ) : (
        <h1 className="title_crm">{title}</h1>
      )}
    </div>
  );
}

export default CrmInput;
