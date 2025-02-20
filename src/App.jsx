import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [isInvalidInputs, setIsInvalidInputs] = useState(true);
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleValidation = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let valid = true;

    // Validación de campos
    if (!name || !email || !password) {
      setNameMessage(name ? '' : 'El nombre es obligatorio');
      setEmailMessage(email ? '' : 'El correo es obligatorio');
      setPasswordMessage(password ? '' : 'La contraseña es obligatoria');
      setIsInvalidInputs(true);
      valid = false;
    } else if (password.length < 6) {
      setPasswordMessage('La contraseña debe tener más de 6 caracteres');
      setIsInvalidInputs(true);
      valid = false;
    } else {
      setNameMessage('');
      setEmailMessage('');
      setPasswordMessage('');
      setIsInvalidInputs(false);
    }
  };

  // Manejo del registro de usuario
  const handleRegister = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const newUser = { name, email, password };

    if (isInvalidInputs) {
      alert('Completa los campos');
      handleValidation();
      return;
    }

    setUsers([...users, newUser]);
    
    alert('Usuario registrado correctamente');

    nameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
  };

  const UserList2 = (
    <div>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {index + 1} - {user.name} - {user.email} - {user.password}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div>
        {users.length > 0 ? (
          UserList2
        ) : (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nombre"
              ref={nameRef}
              onChange={handleValidation}
            />
            <br />
            {nameMessage && <p>{nameMessage}</p>}
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              onChange={handleValidation}
            />
            <br />
            {emailMessage && <p>{emailMessage}</p>}
            <input
              type="password"
              placeholder="Contraseña"
              ref={passwordRef}
              onChange={handleValidation}
            />
            <br />
            {passwordMessage && <p>{passwordMessage}</p>}
            <br />
            <button type="submit">
              Registrar
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default App;
