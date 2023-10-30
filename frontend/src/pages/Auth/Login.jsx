import React from "react";
import "./Auth.css";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id='login'>
      <h2>ReactGram</h2>
      <p className='subtitle'>Cadastre-se para explorar o site!</p>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' />
        <input type='password' placeholder='Senha' />

        <input type='submit' value='Entrar' />
      </form>
    </div>
  );
};

export default Login;
