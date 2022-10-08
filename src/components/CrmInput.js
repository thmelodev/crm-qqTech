import "../css/CrmInput.css";

function CrmInput({ title, label, name, type, onChange }) {
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
              onChange={onChange}
            />
          ) : (
            <input
              className="input_crm date_crm"
              type={type}
              name={name}
              id={name}
              onChange={onChange}
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
              onChange={onChange}
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
