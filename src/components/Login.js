import { useState } from 'react';
import { useRouter } from 'next/router';


const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Aquí puedes realizar la lógica de inicio de sesión.
        // Por ejemplo, puedes verificar las credenciales en el estado local.
        if (email === 'admin@example.com' && password === '123') {
            // Simular un inicio de sesión exitoso
            alert('Inicio de sesión exitoso');
            router.push('/admin');
        }else if (email == 'user@example.com' && password == '123'){
            alert('Inicio de sesión exitoso');
            router.push('/user');
        } 
        else {
            alert('Credenciales incorrectas');
        }
    };

    const handleRegisterClick = () => {
        // Navegar a la página de registro cuando se hace clic en el botón "Registrarse"
        router.push('/register');
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegisterClick}>Registrarse</button>
        </div>
    );
};

export default Login;
