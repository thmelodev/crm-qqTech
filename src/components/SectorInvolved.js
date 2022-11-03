import { useEffect, useState } from "react";
import "../css/SectorInvolved.css";
import colaboradorService from "../services/ColaboradorService";
import LoadingComponents from "./LoadingComponents";

function SectorInvolved({ sector, isreadOnly, setSelectedFlag, user }) {
  const ifFlagApproved = sector.flag == "aprovado" ? true : false;
  const ifFlagRejected = sector.flag == "rejeitado" ? true : false;
  const [colaboradorName, setColaboradorName] = useState("");

  async function getColaboradorName() {
    const colaborador = JSON.parse(
      await colaboradorService.findOne(
        sector.matriculaColaborador,
        localStorage.getItem("@Auth:token")
      )
    );
    setColaboradorName(`${colaborador.nome} ${colaborador.sobrenome}`);
  }

  const handleFlagAprovado = (e) => {
    sector.flag = "aprovado";
    sector.matriculaColaborador = user.matricula;
    if (sector.flag != "pendente") getColaboradorName();
    setSelectedFlag("aprovado");
  };

  const handleFlagRejeitado = (e) => {
    sector.flag = "rejeitado";
    sector.matriculaColaborador = user.matricula;
    if (sector.flag != "pendente") getColaboradorName();
    setSelectedFlag("rejeitado");
  };

  function fixCheckBox() {

    const divCheckBox = document.getElementsByClassName(
      `div_sectorInvolved class_${sector.nomeSetor}`)[0];
    const approvedCheckBox = document.getElementsByClassName(
      `checkAprovado class_${sector.nomeSetor}`
    )[0];
    const rejectedCheckBox = document.getElementsByClassName(
      `checkRejeitado class_${sector.nomeSetor}`
    )[0];

    if (isreadOnly) {
      approvedCheckBox.disabled = true;
      approvedCheckBox.style.cursor = "default"
    
      rejectedCheckBox.disabled = true;
      rejectedCheckBox.style.cursor = "default"

      divCheckBox.style.opacity = 0.7
    }

    if (sector.flag != "pendente") {
      getColaboradorName();
    }

    if (sector.flag == "aprovado") {
      approvedCheckBox.checked = true;
    } else if (sector.flag == "rejeitado") {
      rejectedCheckBox.checked = true;
    }
  }

  useEffect(() => {
    fixCheckBox();
  }, []);

  return (
    <div className={`div_sectorInvolved class_${sector.nomeSetor}`}>
      {ifFlagApproved ? (
        <>
          <label>{`${sector.nomeSetor} - ${colaboradorName}`}</label>
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
      ) : ifFlagRejected ? (
        <>
          <label>{`${sector.nomeSetor} - ${colaboradorName}`}</label>
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
      ) : isreadOnly ? (
        <>
          <label>{`${sector.nomeSetor} `}</label>
          <div>
            <input
              className={`checkAprovado class_${sector.nomeSetor}`}
              type="radio"
              name={`flagSetor_${sector.nomeSetor}`}
              value="aprovado"
              disabled
            />
          </div>
          <div>
            <input
              className={`checkRejeitado class_${sector.nomeSetor}`}
              type="radio"
              name={`flagSetor_${sector.nomeSetor}`}
              value="rejeitado"
              disabled
            />
          </div>
        </>
      ) : (
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
