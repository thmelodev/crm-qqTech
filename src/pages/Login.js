//assets
import Logo from '../assets/Logo.png';
import Show from '../assets/show.png';
import Hide from '../assets/hide.png';

//css
import "../css/Login.css";

//hooks
import { useState } from 'react';

function Login() {

  const [hiddenPassword, setHiddenPassword] = useState(true);

  function handleEyePassword(){
    setHiddenPassword(!hiddenPassword);
  }
          
  function keyPress(evt){
    if(isNaN(evt.key) && evt.key != 'Backspace'){
      evt.preventDefault();
    }
  }
    


  return (
    <main className="background_login">
      <div className="div_login">
        <img className='logo' src={Logo} alt="Logo" />
        <form>
          <div className="field">
            <label htmlFor='registration'>Matrícula</label>
            <input
              onKeyDown={keyPress} 
              type="text" 
              name="registration"
            />
          </div>
          <div className="field">
            <label htmlFor='password'>Senha</label>
            <div className="password">
              <input 
                type={hiddenPassword ? 'password' : 'text'} 
                name="password"
              />
              <img src={hiddenPassword ? Show : Hide} onClick={handleEyePassword} alt="mostrar senha"/>
            </div>
          </div>
          <button className='entrar'>ENTRAR</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
