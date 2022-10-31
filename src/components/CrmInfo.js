import "../css/CrmInfo.css";

function Crm({
  crmNumber,
  name,
  status,
  creator,
  rejectors, 
  notApproved,
  approved,
}) {
  
  return (
    <div className="background_crmInfo" >
      <div className={`border ${status}`}></div>
      <div className="crm_info">
        <h1>
          CRM {crmNumber} - {name}
        </h1>
        <div>
          <span className="criador">
            Criador: <span className="insideSpan">{` ${creator}`}</span>
          </span>
          
          {status === "rejected" ? (
            <div>
            <span className={`list_title`}>Rejeitado por</span>
            <ul className="insideSpan">
              {rejectors.map((rejector,i) => {
                return <li key={i}>{rejector}</li>;
              })}
            </ul>
          </div>
          ) : status === "pending" ? (
            <div>
              <span className="list_title">Faltando Aprovação</span>
              <ul className="insideSpan insideSpanPending">
                {notApproved.map((element,i) => {
                  if(i == notApproved.length - 1){
                    return <li key={element.toString()}>{`${element}`}</li>;
                  }else{
                    return <li key={element.toString()}>{`${element},`}</li>;
                  }
                })}
              </ul>
            </div>
          ) : (
            <div>
              <span className="list_title">Aprovado por</span>
              <ul className="insideSpan">
                {approved.map((approver,i) => {
                  return <li key={i}>{`${approver}`}</li>;
                })}
              </ul>
            </div>
              )}
        </div>
      </div>
    </div>
  );
}

export default Crm;
