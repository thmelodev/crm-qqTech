import "../css/CrmInput.css";

function CrmInput({ title, label, name, type, onChange,value,readOnly}) {

  
  return (
    <div>
      {title === undefined ? (
        label === undefined ? (
          type !== "date" ? (
            <input
              className="title_crm"
              type={type}
              name={name}
              value={value}
              placeholder="NOME DA CRM"
              onChange={onChange}
              readOnly={readOnly}
            />
          ) : (
            <input
              className="input_crm date_crm"
              type={type}
              name={name}
              id={name}
              value={value}
              onChange={onChange}
              readOnly={readOnly}
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
              value={value}
              readOnly={readOnly != true ? false : true}
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
