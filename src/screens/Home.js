//components
import FilterField from "../components/FilterField";
import CrmStatus from "../components/CrmStatus";

//assets
import Plus from "../assets/plus.png";
import UserImage from "../assets/user_image.jpg";
import Logout from "../assets/Logout.png";

//css
import "../css/Home.css";
import Crm from "../components/Crm";

//hooks
import { useState } from "react";

function Home() {
  let [statusSelected, setStatusSelected] = useState("rejected");

  return (
    <main className="background_home">
      <div className="header">
        <div className="header_left">
          <div className="user_details">
            <img src={UserImage} alt="Foto de perfil" />
            <div className="user_info">
              <h1 className="user_name">Thiago Melo</h1>
              <span className="user_registration">980135</span>
            </div>
          </div>

          <div className="create_button">
            <input type="button" value="CRIAR CRM" />
            <img src={Plus} alt="Icone de adicionar" />
          </div>
        </div>

        <div className="header_right">
          <img className="logout" src={Logout} alt="Sair" />
          <div className="filters">
            <FilterField filterName="crm" type="text" />
            <FilterField filterName="solicitante" type="text" />
            <FilterField
              filterName="abertura"
              type="date"
              placeholder="DD/MM/YYYY"
            />
            <FilterField
              filterName="fechamento"
              type="date"
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
      </div>

      <div className="crm_status">
        <button onClick={() => setStatusSelected("rejected")}>
          <CrmStatus
            title="rejeitados"
            status="rejected"
            isActive={statusSelected === "rejected"}
          />
        </button>

        <button onClick={() => setStatusSelected("pending")}>
          <CrmStatus
            title="pendentes"
            status="pending"
            isActive={statusSelected === "pending"}
          />
        </button>

        <button onClick={() => setStatusSelected("approved")}>
          <CrmStatus
            title="aprovados"
            status="approved"
            isActive={statusSelected === "approved"}
          />
        </button>
      </div>

      {statusSelected === "rejected" ? (
        <div className="crms">
          <Crm
            crmNumber={'001'}
            title='Telas do CRM'
            status={statusSelected}
            creator='Thiago Melo - Mercantil'
            rejector='Allan Crasso - TI'
            motive='Está faltando um monte de telas'
          />
        </div>
      ) : statusSelected === "pending" ? (
        <div className="crms">
          <Crm
            crmNumber={'003'}
            title='Banco de Dados'
            status={statusSelected}
            creator='Victor Ammari - Financeiro'
            notApproved={['RH', 'Contábil']}
          />
        </div>
      ) : (
        <div className="crms">
          <Crm
            crmNumber={'005'}
            title='Alteração da cor da tela de login'
            status={statusSelected}
            creator='Thiago Melo - Mercantil'
            approved={['RH - Gabriel Bora', 'Contábil - Gabriel Pereira']}
          />
        </div>
      )}

      <div className={`loadMore ${statusSelected}`}>
        <img src={Plus} alt='carregar mais crm' />
      </div>

    </main>
  );
}

export default Home;
