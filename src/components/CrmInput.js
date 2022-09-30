function CrmInput({ title, label, name, type }) {
  return (
    <div>
      {title === undefined ? (
        label === undefined ? (
          <input type={type} name={name} />
        ) : (
          <div>
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} id={name} />
          </div>
        )
      ) : (
        <h1>{title}</h1>
      )}
    </div>
  );
}

export default CrmInput;