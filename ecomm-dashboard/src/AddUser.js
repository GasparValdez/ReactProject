import Header from './Header';
import { useState } from 'react';
import { Card, Button } from "react-bootstrap";
import styles from './home.module.css';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { LuUserRoundSearch } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import Image from 'react-bootstrap/Image';

function AddUser() {
    const [name, SetName] = useState("");
    const [file, SetFile] = useState(null);
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [preview, setPreview] = useState(null); // Nuevo estado para la previsualización
    const navigate = useNavigate();

    // Función de validación de los campos
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

    // Función para añadir el usuario
    async function addUser() {
        // Validar los campos antes de enviar el formulario
        if (!validateFields()) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', email);
        formData.append('name', name);
        formData.append('password', password);

        let result = await fetch("http://localhost:8000/api/adduser", {
            method: 'POST',
            body: formData
        });

        if (result.ok) {
            alert("El usuario se añadió correctamente");
            navigate('/listuser');  // Redirige a la vista de usuarios
        } else {
            alert("Error al añadir el usuario.");
        }
    }

    // Función para manejar el cambio de archivo y actualizar la previsualización
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        SetFile(file);

        // Crear una URL para la previsualización de la imagen seleccionada
        const fileUrl = URL.createObjectURL(file);
        setPreview(fileUrl);
    };

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
                            <Card.Title>Añadir un usuario</Card.Title>
                            <Card.Text>
                                <br />
                                <label><strong>Nombre del usuario</strong></label>
                                <input type="text" className="form-control"
                                    onChange={(e) => SetName(e.target.value)}
                                    placeholder="Ingresar nombre..." 
                                    required/>
                                    <br />
                                <br />
                                <label><strong>Foto del usuario</strong></label>
                                <input 
                                    type="file" 
                                    className="form-control"
                                    onChange={handleFileChange} // Llamamos a la función handleFileChange
                                    placeholder="Ingresar foto..." 
                                    required
                                /><br />
                                
                                {/* Mostrar la previsualización de la imagen si existe */}
                                {preview && (
                                    <div className="mt-3">
                                        <strong>Vista previa de la imagen: </strong>
                                        <Image style={{ width: 100 }} src={preview} alt="Vista previa" thumbnail />
                                    </div>
                                )}

                                <br />
                                <label><strong>Email del usuario</strong></label>
                                <input type="email" className="form-control"
                                    onChange={(e) => SetEmail(e.target.value)}
                                    placeholder="Ingresar email..." 
                                    required/><br />
                                <br />
                                <label><strong>Contraseña del usuario</strong></label>
                                <input type="password" className="form-control"
                                    onChange={(e) => SetPassword(e.target.value)}
                                    placeholder="Ingresar contraseña..." 
                                    required/><br />
                            </Card.Text>
                            <button onClick={addUser} className='btn btn-primary'> <FaUserPlus  /> Añadir usuario</button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AddUser;
