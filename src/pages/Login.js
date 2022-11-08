//assets
import Logo from "../assets/Logo.png";
import Show from "../assets/show.png";
import Hide from "../assets/hide.png";

//css
import "../css/Login.css";

//hooks
import { useContext, useState } from "react";

//services
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";

function Login() {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signed } = useContext(AuthContext);

  const handleEyePassword = () => {
    setHiddenPassword(!hiddenPassword);
  };

  const changeOpacity = () =>{ 
    
    if(document.getElementById('username').value != "" && document.getElementById('password').value != ""){
      document.getElementsByClassName('entrar')[0].style.opacity = 1
    }else{
      document.getElementsByClassName('entrar')[0].style.opacity = 0.3
    }
  }

  const handleEntrar = async (evt) => {
    evt.preventDefault()
    setIsLoading(true);
    if (matricula == "" || senha == "") {
      alert("Preencha todos os campos");
    }else{
      evt.preventDefault();
      let data = {
        username: matricula,
        password: senha,
      };
      await signIn(data);
    }
    setIsLoading(false);
  };

  if (signed && !isLoading) {
    return <Navigate to="/home" />;
  }

  return (
    <main className="background_login">
      <div className="div_login">
        <img className="logo" src={Logo} alt="Logo" />
        <form>
          <div className="field">
            <label htmlFor="username">Matrícula</label>
            <input
              onChange={(e) =>{
                setMatricula(e.target.value)
                changeOpacity()
              }}
              type="text"
              id="username"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Senha</label>
            <div className="password">
              <input 
                onChange={(e) => {
                  setSenha(e.target.value)
                  changeOpacity()
                }}
                type={hiddenPassword ? "password" : "text"}
                id="password"
              />
              <img
                src={hiddenPassword ? Show : Hide}
                onClick={handleEyePassword}
                alt="mostrar senha"
              />
            </div>
          </div>
          <button onClick={handleEntrar} className="entrar">
            ENTRAR
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
