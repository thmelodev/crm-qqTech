//components
import FilterField from "../components/FilterField";
import CrmStatus from "../components/CrmStatus";

//assets
import Plus from "../assets/plus.png";
import UserImage from "../assets/user_image.jpg";
import Logout from "../assets/Logout.png";

//css
import "../css/Home.css";
import CrmInfo from "../components/CrmInfo";

//hooks
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import crmService from "../services/CrmService";

function Home() {
  let [statusSelected, setStatusSelected] = useState("pending");
  const [rejectedCrms, setRejectedCrms] = useState([]);
  const [pendingCrms, setPendingCrms] = useState([]);
  const [approvedCrms, setApprovedCrms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { signOut } = useContext(AuthContext);
  const userJson = JSON.parse(localStorage.getItem("@Auth:user"));

  useEffect(() => {
    setIsLoading(true);
    if (statusSelected == "rejected") {
      getRejectedCrms(userJson.matricula, localStorage.getItem("@Auth:token"));
    } else if (statusSelected == "pending") {
      getPendingCrms(userJson.matricula, localStorage.getItem("@Auth:token"));
    } else {
      getApprovedCrms(userJson.matricula, localStorage.getItem("@Auth:token"));
    }
    setIsLoading(false);
  }, [statusSelected]);

  const getRejectedCrms = async (matricula, token) => {
    try {
      const response = await crmService.listRejectedCrm(matricula, token);
      setRejectedCrms(JSON.parse(response));
    } catch (error) {
      return error;
    }
  };

  const getPendingCrms = async (matricula, token) => {
    try {
      const response = await crmService.listPendingCrm(matricula, token);
      setPendingCrms(JSON.parse(response));
    } catch (error) {
      return error;
    }
  };

  const getApprovedCrms = async (matricula, token) => {
    try {
      const response = await crmService.listApprovedCrm(matricula, token);
      setApprovedCrms(JSON.parse(response));
    } catch (error) {
      return error;
    }
  };

  return (
    <main className="background_home">
      <div className="header">
        <div className="header_left">
          <div className="user_details">
            <img src={UserImage} alt="Foto de perfil" />
            <div className="user_info">
              <h1 className="user_name">{`${userJson.nome} ${userJson.sobrenome}`}</h1>
              <span className="user_registration">980135</span>
            </div>
          </div>
          <Link to="/createCrm">
            <div className="create_button">
              <input type="button" value="CRIAR CRM" />
              <img src={Plus} alt="Icone de adicionar" />
            </div>
          </Link>
        </div>

        <div className="header_right">
          <img className="logout" onClick={signOut} src={Logout} alt="Sair" />
          <div className="filters">
            <FilterField filterName="crm" type="text" />
            <FilterField filterName="solicitante" type="text" />
            <FilterField
              filterName="abertura"
              type="date"
              placeholder="DD/MM/YYYY"
            />
            <FilterField
              filterName="fechamento"
              type="date"
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
      </div>

      <div className="crm_status">
        <button onClick={() => setStatusSelected("rejected")}>
          <CrmStatus
            title="rejeitados"
            status="rejected"
            isActive={statusSelected === "rejected"}
          />
        </button>

        <button onClick={() => setStatusSelected("pending")}>
          <CrmStatus
            title="pendentes"
            status="pending"
            isActive={statusSelected === "pending"}
          />
        </button>

        <button onClick={() => setStatusSelected("approved")}>
          <CrmStatus
            title="aprovados"
            status="approved"
            isActive={statusSelected === "approved"}
          />
        </button>
      </div>

      {statusSelected === "rejected" ? (
        <div className="crms">
          {rejectedCrms.length == 0 ? (
            <h1 className="notCrm">Nenhuma CRM rejeitada foi encontrada</h1>
          ) : (
            rejectedCrms.map((crm) => {
              return (
                <Link to={`/crm?id=${crm.id}&versao=${crm.versao}`} style={{ textDecoration: "none" }} key={crm.id}>
                  <CrmInfo
                    crmNumber={crm.id}
                    name={crm.nome}
                    status={statusSelected}
                    creator={crm.criador}
                    rejectors={crm.setores}
                  />
                </Link>
              );
            })
          )}
        </div>
      ) : statusSelected === "pending" ? (
        <div className="crms">
          {pendingCrms.length == 0 ? (
            <h1 className="notCrm">Nenhuma CRM pendente foi encontrada</h1>
          ) :
          pendingCrms.map((crm) => {
            return (
              <Link to={`/crm?id=${crm.id}&versao=${crm.versao}`} style={{ textDecoration: "none" }} key={crm.id}>
                <CrmInfo
                  crmNumber={crm.id}
                  name={crm.nome}
                  status={statusSelected}
                  creator={crm.criador}
                  notApproved={crm.setores}
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="crms">
          {approvedCrms.length == 0 ? (
            <h1 className="notCrm">Nenhuma CRM aprovada foi encontrada</h1>
          ) : (
            approvedCrms.map((crm) => {
              console.log(crm)
              return (
                <Link to={`/crm?id=${crm.id}&versao=${crm.versao}`} style={{ textDecoration: "none" }} key={crm.id}>
                  <CrmInfo
                    crmNumber={crm.id}
                    name={crm.nome}
                    status={statusSelected}
                    creator={crm.criador}
                    approved={crm.setores}
                  />
                </Link>
              );
            })
          )}
        </div>
      )}
    </main>
  );
}

export default Home;
