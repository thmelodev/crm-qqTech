//components
import CrmInput from "../components/CrmInput";
import FileUpload from "../components/FileUpload";
import File from "../components/File";

//assets
import Vector from "../assets/vector.svg";
import Version from "../assets/version_control.png";

//css
import "../css/Crm.css";

//hooks
import React, { useEffect, useRef, useState } from "react";
import System from "../components/System";
import setorService from "../services/SetorService";
import sistemaService from "../services/SistemaService";
import { useNavigate } from "react-router-dom";
import crmService from "../services/CrmService";
import Loading from "../components/Loading";
import SectorInvolved from "../components/SectorInvolved";
import FlagSelected from "../components/FlagSelected";
import Sector from "../components/Sector";

function Crm() {
  const [crm, setCrm] = useState([]);
  const [user, setUser] = useState();
  const [nome, setNome] = useState("");
  const [necessidade, setNecessidade] = useState("");
  const [impacto, setImpacto] = useState("");
  const [impactoMudanca, setImpactoMudanca] = useState("");
  const [descricao, setDescricao] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [justificativa, setJustificativa] = useState("");
  const [alternativas, setAlternativas] = useState("");
  const [dataLegal, setDataLegal] = useState("");
  const [comportamentoOffline, setComportamentoOffline] = useState("");
  const [setores, setSetores] = useState([]);
  const [setoresEnvolvidos, setSetoresEnvolvidos] = useState([]);
  const [addSetoresEnvolvidos, setAddSetoresEnvolvidos] = useState([]);
  const [sistemas, setSistemas] = useState([]);
  const [sistemasEnvolvidos, setSistemasEnvolvidos] = useState([]);
  const [arquivos, setArquivos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [colaboradorCriador, setColaboradorCriador] = useState("");
  const [selectedFlag, setSelectedFlag] = useState("pendente");
  const [motivoRejeicao, setMotivoRejeicao] = useState("");
  const [canEdit, setCanEdit] = useState("")
  const statusCrm = useRef("");

  async function userIsCreadorAndIsNotPendingAndCrmIsMaxVersion(crmId,crmVersao,matriculaColaboradorCriador,crmSetoresEnvolvidos) {
    const maxVersion = JSON.parse(
      await crmService.maxVersion(crmId, localStorage.getItem("@Auth:token"))
    );
    const MatriculaUser = JSON.parse(localStorage.getItem("@Auth:user")).matricula
    if (
      matriculaColaboradorCriador == MatriculaUser &&
      getStatusCrm(crmSetoresEnvolvidos) != "pending" &&
      crmVersao == maxVersion.versao
    )
      setCanEdit(true);
    else setCanEdit(false);
  }
 
  function filterSectores(crmSetoresEnvolvidos,allSetores){
    for(const sector of crmSetoresEnvolvidos){
      allSetores = allSetores.filter((setor) => setor.nome != sector.nomeSetor)
    }
    setSetores(allSetores)
  }

  const navigate = useNavigate();
  //Pegar params da url
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const versao = urlParams.get("versao");

  const handleCreateCrm = async (evt) => {
    setIsLoading(true);
    evt.preventDefault();

    let data = {
      nome: nome,
      necessidade: necessidade,
      impacto: impacto,
      descricao: descricao,
      objetivo: objetivo,
      justificativa: justificativa,
      alternativas: alternativas,
      dataLegal: dataLegal,
      comportamentoOffline: comportamentoOffline,
      colaboradorCriador: colaboradorCriador,
      setoresEnvolvidos: setoresEnvolvidos,
      sistemasEnvolvidos: sistemasEnvolvidos,
      documentos: arquivos,
    };

    const crmResponse = JSON.parse(
      await crmService.createCrm(data, localStorage.getItem("@Auth:token"))
    );
    setIsLoading(false);
    if (crmResponse.message === "SUCESSO") {
      alert("Crm cadastrada com sucesso");
      navigate("/home");
    } else {
      alert("Erro ao cadastrar CRM, por favor entre em contato com o suporte");
    }
  };

  const handleUpdateCrm = async (evt) => {
    setIsLoading(true);
    evt.preventDefault();
    if (true) {
      let data = {
        id: crm.id,
        versao: crm.versao,
        nome: nome,
        necessidade: necessidade,
        impacto: impacto,
        descricao: descricao,
        objetivo: objetivo,
        justificativa: justificativa,
        alternativas: alternativas,
        dataLegal: dataLegal,
        comportamentoOffline: comportamentoOffline,
        colaboradorCriador: colaboradorCriador,
        setoresEnvolvidos: setoresEnvolvidos.concat(addSetoresEnvolvidos),
        sistemasEnvolvidos: sistemasEnvolvidos,
        documentos: arquivos,
      };

      const crmResponse = JSON.parse(
        await crmService.updateCrm(data, localStorage.getItem("@Auth:token"))
      );
      setIsLoading(false);
      if (crmResponse.message === "SUCESSO") {
        alert("Crm atualizada com sucesso");
        navigate("/home");
      } else {
        alert(
          "Você não tem autorização de atualizar a CRM ou ela está pendente no momento"
        );
        setAddSetoresEnvolvidos([])
      }

      
    } else {

    }
  };

  const handleRejectCrm = async () => {
    const setorEnvolvido = setoresEnvolvidos.filter(
      (setor) => setor.nomeSetor == user.setor.nome
    );

    let data = {
      id: crm.id,
      versao: crm.versao,
      setorEnvolvido: setorEnvolvido[0],
    };

    const crmResponse = JSON.parse(
      await crmService.rejectCrm(data, localStorage.getItem("@Auth:token"))
    );

    if (crmResponse.message === "SUCESSO") {
      alert("Rejeição feita com sucesso");
      navigate("/home");
    } else {
      alert("Erro ao rejeitar CRM, por favor entre em contato com o suporte");
    }
  };

  const handleApproveCrm = async () => {
    const setorEnvolvido = setoresEnvolvidos.filter(
      (setor) => setor.nomeSetor == user.setor.nome
    );

    let data = {
      id: crm.id,
      versao: crm.versao,
      setorEnvolvido: setorEnvolvido[0],
    };

    const crmResponse = JSON.parse(
      await crmService.approveCrm(data, localStorage.getItem("@Auth:token"))
    );

    if (crmResponse.message === "SUCESSO") {
      alert("Aprovação feita com sucesso");
      navigate("/home");
    } else {
      alert("Erro ao rejeitar CRM, por favor entre em contato com o suporte");
    }
  };

  const handleReturnPage = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const handleLegalDate = () => {
    const div_date = document.getElementById("date");
    const div_radio = document.getElementsByClassName("radioDataLegal")[0];
    if (
      document.querySelector('input[name="legalData"]:checked').value === "yes"
    ) {
      div_date.style.opacity = 1;
      div_date.style.display = "flex";
      div_radio.style.marginBottom = "0";
    } else {
      div_date.style.display = "none";
      div_radio.style.marginBottom = "3rem";
    }
  };

  const getSectors = async (token) => {
    try {
      const response = await setorService.listSectors(token);
      setSetores(response);
    } catch (error) {
      return error;
    }
  };

  const getSystems = async (token) => {
    try {
      const response = await sistemaService.listSystems(token);
      setSistemas(response);
    } catch (error) {
      return error;
    }
  };

  const getCrm = async (crmId, crmVersao, token) => {
    try {
      const response = JSON.parse(
        await crmService.getCrm(crmId, crmVersao, token)
      );
      await userIsCreadorAndIsNotPendingAndCrmIsMaxVersion(response[0].id,response[0].versao,response[0].colaboradorCriador.matricula,response[0].setoresEnvolvidos)
      setCrm(response[0]);
      if (!!response[0].alternativas) {
        setAlternativas();
      }
      if (!!response[0].comportamentoOffline) {
        setComportamentoOffline(response[0].comportamentoOffline);
      }

      if (!!response[0].colaboradorCriador) {
        setColaboradorCriador(response[0].colaboradorCriador);
      }

      if (!!response[0].dataLegal) {
        setDataLegal(response[0].dataLegal);
      }

      if (!!response[0].descricao) {
        setDescricao(response[0].descricao);
      }

      if (!!response[0].impacto) {
        setImpacto(response[0].impacto);
      }

      if (!!response[0].justificativa) {
        setJustificativa(response[0].justificativa);
      }

      if (!!response[0].necessidade) {
        setNecessidade(response[0].necessidade);
      }

      if (!!response[0].nome) {
        setNome(response[0].nome);
      }

      if (!!response[0].objetivo) {
        setObjetivo(response[0].objetivo);
      }

      if (!!response[0].setoresEnvolvidos) {
        const response2 = await setorService.listSectors(token);
        filterSectores(response[0].setoresEnvolvidos,response2)
        setSetoresEnvolvidos(response[0].setoresEnvolvidos);
        statusCrm.current = getStatusCrm(response[0].setoresEnvolvidos);
      }

      if (!!response[0].sistemasEnvolvidos) {
        setSistemasEnvolvidos(response[0].sistemasEnvolvidos);
      }
    } catch (error) {
      return console.log(error);
    }
  };

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

  function checkPendingFlag(setorEnvolvido) {
    return setorEnvolvido.flag == "pendente";
  }

  function checkRejectedFlag(setorEnvolvido) {
    return setorEnvolvido.flag == "rejeitado";
  }

  function checkApprovedFlag(setorEnvolvido) {
    return setorEnvolvido.flag == "aprovado";
  }

  function sistemasEnvolvidosContainsSistema(sistemaEnvolvido, nomeSistema) {
    const sistemaEnvolvidoWithSistema = sistemaEnvolvido.filter(
      (sistemaEnvolvido) => sistemaEnvolvido.nomeSistema == nomeSistema
    );
    if (sistemaEnvolvidoWithSistema.length == 1) return true;
    else return false;
  }

  async function fetchData() {
    await getSectors(localStorage.getItem("@Auth:token"));
    await getCrm(id, versao, localStorage.getItem("@Auth:token"));
    await getSystems(localStorage.getItem("@Auth:token"));
    setUser(JSON.parse(localStorage.getItem("@Auth:user")));
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="background_crm">
      {console.log(impactoMudanca)}
      {selectedFlag == "rejeitado" || selectedFlag == "aprovado" ? (
        <FlagSelected
          flagSelected={selectedFlag}
          setSelectedFlag={setSelectedFlag}
          setoresEnvolvidos={setoresEnvolvidos}
          motivoRejeicao={motivoRejeicao}
          setMotivoRejeicao={setMotivoRejeicao}
          user={user}
          handleRejectCrm={handleRejectCrm}
          handleApproveCrm={handleApproveCrm}
          impactoMudanca={impactoMudanca}
          setImpactoMudanca={setImpactoMudanca}
        />
      ) : null}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={`statusCrm ${statusCrm.current}`}></div>
          <form className="form_crm">
            <div className="header_crm">
              <button className="header_img" onClick={handleReturnPage}>
                <img src={Vector} alt="Icone de voltar" />
              </button>
              {!canEdit ? (
                <CrmInput
                  type="text"
                  name="nome"
                  onChange={(e) => setNome(e.target.value)}
                  value={nome}
                  readOnly={true}
                />
              ) : (
                <CrmInput
                  type="text"
                  name="nome"
                  onChange={(e) => setNome(e.target.value)}
                  value={nome}
                  readOnly={false}
                />
              )}

              <button className={`version_background ${statusCrm.current}`}>
                <img src={Version} alt="Icone de versionamento" />
              </button>
            </div>
            {!canEdit ? (
              <CrmInput
                type="text"
                label="A necessidade de *"
                name="necessidade"
                onChange={(e) => setNecessidade(e.target.value)}
                value={necessidade}
                readOnly={true}
              />
            ) : (
              <CrmInput
                type="text"
                label="A necessidade de *"
                name="necessidade"
                onChange={(e) => setNecessidade(e.target.value)}
                value={necessidade}
                readOnly={false}
              />
            )}

            <div className="sectorsDiv">
              <span className="sectorDivTitle">setores envolvidos</span>
              <div className="sectors">
                {setoresEnvolvidos.map((setorEnvolvido, i) => {
                  if (
                    user.matricula == crm.colaboradorCriador.matricula ||
                    setorEnvolvido.flag != "pendente" ||
                    user.setor.nome != setorEnvolvido.nomeSetor ||
                    (setorEnvolvido.nomeSetor == "TI" &&
                      statusCrm.current != "pending")
                  ) {
                    return (
                      <SectorInvolved
                        key={i}
                        sector={setorEnvolvido}
                        isreadOnly={true}
                        setSelectedFlag={setSelectedFlag}
                        user={user}
                      />
                    );
                  } else {
                    return (
                      <SectorInvolved
                        key={i}
                        sector={setorEnvolvido}
                        isreadOnly={false}
                        setSelectedFlag={setSelectedFlag}
                        user={user}
                      />
                    );
                  }
                })}
              </div>
            </div>
            {canEdit 
            ? (
              <div className="sectorsDiv">
              <span className="sectorDivTitle">Adicionar Setores Envolvidos</span>
              <div className="sectors">
                {setores.map((setor, i) => {
                  return (
                    <Sector
                      key={i}
                      sector={setor.nome}
                      setoresEnvolvidos={addSetoresEnvolvidos}
                      setSetoresEnvolvidos={setAddSetoresEnvolvidos}
                    />
                  );
                })}
              </div>
            </div>
            ): null}

            {!canEdit ? (
              <>
                <CrmInput
                  type="text"
                  label="Cujo impacto é *"
                  name="impacto"
                  onChange={(e) => setImpacto(e.target.value)}
                  value={impacto}
                  readOnly={true}
                />
                <CrmInput
                  type="text"
                  label="Descrição *"
                  name="descricao"
                  onChange={(e) => setDescricao(e.target.value)}
                  value={descricao}
                  readOnly={true}
                />
                <CrmInput
                  type="text"
                  label="Objetivo *"
                  name="objetivo"
                  onChange={(e) => setObjetivo(e.target.value)}
                  value={objetivo}
                  readOnly={true}
                />
                <CrmInput
                  type="text"
                  label="Justificativa *"
                  name="justificativa"
                  onChange={(e) => setJustificativa(e.target.value)}
                  value={justificativa}
                  readOnly={true}
                />
                <CrmInput
                  type="text"
                  label="Alternativas"
                  name="alternativa"
                  onChange={(e) => setAlternativas(e.target.value)}
                  value={alternativas}
                  readOnly={true}
                />
              </>
            ) : (
              <>
                <CrmInput
                  type="text"
                  label="Cujo impacto é *"
                  name="impacto"
                  onChange={(e) => setImpacto(e.target.value)}
                  value={impacto}
                  readOnly={false}
                />
                <CrmInput
                  type="text"
                  label="Descrição *"
                  name="descricao"
                  onChange={(e) => setDescricao(e.target.value)}
                  value={descricao}
                  readOnly={false}
                />
                <CrmInput
                  type="text"
                  label="Objetivo *"
                  name="objetivo"
                  onChange={(e) => setObjetivo(e.target.value)}
                  value={objetivo}
                  readOnly={false}
                />
                <CrmInput
                  type="text"
                  label="Justificativa *"
                  name="justificativa"
                  onChange={(e) => setJustificativa(e.target.value)}
                  value={justificativa}
                  readOnly={false}
                />
                <CrmInput
                  type="text"
                  label="Alternativas"
                  name="alternativa"
                  onChange={(e) => setAlternativas(e.target.value)}
                  value={alternativas}
                  readOnly={false}
                />
              </>
            )}

            <span className="label_date">Possui data Legal?</span>
            <div className="radioDataLegal">
              {!canEdit &&
              crm.dataLegal != null &&
              crm.dataLegal != undefined ? (
                <>
                  <div>
                    <input
                      type="radio"
                      name="legalData"
                      value="yes"
                      id="yes"
                      onChange={handleLegalDate}
                      defaultChecked
                    />
                    <label htmlFor="yes">Sim</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="legalData"
                      value="no"
                      id="no"
                      onChange={handleLegalDate}
                      disabled
                    />
                    <label htmlFor="no">Não</label>
                  </div>
                </>
              ) : !canEdit &&
                (crm.dataLegal == null || crm.dataLegal == undefined) ? (
                <>
                  <div>
                    <input
                      type="radio"
                      name="legalData"
                      value="yes"
                      id="yes"
                      onChange={handleLegalDate}
                      disabled
                    />
                    <label htmlFor="yes">Sim</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="legalData"
                      value="no"
                      id="no"
                      onChange={handleLegalDate}
                      defaultChecked
                    />
                    <label htmlFor="no">Não</label>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <input
                      type="radio"
                      name="legalData"
                      value="yes"
                      id="yes"
                      onChange={handleLegalDate}
                      defaultChecked
                    />
                    <label htmlFor="yes">Sim</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="legalData"
                      value="no"
                      id="no"
                      onChange={handleLegalDate}
                    />
                    <label htmlFor="no">Não</label>
                  </div>
                </>
              )}
            </div>
            <div id="date">
              {!canEdit && crm.dataLegal != null ? (
                <CrmInput
                  type="date"
                  name="dataLegal"
                  onChange={(e) => setDataLegal(e.target.value)}
                  value={dataLegal}
                  readOnly={true}
                />
              ) : (
                <CrmInput
                  type="date"
                  name="dataLegal"
                  onChange={(e) => setDataLegal(e.target.value)}
                  value={dataLegal}
                  readOnly={false}
                />
              )}
            </div>
            <div className="sectorsDiv">
              <span className="sectorDivTitle">sistemas envolvidos</span>
              <div className="sectors">
                {!canEdit
                  ? sistemas.map((sistema, i) => {
                      return (
                        <System
                          key={i}
                          system={sistema.nome}
                          sistemasEnvolvidos={sistemasEnvolvidos}
                          setSistemasEnvolvidos={setSistemasEnvolvidos}
                          defaultChecked={sistemasEnvolvidosContainsSistema(
                            sistemasEnvolvidos,
                            sistema.nome
                          )}
                          readOnly={true}
                        />
                      );
                    })
                  : sistemas.map((sistema, i) => {
                      return (
                        <System
                          key={i}
                          system={sistema.nome}
                          sistemasEnvolvidos={sistemasEnvolvidos}
                          setSistemasEnvolvidos={setSistemasEnvolvidos}
                          defaultChecked={sistemasEnvolvidosContainsSistema(
                            sistemasEnvolvidos,
                            sistema.nome
                          )}
                          readOnly={false}
                        />
                      );
                    })}
              </div>
            </div>
            {!canEdit ? (
              <CrmInput
                type="text"
                label="Comportamento Offline"
                name="comportamentoOffline"
                onChange={(e) => setComportamentoOffline(e.target.value)}
                value={comportamentoOffline}
                readOnly={true}
              />
            ) : (
              <CrmInput
                type="text"
                label="Comportamento Offline"
                name="comportamentoOffline"
                onChange={(e) => setComportamentoOffline(e.target.value)}
                value={comportamentoOffline}
                readOnly={false}
              />
            )}

            <div className="filesDiv">
              <span className="filesDiv_title">Arquivos</span>
              <div className="files">
                {arquivos.length > 0 ? (
                  arquivos.map((file, i) => {
                    return <File key={i} file={file} />;
                  })
                ) : (
                  <h1 className="noFiles">Nenhum arquivo selecionado</h1>
                )}
              </div>
            </div>

            {!canEdit ? null : (
              <>
                <div className="filesAdd" value="adicionar arquivos">
                  <span>ADICIONAR ARQUIVOS</span>
                  <FileUpload
                    files={arquivos}
                    setFiles={setArquivos}
                    className="file_upload"
                  />
                </div>

                <input
                  className="submit"
                  type="submit"
                  onClick={handleUpdateCrm}
                  value="enviar crm"
                />
              </>
            )}
          </form>
        </>
      )}
    </main>
  );
}

export default Crm;
