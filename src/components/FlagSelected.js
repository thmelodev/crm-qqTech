import "../css/FlagSelected.css";
import Vector from "../assets/vector.svg";
import { useState } from "react";
import CrmInput from "./CrmInput";

function FlagSelected({
  flagSelected,
  setSelectedFlag,
  setoresEnvolvidos,
  user,
  motivoRejeicao,
  setMotivoRejeicao,
  handleRejectCrm,
  handleApproveCrm,
  impactoMudanca,
  setImpactoMudanca,
  setComplexidade
}) {
  const userSector = setoresEnvolvidos.filter(
    (setorEnvolvido) => setorEnvolvido.nomeSetor == user.setor.nome
  );

  function clearCheckBox(sector) {
    const radioAprovado = document.getElementsByClassName(
      `checkAprovado class_${sector.nomeSetor}`
    )[0];

    const radioRejeitado = document.getElementsByClassName(
      `checkRejeitado class_${sector.nomeSetor}`
    )[0];

    radioAprovado.checked = false;
    radioRejeitado.checked = false;
  }

  const handleReturn = () => {
    userSector[0].flag = "pendente";
    clearCheckBox(userSector[0]);
    setSelectedFlag("pendente");
  };

  const handleNotApproved = () => {
    const userSector = setoresEnvolvidos.filter(
      (setorEnvolvido) => setorEnvolvido.nomeSetor == user.setor.nome
    );
    userSector[0].flag = "pendente";
    clearCheckBox(userSector[0]);
    setSelectedFlag("pendente");
  };

  const handleCrmReject = () => {
    userSector[0].flag = "rejeitado";
    userSector[0].justificativa = motivoRejeicao;
    handleRejectCrm();
  };

  const handleCrmApprove = () => {
    userSector[0].flag = "aprovado";
    handleApproveCrm();
  };

  return (
    <>
      <div className="flagSelected_background"></div>
      <div className="flagSelected_container">
        <div className="flagSelected_box">
          <div className="flagSelected_header">
            <img src={Vector} alt="botao de voltar" onClick={handleReturn} />
            {flagSelected == "aprovado" ? (
              <h1>Tem certeza que deseja aprovar essa Crm?</h1>
            ) : (
              <h1>Motivo da rejeição</h1>
            )}
          </div>
          {flagSelected == "aprovado" ? (
            user.setor.nome == "TI" ? (
              <>
                <div className="setComplexidade">
                  <h1>Complexidade</h1>
                  <div className="divRadioComplexidade">
                    <div>
                      <input type="radio" value="Alta" name="complexidade" onChange={(e) => setComplexidade(e.target.value)}/>
                      <label>Alta</label>
                    </div>
                    <div>
                      <input type="radio" value="Media" name="complexidade" onChange={(e) => setComplexidade(e.target.value)}/>
                      <label>Media</label>
                    </div>
                    <div>
                      <input type="radio" value="Baixa" name="complexidade" onChange={(e) => setComplexidade(e.target.value)} />
                      <label>Baixa</label>
                    </div>
                    <div>
                      <input
                        type="radio" value="Muito Baixa" name="complexidade" onChange={(e) => setComplexidade(e.target.value)} />
                      <label>Muito Baixa</label>
                    </div>
                  </div>
                </div>
                <div className="SetImpactoMudanca">
                  <label className="label_crm" htmlFor="impactoMudanca">
                    impacto da mudança
                  </label>
                  <textarea
                    className="input_crm impactoMudanca"
                    type="text"
                    name="impactoMudanca"
                    id="impactoMudanca"
                    onChange={(e) => setImpactoMudanca(e.target.value)}
                    value={impactoMudanca}
                  />
                </div>

                <div className="flagSelected_containerButtons">
                  <input
                    className="flagSelected_button"
                    type="button"
                    value="sim"
                    onClick={handleCrmApprove}
                  />
                  <input
                    className="flagSelected_button"
                    type="button"
                    value="não"
                    onClick={handleNotApproved}
                  />
                </div>
              </>
            ) : (
              <div className="flagSelected_containerButtons">
                <input
                  className="flagSelected_button"
                  type="button"
                  value="sim"
                  onClick={handleCrmApprove}
                />
                <input
                  className="flagSelected_button"
                  type="button"
                  value="não"
                  onClick={handleNotApproved}
                />
              </div>
            )
          ) : (
            <>
              <textarea
                className="flagSelected_textarea"
                onChange={(e) => setMotivoRejeicao(e.target.value)}
              ></textarea>
              <input
                className="flagSelected_rejeitar"
                type="button"
                value="rejeitar crm"
                onClick={handleCrmReject}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default FlagSelected;
