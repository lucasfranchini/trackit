import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import logo from "../../Assets/Logo.png";
import Input from "../../styles/Input";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import Loader from "react-loader-spinner";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (user !== null) {
      history.push("/hoje");
    }
  }, [user, history]);
  const [body, setBody] = useState({
    email: "",
    password: "",
  });
  const [load, setLoad] = useState(false);
  function signIn(e) {
    e.preventDefault();
    setLoad(true);
    const promise = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      body
    );
    promise.then((answer) => {
      history.push("/hoje");
      setUser(answer.data);
      localStorage.setItem("user", JSON.stringify(answer.data));
    });
    promise.catch((e) => {
      if (e.response.status === 401)
        alert("Usuario ou senha invalidos, por favor tente novamente");
      else
        alert("Houve algum erro ao tentar entrar, por favor tente novamente");
      setLoad(false);
    });
  }

  return (
    <Body>
      <Img src={logo} alt="TrackIt" />
      <form onSubmit={signIn}>
        <Input
          type="text"
          placeholder="email"
          onChange={(e) => setBody({ ...body, email: e.target.value })}
          value={body.email}
          disabled={load}
          requised
        />
        <Input
          type="password"
          placeholder="senha"
          onChange={(e) => setBody({ ...body, password: e.target.value })}
          value={body.password}
          disabled={load}
          required
        />
        <Button disabled={load} type="submit">
          {load ? (
            <Loader type="ThreeDots" color="#FFF" height={50} width={50} />
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
      <Link to="/cadastro">
        <span>Não tem uma conta? Cadastre-se!</span>
      </Link>
    </Body>
  );
}

const Img = styled.img`
  margin-bottom: 25px;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 68px 36px;
  color: #52b6ff;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  a:visited {
    color: #52b6ff;
  }
`;
const Button = styled.button`
  width: 100%;
  height: 45px;
  background: #52b6ff;
  border-radius: 5px;
  color: #fff;
  border: none;
  font-size: 20px;
  margin-bottom: 25px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;
