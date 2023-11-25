// Login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Agregar usuarios predefinidos
    const predefinedUsers = [
        { email: 'admin@example.com', password: '123', role: 'admin' },
        { email: 'user@example.com', password: '123', role: 'user' },
    ];

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Iniciar sesión exitosa
                const user = await response.json();
                if (user.role === 'admin') {
                    router.push('/admin');
                } else if (user.role === 'user') {
                    router.push('/user');
                }
            } else {
                // Manejar errores de inicio de sesión
                const errorData = await response.json();
                alert(errorData.error);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
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
