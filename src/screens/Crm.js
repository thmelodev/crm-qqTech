//components
import CrmInput from "../components/CrmInput";

//assets
import Vector from "../assets/vector.svg";
import Search from "../assets/search.png";

//css
import "../css/Crm.css";

//hooks
import { useState } from "react";

function Crm({status,title}) {
  const [statusSelected, setStatusSelected] = useState(status);
  const [haveLegalDate, setHaveLegalDate] = useState(false);

  function handleLegalDate(){
    const div_date = document.getElementById('date');
    const div_radio = document.getElementsByClassName('radioDataLegal')[0]
    if(document.querySelector('input[name="dataLegal"]:checked').value === 'yes'){
      div_date.style.display = 'flex';
      div_radio.style.marginBottom = '0';
    }else {
      div_date.style.display = 'none';
      div_radio.style.marginBottom = '3rem';

    }
  }

  return (
    <main className="background_crm">
      <div className={`statusCrm ${statusSelected}`}></div>
      <form className="form_crm">
        {
          statusSelected === 'creating'
          ? (
            <div className="header_crm">
              <img src={Vector} alt="Icone de voltar" />
              <CrmInput type="text" />
            </div>
          )
          : (<h1 className="title-crm" >{title}</h1>)
        }
        
        <CrmInput type="text" label="A necessidade de *" name="necessidade" />
        <CrmInput type="text" label="Cujo impacto é *" name="impactoCriacao" />
        <CrmInput type="text" label="Descrição *" name="descricao" />
        <CrmInput type="text" label="Objetivo *" name="objetivo" />
        <CrmInput type="text" label="Justificativa *" name="justificativa" />
        <CrmInput type="text" label="Alternativas" name="alternativa" />
        <span className='label_date'>Possui data Legal?</span>
        <div className="radioDataLegal">
          <div>
            <input type="radio" name="dataLegal" value="yes" id="yes" onChange={handleLegalDate} />
            <label htmlFor="yes">Sim</label>
          </div>
          <div>
            <input type="radio" name="dataLegal" value="no" id="no" onChange={handleLegalDate} />
            <label htmlFor="no">Não</label>
          </div>
        </div>
        <div id="date">
          <CrmInput type='date' name='dateAbertura' />
        </div>
        <CrmInput type="text" label="Comportamento Offline" name="comportamentoOffline" />
        <div>
            <label htmlFor="setoresEnvolvidos">Setores Envolvidos</label>
            <div>
                <img src={Search} alt="Icone de pesquisa"/>
                <input type='text' name='setoresEnvolvidos' id='setoresEnvolvidos'/>
            </div>
            <div className="sectors">

            </div>
        </div>
        <div>
            <span>Arquivos</span>
            <div className="Files">

            </div>
            <input type='button' value='adicionar arquivos'/>
        </div>

        <input type='submit' value='enviar crm'/>

      </form>
    </main>
  );
}

export default Crm;
