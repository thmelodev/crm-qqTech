//components
import FilterField from "../components/FilterField";
import CrmStatus from "../components/CrmStatus";

//assets
import Plus from "../assets/plus.png";
import Logout from "../assets/Logout.png";

//css
import "../css/Home.css";
import CrmInfo from "../components/CrmInfo";

//hooks
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import crmService from "../services/CrmService";
import documentoService from "../services/DocumentoService";
import Loading from "../components/Loading";
import LoadingComponents from "../components/LoadingComponents";


function Home() {
  let [statusSelected, setStatusSelected] = useState("pending");
  const [rejectedCrms, setRejectedCrms] = useState([]);
  const [pendingCrms, setPendingCrms] = useState([]);
  const [approvedCrms, setApprovedCrms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCrms, setIsLoadingCrms] = useState(true);
  const image = useRef('')

  //filters
  const [filterCrm, setFilterCrm] = useState("");
  const [filterSolicitante, setFilterSolicitante] = useState("");
  const [filterAbertura1, setFilterAbertura1] = useState("");
  const [filterAbertura2, setFilterAbertura2] = useState("");

  const { signOut } = useContext(AuthContext);
  const userJson = JSON.parse(localStorage.getItem("@Auth:user"));

  const getRejectedCrms = async (matricula, token) => {
    try {
      const response = await crmService.listRejectedCrm(matricula, token);
      setRejectedCrms(JSON.parse(response));
    } catch (error) {
      return error;
    }
  };

  const getPhoto = async (pathPhoto) => {
    const blobData = await documentoService.getDocument(
      pathPhoto,
      localStorage.getItem("@Auth:token")
    );
    let urlCreator = window.URL || window.webkitURL;
    pathPhoto = urlCreator.createObjectURL(blobData);
    image.current = document.createElement('image');
    image.current.src = pathPhoto;
  };

  function filterAll(crms) {
    if (filterCrm != "") crms = crms.filter((crm) => crm.id == filterCrm);
    if (filterSolicitante != "")
      crms = crms.filter(
        (crm) =>
          crm.criador.toLowerCase().indexOf(filterSolicitante.toLowerCase()) !=
          -1
      );
    if (filterAbertura1 != "" && filterAbertura2 != "") {
      crms = crms.filter(
        (crm) =>
          formatDate(new Date(crm.dataabertura), "aa-mm-dd") >=
            filterAbertura1 &&
          formatDate(new Date(crm.dataabertura), "aa-mm-dd") <= filterAbertura2
      );
    } else if (filterAbertura1 != "") {
      crms = crms.filter(
        (crm) =>
          formatDate(new Date(crm.dataabertura), "aa-mm-dd") >= filterAbertura1
      );
    } else if (filterAbertura2 != "") {
      crms = crms.filter(
        (crm) =>
          formatDate(new Date(crm.dataabertura), "aa-mm-dd") <= filterAbertura2
      );
    }

    return crms;
  }

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

  function formatDate(date, format) {
    let dia = String(date.getDate());
    let mes = String(date.getMonth() + 1);

    if (dia.length < 2) dia = "0" + dia;
    if (mes.length < 2) mes = "0" + mes;

    date = format
      .replace("dd", dia)
      .replace("mm", mes)
      .replace("aa", date.getFullYear().toString());

    return date;
  }

  async function fetchData(){
    if(document.getElementById("photo") == undefined){
      const pathUploads = 'C:/Users/980135/Desktop/codes/CRM/api-crm/dist/uploads/photo_matricula_colaborador_'
      await getPhoto(
        `${pathUploads}${userJson.matricula}.jpg`
      );
      setIsLoading(false)
    }
    

    if (statusSelected == "rejected") {
      await getRejectedCrms(userJson.matricula, localStorage.getItem("@Auth:token"));
    } else if (statusSelected == "pending") {
      await getPendingCrms(userJson.matricula, localStorage.getItem("@Auth:token"));
    } else {
      await getApprovedCrms(userJson.matricula, localStorage.getItem("@Auth:token"));
    }
    setIsLoadingCrms(false)
  }

  useEffect(() => {
    setIsLoadingCrms(true)
    fetchData()
  }, [statusSelected]);

  

  return (
    <main className="background_home">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="header">
            <div className="header_left">
              <div className="user_details">
                <img id="photo" src={image.current.src} alt="Foto de perfil" />
                <div className="user_info">
                  <h1 className="user_name">{`${userJson.nome} ${userJson.sobrenome}`}</h1>
                  <span className="user_registration">{`${userJson.setor.nome} `}</span>
                  <span className="user_registration">{`${userJson.matricula}`}</span>
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
              <img
                className="logout"
                onClick={signOut}
                src={Logout}
                alt="Sair"
              />
              <div className="filters">
                <div className="div_filters">
                  <FilterField
                    filterName="número da crm"
                    type="text"
                    filterState={filterCrm}
                    setFilterState={setFilterCrm}
                  />
                  <FilterField
                    filterName="solicitante"
                    type="text"
                    filterState={filterSolicitante}
                    setFilterState={setFilterSolicitante}
                  />
                </div>
                <span className="filter_name">data de abertura</span>
                <div className="div_filters">
                  <FilterField
                    type="date"
                    placeholder="DD/MM/YYYY"
                    filterState={filterAbertura1}
                    setFilterState={setFilterAbertura1}
                  />
                  <FilterField
                    type="date"
                    placeholder="DD/MM/YYYY"
                    filterState={filterAbertura2}
                    setFilterState={setFilterAbertura2}
                  />
                </div>
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
              {filterAll(rejectedCrms).length == 0 ? (
                <h1 className="notCrm">Nenhuma CRM rejeitada foi encontrada</h1>
              ) : (
                filterAll(rejectedCrms).map((crm) => {
                  return (
                    <Link
                      to={`/crm?id=${crm.id}&versao=${crm.versao}`}
                      style={{ textDecoration: "none" }}
                      key={crm.id}
                    >
                      <CrmInfo
                        crmNumber={crm.id}
                        version={crm.versao}
                        abertura={formatDate(
                          new Date(crm.dataabertura),
                          "dd/mm/aa"
                        )}
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
              {filterAll(pendingCrms).length == 0 ? (
                <h1 className="notCrm">Nenhuma CRM rejeitada foi encontrada</h1>
              ) : (
                filterAll(pendingCrms).map((crm) => {
                  return (
                    <Link
                      to={`/crm?id=${crm.id}&versao=${crm.versao}`}
                      style={{ textDecoration: "none" }}
                      key={crm.id}
                    >
                      <CrmInfo
                        crmNumber={crm.id}
                        version={crm.versao}
                        abertura={formatDate(
                          new Date(crm.dataabertura),
                          "dd/mm/aa"
                        )}
                        name={crm.nome}
                        status={statusSelected}
                        creator={crm.criador}
                        notApproved={crm.setores}
                      />
                    </Link>
                  );
                })
              )}
            </div>
          ) : (
            <div className="crms">
              {filterAll(approvedCrms).length == 0 ? (
                <h1 className="notCrm">Nenhuma CRM rejeitada foi encontrada</h1>
              ) : (
                filterAll(approvedCrms).map((crm) => {
                  console.log(crm);
                  return (
                    <Link
                      to={`/crm?id=${crm.id}&versao=${crm.versao}`}
                      style={{ textDecoration: "none" }}
                      key={crm.id}
                    >
                      <CrmInfo
                        crmNumber={crm.id}
                        version={crm.versao}
                        abertura={formatDate(
                          new Date(crm.dataabertura),
                          "dd/mm/aa"
                        )}
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
        </>
      )}
    </main>
  );
}

export default Home;
