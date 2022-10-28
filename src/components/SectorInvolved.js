import { useState } from "react";
import "../css/SectorInvolved.css";


function SectorInvolved({ sector,isReadOnly, handleFlag}) {
  const ifFlagApproved = sector.flag == "aprovado" ? true : false;
  const ifFlagRejected = sector.flag == "rejeitado" ? true : false;

  const handleFlagAprovado = () => {
    const radioRejeitado = document.getElementsByClassName(
      `checkRejeitado class_${sector.nomeSetor}`
    )[0];
    radioRejeitado.checked = false;
    sector.flag = "aprovado";
  };

  const handleFlagRejeitado = () => {
    const radioAprovado = document.getElementsByClassName(
      `checkAprovado class_${sector.nomeSetor}`
    )[0];
    radioAprovado.checked = false;
    sector.flag = "rejeitado";
  };

  return (
    <div className="div_sectorInvolved">
      {ifFlagApproved ? (
        <>
          <label>{`${sector.nomeSetor} -`}</label>
          <div>
            <input
              className={`checkAprovado class_${sector.nomeSetor}`}
              type="radio"
              name={`flagSetor_${sector.nomeSetor}`}
              value="aprovado"
              disabled
              onChange={handleFlagAprovado}
              defaultChecked
            />
          </div>
          <div>
            <input
              className={`checkRejeitado class_${sector.nomeSetor}`}
              type="radio"
              name={`flagSetor_${sector.nomeSetor}`}
              value="rejeitado"
              disabled
              onChange={handleFlagRejeitado}
            />
          </div>
        </>
      ) : 
        ifFlagRejected 
        ? (
          <>
          <label>{`${sector.nomeSetor} - `}</label>
          <div>
            <input
              className={`checkAprovado class_${sector.nomeSetor}`}
              type="radio"
              name={`flagSetor_${sector.nomeSetor}`}
              value="aprovado"
              disabled
              onChange={handleFlagAprovado}
            />
          </div>
          <div>
            <input
              className={`checkRejeitado class_${sector.nomeSetor}`}
              type="radio"
              name={`flagSetor_${sector.nomeSetor}`}
              value="rejeitado"
              disabled
              onChange={handleFlagRejeitado}
              defaultChecked
            />
          </div>
        </>
      )
        : 
        isReadOnly 
        ?  (
          <>
          <label>{`${sector.nomeSetor} `}</label>
          <div>
            <input
              className={`checkAprovado class_${sector.nomeSetor}`}
              type="radio"
              name={`flagSetor_${sector.nomeSetor}`}
              value="aprovado"
              disabled
              onChange={handleFlagAprovado}
            />
          </div>
          <div>
            <input
              className={`checkRejeitado class_${sector.nomeSetor}`}
              type="radio"
              name={`flagSetor_${sector.nomeSetor}`}
              value="rejeitado"
              disabled
              onChange={handleFlagRejeitado}
            />
          </div>
        </>
        )
      :(
        <>
          <label>{`${sector.nomeSetor} `}</label>
          <div>
            <input
              className={`checkAprovado class_${sector.nomeSetor}`}
              type="radio"
              name={`flagSetor_${sector.nomeSetor}`}
              value="aprovado"
              onChange={handleFlagAprovado}
            />
          </div>
          <div>
            <input
              className={`checkRejeitado class_${sector.nomeSetor}`}
              type="radio"
              name={`flagSetor_${sector.nomeSetor}`}
              value="rejeitado"
              onChange={handleFlagRejeitado}
            />
          </div>
        </>
      )}
      
    </div>
  );
}

export default SectorInvolved;
