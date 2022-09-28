import "../css/Crm.css";

function Crm({
  crmNumber,
  title,
  status,
  creator,
  rejector,
  motive,
  notApproved,
  approved,
}) {
  return (
    <div className="crm_background">
      <div className={`border ${status}`}></div>
      <div className="crm_info">
        <h1>
          CRM {crmNumber} - {title}
        </h1>
        <div>
          <span>
            Criador: <span className="insideSpan">{` ${creator}`}</span>
          </span>
          {status === "rejected" ? (
            <div>
              <span>
                Rejeitado por: <span className="insideSpan" >{` ${rejector}`}</span>
              </span>
              <span>Motivo:<span className="insideSpan" >{motive}</span></span>
            </div>
          ) : status === "pending" ? (
            <div>
              <span>
                    Falta Aprovação:<span className="insideSpan" >{`${notApproved.join(', ')}`}</span>
              </span>
            </div>
          ) : (
            <div>
                <span>
                    Aprovado por:<span className="insideSpan" >{` ${approved.join(', ')}`}</span>
                </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Crm;
