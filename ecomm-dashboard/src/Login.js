import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './loginstyle.module.css'; // Importar el CSS como un módulo

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Establecer la clase 'login' en el body cuando el componente se monta
        document.body.classList.add('login');

        return () => {
            // Limpiar la clase cuando se desmonte el componente
            document.body.classList.remove('login');
        };
    }, []);

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/");
        }
    }, [navigate]);

    async function login(e) {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Todos los campos son obligatorios");
            return;
        }
        if (!email.includes("@")) {
            setError("El email debe contener un @");
            return;
        }

        let item = { email, password };
        let result = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
        });
        result = await result.json();

        if (result.error) {
            setError(result.error);
        } else {
            localStorage.setItem("user-info", JSON.stringify(result));
            navigate("/");
        }
    }

    const clearFields = () => {
        setEmail("");
        setPassword("");
        setError("");
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.logo}></div>
            <div className={styles.loginBlock}>
                <h1>Login</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={login}>
                    <div className={`${styles['input-container']} d-flex align-items-center`}>
                        <FaUser className={`${styles.icon} me-2`} />
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={`${styles['input-container']} d-flex align-items-center`}>
                        <FaLock className={`${styles.icon} me-4`} />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                    </div>
             
                        <button
                            type="button"
                            className="btn btn-success w-25"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>

                    <button type="buttont" className="btn btn-success w-100 mt-2" onClick={login}>Iniciar sesión</button>
                    <button type="button" className="btn btn-secondary w-100 mt-2" onClick={clearFields}>Limpiar</button>
                    <br /><br />
                    <p>¿No tienes una cuenta? <Link to="/register">Registrarse</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
