import "../css/CrmInput.css";

function CrmInput({ title, label, name, type, onChange, value, readOnly, placeholder }) {

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

  function displayFlex(radioYesID,divInputID) {
    const radioYes = document.getElementById(radioYesID);
    const div_input = document.getElementById(divInputID);
    if (!!radioYes && radioYes.checked) {
      div_input.style.display = "flex";
    }
  }

  return (
    <div className={`input_crm_${name} container_input_crm`}>
      {title === undefined ? (
        label === undefined ? (
          type !== "date" ? (
            isReadOnly() ? ( 
              name == 'desenvolvimentoDependente'
              ? (
                <>
                  <input
                    className="title_crm"
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    readOnly
                  />
                  {displayFlex("yesDesenvolvimento",'desenvolvimento')}
                </>
              ) :
              (
                <input
                  className="title_crm"
                  type={type}
                  id={name}
                  name={name}
                  value={value}
                  placeholder={placeholder}
                  onChange={onChange}
                  readOnly
                />
              )
            ) : ( 
              name == 'desenvolvimentoDependente'
              ? (
                <>
                  <input
                    className="title_crm"
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                  />
                  {displayFlex("yesDesenvolvimento",'desenvolvimento')}
                </>
              ) :
              (
                <input
                  className="title_crm"
                  type={type}
                  id={name}
                  name={name}
                  value={value}
                  placeholder={placeholder}
                  onChange={onChange}
                />
              )
            )
          ) : isReadOnly() ? (
            <>
              <input
                className="input_crm date_crm"
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                readOnly
              />
              {displayFlex("yes",'date')}
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
              {displayFlex("yes",'date')}
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
