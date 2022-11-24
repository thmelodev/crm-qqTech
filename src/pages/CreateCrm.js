//components
import CrmInput from "../components/CrmInput";
import FileUpload from "../components/FileUpload";
import FileItem from "../components/FileItem";
import Sector from "../components/Sector";

//assets
import Vector from "../assets/vector.svg";

//css
import "../css/CreateCrm.css";

//hooks
import React, { useEffect, useState } from "react";
import setorService from "../services/SetorService";
import crmService from "../services/CrmService";
import { Form, useNavigate } from "react-router-dom";
import System from "../components/System";
import sistemaService from "../services/SistemaService";

function CreateCrm() {
  const [nome, setNome] = useState("");
  const [necessidade, setNecessidade] = useState("");
  const [impacto, setImpacto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [justificativa, setJustificativa] = useState("");
  const [alternativas, setAlternativas] = useState("");
  const [dataLegal, setDataLegal] = useState(undefined);
  const [comportamentoOffline, setComportamentoOffline] = useState("");
  const [setores, setSetores] = useState([]);
  const [setoresEnvolvidos, setSetoresEnvolvidos] = useState(["TI"]);
  const [sistemas, setSistemas] = useState([]);
  const [sistemasEnvolvidos, setSistemasEnvolvidos] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [desenvolvimentoDependente, setDesenvolvimentoDependente] = useState('')
  const [colaboradorCriador, setColaboradorCriador] = useState();
  
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateCrm = async (evt) => {
    setIsLoading(true);
    evt.preventDefault();

    let requiredFields = [
      nome,
      necessidade,
      impacto,
      descricao,
      objetivo,
      justificativa,
    ];
    let requiredFieldsIsOk = true;
    for (const field of requiredFields) {
      if (field == "") {
        requiredFieldsIsOk = false;
        break;
      }
    }

    if (requiredFieldsIsOk) {
      const data = new FormData();
      data.append("nome", nome);
      data.append("necessidade", necessidade);
      data.append("impacto", impacto);
      data.append("descricao", descricao);
      data.append("objetivo", objetivo);
      data.append("justificativa", justificativa);
      data.append("alternativas", alternativas);
      data.append("dataLegal", dataLegal);
      data.append("desenvolvimentoDependente",desenvolvimentoDependente)
      data.append("comportamentoOffline", comportamentoOffline);
      data.append("colaboradorCriador", JSON.stringify(colaboradorCriador));

      for (const setorEnvolvido of setoresEnvolvidos) {
        data.append("setoresEnvolvidos", setorEnvolvido);
      }

      for (const sistemaEnvolvido of sistemasEnvolvidos) {
        data.append("sistemasEnvolvidos", sistemaEnvolvido);
      }

      for (const documento of documentos) {
        if (documento instanceof File) {
          data.append("documentos", documento, documento.name);
        } else {
          data.append("documentosComPath", documento);
        }
      }
      const crmResponse = JSON.parse(
        await crmService.createCrm(data, localStorage.getItem("@Auth:token"))
      );
      setIsLoading(false);
      if (crmResponse.message === "SUCESSO") {
        alert("Crm cadastrada com sucesso");
        navigate("/home");
      } else {
        alert(
          "Erro ao cadastrar CRM, por favor entre em contato com o suporte"
        );
      }
    }else{
      alert('Campos obrigatórios não preenchidos')
    }
  };

  const handleReturnPage = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const handleLegalDate = () => {
    const div_date = document.getElementById("date");
    const div_radio = document.getElementsByClassName("radioDataLegal")[0];
    const dateLegalInput = document.getElementById("dataLegal");
    if (
      document.querySelector('input[name="legalData"]:checked').value === "yes"
    ) {
      div_date.style.display = "flex";
      div_radio.style.marginBottom = "0";
    } else {
      dateLegalInput.value = undefined;
      div_date.style.display = "none";
      div_radio.style.marginBottom = "2rem";
    }
  };

  const handleDesenvolvimento = () => {
    const div_desenvolvimento = document.getElementById("desenvolvimento");
    const div_radio = document.getElementsByClassName("radioDesenvolvimento")[0];
    const desenvolvimentoDependenteInput = document.getElementById("desenvolvimentoDependente");
    console.log(document.querySelector('input[name="desenvolvimentoDependente"]:checked'))
    if (
      document.querySelector('input[name="desenvolvimentoDependente"]:checked').value === "yes"
    ) {
      div_desenvolvimento.style.display = "flex";
      div_desenvolvimento.style.marginBottom = "3rem";
      div_radio.style.marginBottom = "0";
    } else {
      desenvolvimentoDependenteInput.value = '';
      div_desenvolvimento.style.display = "none";
      div_radio.style.marginBottom = "2rem";
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
          <CrmInput type="text" onChange={(e) => setNome(e.target.value)} placeholder='NOME DA CRM'/>
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
          onChange={(e) => setImpacto(e.target.value)}
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
            {documentos.length > 0 ? (
              documentos.map((file, i) => {
                return <FileItem key={i} file={file} />;
              })
            ) : (
              <h1 className="noFiles">Nenhum arquivo selecionado</h1>
            )}
          </div>
          <div className="filesAdd" value="adicionar arquivos">
            <span>ADICIONAR ARQUIVOS</span>
            <FileUpload
              files={documentos}
              setFiles={setDocumentos}
              className="file_upload"
            />
          </div>
        </div>

        <span className="label_desenvolvimento">Possui desenvolvimento dependente?</span>
        <div className="radioDesenvolvimento">
          <div>
            <input
              type="radio"
              name="desenvolvimentoDependente"
              value="yes"
              id="yesDesenvolvimento"
              onChange={handleDesenvolvimento}
            />
            <label htmlFor="yesDesenvolvimento">Sim</label>
          </div>
          <div>
            <input
              type="radio"
              name="desenvolvimentoDependente"
              value="no"
              id="noDesenvolvimento"
              onChange={handleDesenvolvimento}
            />
            <label htmlFor="noDesenvolvimento">Não</label>
          </div>
        </div>
        <div id="desenvolvimento">
          <CrmInput
            type="text"
            name="desenvolvimentoDependente"
            placeholder='NOME DO DESENVOLVIMENTO'
            onChange={(e) => setDesenvolvimentoDependente(e.target.value)}
          />
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
