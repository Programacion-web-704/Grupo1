// Login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registeredUsers, setRegisteredUsers] = useState([]);

    // Agregar usuarios predefinidos
    const predefinedUsers = [
        { email: 'admin@example.com', password: '123', role: 'admin' },
        { email: 'user@example.com', password: '123', role: 'user' },
    ];

    const handleLogin = () => {
        // Obtener las credenciales registradas del estado local (simulación)
        const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

        // Combinar usuarios predefinidos con usuarios registrados
        const combinedUsers = [...predefinedUsers, ...registeredUsers];

        // Buscar si las credenciales coinciden en la lista de usuarios
        const userMatch = combinedUsers.find(
            (user) => user.email === email && user.password === password
        );

        if (userMatch) {
            if (userMatch.role === 'admin') {
                // Redirigir al usuario con rol 'admin' a la página '/admin'
                router.push('/admin');
            } else if (userMatch.role === 'user') {
                // Redirigir al usuario con rol 'user' a la página '/user'
                router.push('/user');
            }
        } else {
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
