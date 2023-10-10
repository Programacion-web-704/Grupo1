// Register.js
import { useState } from 'react';
import { useRouter } from 'next/router';

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registeredUsers, setRegisteredUsers] = useState([]);

    const handleRegister = () => {
        // Crear un nuevo usuario con el rol 'user'
        const newUser = { email, password, role: 'user' };

        // Almacenar las credenciales en el estado local (simulación)
        localStorage.setItem('registeredUser', JSON.stringify(newUser));

        // Agregar el nuevo usuario a la lista de usuarios registrados
        setRegisteredUsers([...registeredUsers, newUser]);

        alert('Registro exitoso');
        router.push('/login');
    };

    return (
        <div>
            <h1>Register</h1>
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
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
