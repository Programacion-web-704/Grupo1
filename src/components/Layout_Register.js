// Register.js
import { useState } from 'react';
import { useRouter } from 'next/router';

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password: 'user' }),
            });

            if (response.ok) {
                alert('Registro exitoso');
                router.push('/login');
            } else {
                const errorData = await response.json();
                console.error('Error en el registro:', errorData.error);
                alert('Error en el registro. Verifica tus credenciales e inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en el registro. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <h1>Registro</h1>
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
            <button onClick={handleRegister}>Registro</button>
        </div>
    );
};

export default Register;
