//assets
import Logo from '../assets/Logo.png';
import View from '../assets/view.png';
import Hide from '../assets/hide.png';

//css
import "../css/Login.css";

function Login() {

  return (
    <div className="background_login">
      <div className="div_login">
        <img className='logo' src={Logo} alt="Logo" />
        <form>
          <div className="field">
            <label for='registration'>Matrícula</label>
            <input type="text" name="registration" />
          </div>
          <div className="field">
            <label for='password'>Senha</label>
            <div className="password">
              <input type="password" name="password" />
              <img src={View} alt="mostrar senha"/>
            </div>
          </div>
          <input className='entrar' type='button' value='ENTRAR'/>
        </form>
      </div>
    </div>
  );
}

export default Login;
