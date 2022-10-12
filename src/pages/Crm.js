//components
import CrmInput from "../components/CrmInput";
import FileUpload from "../components/FileUpload";
import File from "../components/File";

//assets
import Vector from "../assets/vector.svg";
import Search from "../assets/search.png";
import Version from "../assets/version_control.png"

//css
import "../css/Crm.css";

//hooks
import React, { useState } from "react";
import SectorSelected from "../components/SectorSelected";


function Crm({status,title}) {
  const [necessidade, setNecessidade] = useState(null);
  const [impactoCriacao, setImpactoCriacao] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [objetivo, setObjetivo] = useState(null);
  const [justificativa, setJustificativa] = useState(null);
  const [alternativas, setAlternativas] = useState(null);
  const [dataLegal, setDataLegal] = useState(null);
  const [comportamentoOffline, setComportamentoOffline] = useState(null);
  const [setoresEnvolvidos, setSetoresEnvolvidos] = useState([]);
  const [arquivos, setArquivos] = useState([]); 
  const [isLoading, setIsLoading] = useState(false)

  function handleLegalDate(){
    const div_date = document.getElementById('date');
    const div_radio = document.getElementsByClassName('radioDataLegal')[0]
    if(document.querySelector('input[name="legalData"]:checked').value === 'yes'){
      div_date.style.display = 'flex';
      div_radio.style.marginBottom = '0';
    }else {
      div_date.style.display = 'none';
      div_radio.style.marginBottom = '3rem';
    }
  }
  
  function enterPress(evt){
    if(evt.key === 'Enter'){
      evt.preventDefault();
      const sectorsInvolved = document.getElementById('setoresEnvolvidos')
      setSetoresEnvolvidos([...setoresEnvolvidos,sectorsInvolved.value])
      sectorsInvolved.value = ''
    }
  }

  return (
    <main className="background_crm">
      <div className={`statusCrm ${status}`}></div>
      <form className="form_crm">
        {
          status === 'creating'
          ? (
            <div className="header_crm_creating">
              <button className="header_img">
              <img src={Vector} alt="Icone de voltar" />
              </button>
              <CrmInput type="text" />
            </div>
          )
          : (
            <div className="header_crm">
              <button className="header_img">
              <img src={Vector} alt="Icone de voltar" />
              </button>
              <h1 className="title-crm" >{title}</h1>
              <button className={`version_background ${status}`}>
                <img src={Version} alt='Icone de versionamento' />
              </button>
            </div>)
        }
        
        <CrmInput type="text" label="A necessidade de *" name="necessidade" onChange={(e) => setNecessidade(e.target.value)} />
        <CrmInput type="text" label="Cujo impacto é *" name="impactoCriacao" onChange={(e) => setImpactoCriacao(e.target.value)} />
        <CrmInput type="text" label="Descrição *" name="descricao" onChange={(e) => setDescricao(e.target.value)} />
        <CrmInput type="text" label="Objetivo *" name="objetivo" onChange={(e) => setObjetivo(e.target.value)} />
        <CrmInput type="text" label="Justificativa *" name="justificativa" onChange={(e) => setJustificativa(e.target.value)} />
        <CrmInput type="text" label="Alternativas" name="alternativa" onChange={(e) => setAlternativas(e.target.value)}/>
        <span className='label_date'>Possui data Legal?</span>
        <div className="radioDataLegal">
          <div>
            <input type="radio" name="legalData" value="yes" id="yes" onChange={handleLegalDate} />
            <label htmlFor="yes">Sim</label>
          </div>
          <div>
            <input type="radio" name="legalData" value="no" id="no" onChange={handleLegalDate} />
            <label htmlFor="no">Não</label>
          </div>
        </div>
        <div id="date">
          <CrmInput type='date' name='dataLegal' onChange={(e) => setDataLegal(e.target.value)} />
        </div>
        <CrmInput type="text" label="Comportamento Offline" name="comportamentoOffline" />
        <div className="sectorsDiv">
            <label htmlFor="setoresEnvolvidos">Setores Envolvidos</label>
            <div className="sectorSearcher">
                <img src={Search} alt="Icone de pesquisa"/>
                <input 
                onKeyDown={enterPress} 
                type='text' 
                name='setoresEnvolvidos' 
                id='setoresEnvolvidos'
                />
            </div>
            <div className="sectors">
              {setoresEnvolvidos.map((sector,i)=>{
                return <SectorSelected key={i} sector={sector}/>
              })}
            </div>
        </div>
        <div className="filesDiv">
            <span className="filesDiv_title">Arquivos</span>
            <div className="files">
            {arquivos.map((file,i)=>{
                return <File key={i} file={file}/>
              })}
            </div>
            <div className="filesAdd" value='adicionar arquivos'>
              <span>ADICIONAR ARQUIVOS</span>
              <FileUpload files={arquivos} setFiles={setArquivos} className='file_upload' />
            </div>
        </div>

        <input className='submit' type='submit' value='enviar crm'/>

      </form>
    </main>
  );
}

export default Crm;
