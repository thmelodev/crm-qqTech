import { render } from "react-dom";
import "../css/CrmInfo.css";

function Crm({
  crmNumber,
  title,
  status,
  creator,
  rejectors, 
  notApproved,
  approved,
}) {
  return (
    <div className="background_crmInfo">
      <div className={`border ${status}`}></div>
      <div className="crm_info">
        <h1>
          CRM {crmNumber} - {title}
        </h1>
        <div>
          <span className="criador">
            Criador: <span className="insideSpan">{` ${creator}`}</span>
          </span>
          {status === "rejected" ? (
            <div>
            <span className={`list_title`}>Rejeitado por</span>
            <ul className="insideSpan">
              {rejectors.map((element) => {
                return <li key={element.toString()}>{`${element} \n`}</li>;
              })}
            </ul>
          </div>
          ) : status === "pending" ? (
            <div>
              <span className="list_title">Faltando Aprovação</span>
              <ul className="insideSpan">
                {notApproved.map((element) => {
                  return <li key={element.toString()}>{`${element} \n`}</li>;
                })}
              </ul>
            </div>
          ) : (
            <div>
              <span className="list_title">Aprovado por</span>
              <ul className="insideSpan">
                {approved.map((element) => {
                  return <li key={element.toString()}>{`${element} \n`}</li>;
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
