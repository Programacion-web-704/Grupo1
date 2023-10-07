import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        //revisar inicio de sesion
        if (email === 'usuario@example.com' && password === 'contraseña') {
            // Simular un inicio de sesión exitoso
            alert('Inicio de sesión exitoso');
            router.push('/dashboard');
        } else {
            alert('Credenciales incorrectas');
        }
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
        </div>
    );
};

export default Login;
