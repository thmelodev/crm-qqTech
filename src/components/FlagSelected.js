import "../css/FlagSelected.css";
import Vector from "../assets/vector.svg";
import { useState } from "react";


function FlagSelected({ flagSelected,setSelectedFlag,setoresEnvolvidos,user,motivoRejeicao, setMotivoRejeicao, handleRejectCrm}) {

  
  const userSector = setoresEnvolvidos.filter((setorEnvolvido) => setorEnvolvido.nomeSetor == user.setor.nome)

  function clearCheckBox(sector){
    const radioAprovado = document.getElementsByClassName(
      `checkAprovado class_${sector.nomeSetor}`)[0];

    const radioRejeitado = document.getElementsByClassName(
      `checkRejeitado class_${sector.nomeSetor}`)[0];
    
    radioAprovado.checked = false;
    radioRejeitado.checked = false;
  }

  const handleReturn = () =>{
    userSector[0].flag = 'pendente'
    clearCheckBox(userSector[0])
    setSelectedFlag("pendente")
  }

  const handleNotApproved = () =>{
    const userSector = setoresEnvolvidos.filter((setorEnvolvido) => setorEnvolvido.nomeSetor == user.setor.nome)
    userSector[0].flag = 'pendente'
    clearCheckBox(userSector[0])
    setSelectedFlag("pendente")
  }

  const handleCrmReject = () =>{
    userSector[0].flag = 'rejeitado'
    userSector[0].justificativa = motivoRejeicao
    handleRejectCrm()
  }

  return (
    <>
      <div className="flagSelected_background"></div>
      <div className="flagSelected_container">
        <div className="flagSelected_box">
          <div className="flagSelected_header">
            <img src={Vector} alt="botao de voltar" onClick={handleReturn} />
            {flagSelected == 'aprovado'
              ? (<h1>Tem certeza que deseja aprovar essa Crm?</h1>)
              : (<h1>Motivo da rejeição</h1>)}
          </div>
          {flagSelected == 'aprovado'
            ? (
              <div className='flagSelected_containerButtons'>
                <input className='flagSelected_button' type='button' value='sim'/>
                <input className='flagSelected_button' type='button' value='não' onClick={handleNotApproved}/>
              </div>
            )
            : (
              <>
                <textarea className="flagSelected_textarea" onChange={(e) => setMotivoRejeicao(e.target.value)}></textarea>
                <input 
                  className="flagSelected_rejeitar" 
                  type='button' 
                  value='rejeitar crm' 
                  onClick={handleCrmReject}/>
              </>
            )}
          

          
        </div>
      </div>
    </>
  );
}

export default FlagSelected;
