import "../css/CrmInput.css";

function CrmInput({ title, label, name, type }) {
  return (
    <div>
      {title === undefined ? (
        label === undefined ? (
          type !== "date" ? (
            <input
              className="title_crm"
              type={type}
              name={name}
              placeholder="NOME DA CRM"
            />
          ) : (
            <input
              className="input_crm date_crm"
              type={type}
              name={name}
              id={name}
            />
          )
        ) : (
          <div className="div_crmInfo">
            <label className="label_crm" htmlFor={name}>
              {label}
            </label>

            <textarea
              className="input_crm textarea_crm"
              type={type}
              name={name}
              id={name}
            />
          </div>
        )
      ) : (
        <h1 className="title_crm">{title}</h1>
      )}
    </div>
  );
}

export default CrmInput;
