import Header from './Header';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './home.module.css';
import { Card, Button } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { LuUserRoundSearch } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import { FaUserPen } from "react-icons/fa6";
import Image from 'react-bootstrap/Image';

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [data, setData] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);

    const validateFields = () => {
        if (!name || !email || !password || !file) {
            alert("Todos los campos son obligatorios.");
            return false;
        }
        if (!email.includes("@")) {
            alert("El email debe contener un @.");
            return false;
        }
        return true;
    };

    useEffect(() => {
        async function fetchUser() {
            let result = await fetch(`http://localhost:8000/api/user/${id}`);
            result = await result.json();
            setData(result);
            setName(result.name);
            setEmail(result.email);
            setPassword(result.password);
        }
        fetchUser();
    }, [id]);

    async function updateUser() {
        if (!validateFields()) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (file) {
            formData.append("file", file);
        }

        let result = await fetch(`http://localhost:8000/api/updateuser/${id}`, {
            method: "POST",
            body: formData,
        });

        result = await result.json();
        console.warn(result);
        
        alert("Usuario actualizado correctamente");

        // Redirigir al usuario a la lista de productos
        navigate("/listuser"); 
    }

    return (
        <div>
        <Header />

        <div className={styles.Home}>
            {/* Sidebar */}
            <div className={styles.Sidebar}>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a href="/listuser" className="nav-link text-white"> <FaUser className={styles.iconSpacing}/>Listado de Usuarios
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link text-white"> <IoStorefront className={styles.iconSpacing}/>Listado de Productos
                        </a>
                    </li>
                </ul>
            </div>

            {/* Content */}
            <div className={styles.Content}>
                <br />
                <Card>
                    <Card.Header>Administrar Usuarios</Card.Header>
                    <Card.Body>
                        <Card.Title>Actualizar un usuario</Card.Title>
                        <Card.Text>
                            <br />
                            <label><strong>Nombre del usuario</strong></label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control"  placeholder="Ingresar nombre..." required/> <br /><br />
                            <label><strong>Foto del usuario</strong></label>
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control" placeholder="Ingresar foto..." required/> <br />
                            <label><strong>Imagen actual:</strong></label>
                            <Image style={{ width: 100 }} src={"http://localhost:8000/" + data.file_path} alt="Usuario" thumbnail /> <br /><br />
                            <label><strong>Email del usuario</strong></label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"  placeholder="Ingresar email..." required/> <br /><br />
                            <label><strong>Contraseña del usuario</strong></label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Ingresar contraseña..." required/> <br /><br />
                        </Card.Text>
                        <button onClick={updateUser} className='btn btn-primary'> <FaUserPen /> Actualizar usuario</button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    </div>
    );
}

export default UpdateUser;
