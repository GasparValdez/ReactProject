import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './registerstyle.module.css'; // Importa el CSS Module

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        document.body.classList.add('register');
        return () => {
            document.body.classList.remove('register');
        };
    }, []);

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/add");
        }
    }, [navigate]);

    async function signUp() {
        setError("");
        if (!name || !email || !password || !file) {
            setError("Todos los campos son obligatorios");
            return;
        }
        if (!email.includes("@")) {
            setError("El email debe contener un @");
            return;
        }

        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("file", file);

        let result = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            body: formData
        });

        result = await result.json();
        console.warn("result", result);
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate("/");
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Registro</div>
            <div className={styles.content}>
                <br />
                {error && <div className="alert alert-danger">{error}</div>}
                <div className={styles.userDetails}>
                    <strong><label>Datos para la cuenta de usuario</label></strong>
                    <br /><br />
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Nombre</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                        />
                        <br /><br />
                        <div className={styles.inputBox}>
                            <span className={styles.details}>Email</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles['form-control']}
                                placeholder="Email"
                                required
                            />
                            <br /><br />
                            <div className={styles.inputBox}>
                                <span className={styles.details}>Contraseña</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles['form-control']}
                                    placeholder="Contraseña"
                                    required
                                />
                                <br /><br />
                                <div className={styles.inputBox}>
                                    <span className={styles.details}>Foto</span>
                                    <input
                                        type="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className={styles['form-control']}
                                        required
                                    />
                                    <br /><br />
                                    <button onClick={signUp} className="btn btn-dark">
                                        Registrarse
                                    </button>
                                    <br /><br />
                                    <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
