//assets
import Logo from '../assets/Logo.png';
import Show from '../assets/show.png';
import Hide from '../assets/hide.png';

//css
import "../css/Login.css";

//hooks
import { useState } from 'react';

//services
import appService from '../services/AppService';
import { Navigate } from 'react-router-dom';

function Login() {

  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [matricula, setMatricula] = useState();
  const [senha, setSenha] = useState();
  const [isLoading, loading] = useState(false);

  function handleEyePassword(){
    setHiddenPassword(!hiddenPassword);
  }
              
  function handleEntrar(evt){
    evt.preventDefault();
    console.log(matricula)
    console.log(senha)
    let data = {
      "username": matricula,
      "password": senha
    }
    try{
      const response = appService.login(data);
    }catch(error){
      console.error(error) 
    }

  }

  return (
    <main className="background_login">
      <div className="div_login">
        <img className='logo' src={Logo} alt="Logo" />
        <form>
          <div className="field">
            <label htmlFor='username'>Matrícula</label>
            <input
              onChange={(e) => setMatricula(e.target.value)}
              type="text" 
              name="username"
            />
          </div>
          <div className="field">
            <label htmlFor='password'>Senha</label>
            <div className="password">
              <input 
                onChange={(e) => setSenha(e.target.value)}
                type={hiddenPassword ? 'password' : 'text'} 
                name="password"
              />
              <img src={hiddenPassword ? Show : Hide} onClick={handleEyePassword} alt="mostrar senha"/>
            </div>
          </div>
          <button onClick={handleEntrar} className='entrar'>ENTRAR</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
