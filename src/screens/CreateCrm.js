//components
import CrmInput from "../components/CrmInput";

//assets
import Vector from "../assets/vector.svg";
import Search from "../assets/search.png";

//css
import "../css/CreateCrm.css";

//hooks
import { useState } from "react";

function CreateCrm() {
  const [statusSelected, setStatusSelected] = useState("creating");

  return (
    <main className="background_createCrm">
      <form>
        <div className={`statusCrm ${statusSelected}`}></div>

        <div>
          <img src={Vector} alt="Icone de voltar" />
          <CrmInput type="text" />
        </div>
        <CrmInput type="text" label="A necessidade de *" name="necessidade" />
        <CrmInput type="text" label="Cujo impacto é *" name="impactoCriacao" />
        <CrmInput type="text" label="Descrição *" name="descricao" />
        <CrmInput type="text" label="Objetivo *" name="objetivo" />
        <CrmInput type="text" label="Justificativa *" name="justificativa" />
        <CrmInput type="text" label="Alternativas" name="alternativa" />
        <span>Possui data Legal?</span>
        <div className="radioDataLegal">
          <div>
            <input type="radio" name="dataLegal" value="yes" id="yes" />
            <label htmlFor="yes">Sim</label>
          </div>
          <div>
            <input type="radio" name="dataLegal" value="no" id="no" />
            <label htmlFor="no">Não</label>
          </div>
        </div>
        <CrmInput type='date' name='dateAbertura' />
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

export default CreateCrm;
