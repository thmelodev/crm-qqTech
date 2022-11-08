import "../css/CrmInfo.css";

function CrmInfo({
  crmNumber,
  name,
  status,
  creator,
  rejectors,
  notApproved,
  approved,
  version,
  abertura,
  fechamento,
}) {

  return (
    <div className="background_crmInfo">
      <div className={`border ${status}`}></div>
      <div className="crm_info">
        <h1>
          CRM {crmNumber} - {name}
        </h1>
        <div>
          <div className="header_info">
            <span className="atribute">
              Criador: <span className="insideSpan">{` ${creator}`}</span>
            </span>

            {!!version ? (
              <span className="atribute">
                Versao: <span className="insideSpan">{` ${version}`}</span>
              </span>
            ) : null}

            {!!abertura ? (
              <span className="atribute">
                Data de abertura:{" "}
                <span className="insideSpan">{` ${abertura}`}</span>
              </span>
            ) : null}
            
          </div>

          {status === "rejected" ? (
            <div>
              {!!rejectors ? (
                <>
                  <span className={`list_title`}>Rejeitado por</span>
                  <ul className="insideSpan">
                    {rejectors.map((rejector, i) => {
                      return <li key={i}>{rejector}</li>;
                    })}
                  </ul>
                </>
              ) : null}
            </div>
          ) : status === "pending" ? (
            <div>
              {!!notApproved ? (
                <>
                  <span className="list_title">Faltando Aprovação</span>
                  <ul className="insideSpan insideSpanPending">
                    {notApproved.map((element, i) => {
                      if (i == notApproved.length - 1) {
                        return <li key={element.toString()}>{`${element}`}</li>;
                      } else {
                        return (
                          <li key={element.toString()}>{`${element},`}</li>
                        );
                      }
                    })}
                  </ul>
                </>
              ) : null}
            </div>
          ) : (
            <div>
              {!!approved ? (
                <>
                  <span className="list_title">Aprovado por</span>
                  <ul className="insideSpan">
                    {approved.map((approver, i) => {
                      return <li key={i}>{`${approver}`}</li>;
                    })}
                  </ul>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CrmInfo;
