//assets
import Vector from "../assets/vector.svg";

//css
import "../css/Versions.css";

//componentes

//hooks
import { useEffect, useState } from "react";

//services
import crmService from "../services/CrmService";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import CrmInfo from "../components/CrmInfo";

function Versions() {
  const [thisCrm, setThisCrm] = useState();
  const [allCrms, setAllCrms] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //Pegar params da url
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  function getStatusCrm(setoresEnvolvidos) {
    const sectorsWithPendingFlag = setoresEnvolvidos.filter(checkPendingFlag);
    const sectorsWithRejectedFlag = setoresEnvolvidos.filter(checkRejectedFlag);
    const sectorsWithApprovedFlag = setoresEnvolvidos.filter(checkApprovedFlag);
    if (sectorsWithPendingFlag.length > 1) {
      return "pending";
    } else if (
      sectorsWithRejectedFlag.length >= 1 &&
      sectorsWithPendingFlag.length <= 1
    ) {
      return "rejected";
    } else if (setoresEnvolvidos.length == sectorsWithApprovedFlag.length) {
      return "approved";
    } else {
      return "pending";
    }
  }

  const getAllCrm = async (crmId, token) => {
    try {
      const response = JSON.parse(await crmService.getAllCrms(crmId, token));
      response.reverse();
      setAllCrms(response);
    } catch (e) {
      alert("erro ao buscar versões, entre em contato com o suporte");
    }
  };

  const getCrm = async (crmId, crmVersao, token) => {
    try {
      const response = JSON.parse(
        await crmService.getCrm(crmId, crmVersao, token)
      );
      setThisCrm(response[0]);
      setIsLoading(false);
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  function checkPendingFlag(setorEnvolvido) {
    return setorEnvolvido.flag == "pendente";
  }

  function checkRejectedFlag(setorEnvolvido) {
    return setorEnvolvido.flag == "rejeitado";
  }

  function checkApprovedFlag(setorEnvolvido) {
    return setorEnvolvido.flag == "aprovado";
  }

  function formatDate(date, format) {

    let dia = String(date.getDate());
    let mes = String(date.getMonth() + 1)
    
    if(dia.length < 2) dia = '0' + dia
    if(mes.length < 2) mes = '0' + mes

    date = format.replace('dd', dia)
    .replace('mm', mes)
    .replace('aa', date.getFullYear().toString());

    return date
  }

  async function fetchData() {
    const maxVersion = JSON.parse(
      await crmService.maxVersion(id, localStorage.getItem("@Auth:token"))
    );
    await getAllCrm(id, localStorage.getItem("@Auth:token"));
    await getCrm(id, maxVersion.versao, localStorage.getItem("@Auth:token"));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="background_versions">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className={`statusCrm ${getStatusCrm(
              thisCrm.setoresEnvolvidos,
              localStorage.getItem("@Auth:token")
            )}`}
          ></div>
          <div className="container">
            <div className="header_versions">
              <Link to={`/crm?id=${thisCrm.id}&versao=${thisCrm.versao}`}>
                <button className="header_versionsImg">
                  <img src={Vector} alt="Icone de voltar" />
                </button>
              </Link>
              <h1>{thisCrm.nome}</h1>
            </div>
            <div className="listVersions">
              {allCrms.map((crm) => {
                return(
                <Link to={`/crm?id=${crm.id}&versao=${crm.versao}`} style={{ textDecoration: "none" }} key={crm.versao}>
                  {console.log(crm)}
                  <CrmInfo
                    crmNumber={crm.id}
                    version={crm.versao}
                    abertura={formatDate(new Date(crm.dataAbertura), "dd/mm/aa")}
                    name={crm.nome}
                    status={getStatusCrm(crm.setoresEnvolvidos)}
                    creator={`${crm.colaboradorCriador.nome} ${crm.colaboradorCriador.sobrenome}`}
                  />
                </Link>
              )})}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Versions;
