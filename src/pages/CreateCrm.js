//components
import CrmInput from "../components/CrmInput";
import FileUpload from "../components/FileUpload";
import File from "../components/File";
import Sector from "../components/Sector";

//assets
import Vector from "../assets/vector.svg";

//css
import "../css/CreateCrm.css";

//hooks
import React, { useEffect, useState } from "react";
import setorService from "../services/SetorService";
import crmService from "../services/CrmService";
import { useNavigate } from "react-router-dom";
import System from "../components/System";
import sistemaService from "../services/SistemaService";

function CreateCrm() {
  const [nome, setNome] = useState("");
  const [necessidade, setNecessidade] = useState(null);
  const [impactoCriacao, setImpactoCriacao] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [objetivo, setObjetivo] = useState(null);
  const [justificativa, setJustificativa] = useState(null);
  const [alternativas, setAlternativas] = useState(null);
  const [dataLegal, setDataLegal] = useState(null);
  const [comportamentoOffline, setComportamentoOffline] = useState(null);
  const [setores, setSetores] = useState([]);
  const [setoresEnvolvidos, setSetoresEnvolvidos] = useState(["TI"]);
  const [sistemas, setSistemas] = useState([]);
  const [sistemasEnvolvidos, setSistemasEnvolvidos] = useState([]);
  const [arquivos, setArquivos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [colaboradorCriador, setColaboradorCriador] = useState();

  const navigate = useNavigate();

  const handleCreateCrm = async (evt) => {
    setIsLoading(true);
    evt.preventDefault();
    const data = {
      nome: nome,
      necessidade: necessidade,
      impacto: impactoCriacao,
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
    if (crmResponse.message === "CADASTRADA") {
      alert("Crm cadastrada com sucesso");
      navigate("/home");
    } else {
      alert("Erro ao cadastrar CRM, por favor entre em contato com o suporte");
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
  
  useEffect(() => {
    getSectors(localStorage.getItem("@Auth:token"));
    getSystems(localStorage.getItem("@Auth:token"));
    setColaboradorCriador(
      JSON.parse(localStorage.getItem("@Auth:user")).matricula
    );
  }, []);

  return (
    <main className="background_crm">
      <div className={"statusCrm creating"}></div>
      <form className="form_crm">
        <div className="header_crm_creating">
          <button onClick={handleReturnPage} className="header_img">
            <img src={Vector} alt="Icone de voltar" />
          </button>
          <CrmInput type="text" onChange={(e) => setNome(e.target.value)} />
        </div>
        <CrmInput
          type="text"
          label="A necessidade de *"
          name="necessidade"
          onChange={(e) => setNecessidade(e.target.value)}
        />

        <div className="sectorsDiv">
          <span className="sectorDivTitle">setores envolvidos</span>
          <div className="sectors">
            {setores.map((setor, i) => {
              return (
                <Sector
                  key={i}
                  sector={setor.nome}
                  setoresEnvolvidos={setoresEnvolvidos}
                  setSetoresEnvolvidos={setSetoresEnvolvidos}
                />
              );
            })}
          </div>
        </div>

        <CrmInput
          type="text"
          label="Cujo impacto é *"
          name="impactoCriacao"
          onChange={(e) => setImpactoCriacao(e.target.value)}
        />
        <CrmInput
          type="text"
          label="Descrição *"
          name="descricao"
          onChange={(e) => setDescricao(e.target.value)}
        />
        <CrmInput
          type="text"
          label="Objetivo *"
          name="objetivo"
          onChange={(e) => setObjetivo(e.target.value)}
        />
        <CrmInput
          type="text"
          label="Justificativa *"
          name="justificativa"
          onChange={(e) => setJustificativa(e.target.value)}
        />
        <CrmInput
          type="text"
          label="Alternativas"
          name="alternativa"
          onChange={(e) => setAlternativas(e.target.value)}
        />
        <span className="label_date">Possui data Legal?</span>
        <div className="radioDataLegal">
          <div>
            <input
              type="radio"
              name="legalData"
              value="yes"
              id="yes"
              onChange={handleLegalDate}
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
        </div>
        <div id="date">
          <CrmInput
            type="date"
            name="dataLegal"
            onChange={(e) => setDataLegal(e.target.value)}
          />
        </div>
        <div className="sectorsDiv">
          <span className="sectorDivTitle">sistemas envolvidos</span>
          <div className="sectors">
            {sistemas.map((sistema, i) => {
              return (
                <System
                  key={i}
                  system={sistema.nome}
                  sistemasEnvolvidos={sistemasEnvolvidos}
                  setSistemasEnvolvidos={setSistemasEnvolvidos}
                />
              );
            })}
          </div>
        </div>

        <CrmInput
          type="text"
          label="Comportamento Offline"
          name="comportamentoOffline"
          onChange={(e) => setComportamentoOffline(e.target.value)}
        />

        <div className="filesDiv">
          <span className="filesDiv_title">Arquivos</span>
          <div className="files">
            {arquivos.map((file, i) => {
              return <File key={i} file={file} />;
            })}
          </div>
          <div className="filesAdd" value="adicionar arquivos">
            <span>ADICIONAR ARQUIVOS</span>
            <FileUpload
              files={arquivos}
              setFiles={setArquivos}
              className="file_upload"
            />
          </div>
        </div>

        <input
          className="submit"
          type="submit"
          onClick={handleCreateCrm}
          value="enviar crm"
        />
      </form>
    </main>
  );
}

export default CreateCrm;
