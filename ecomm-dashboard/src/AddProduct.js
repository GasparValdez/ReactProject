import Header from './Header';
import { useState } from 'react';
import { Card, Button } from "react-bootstrap";
import styles from './home.module.css';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { LuUserRoundSearch } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import Image from 'react-bootstrap/Image';
import { IoIosAddCircle } from "react-icons/io";

function AddProduct() {
    const [name, SetName] = useState("");
    const [file, SetFile] = useState("");
    const [price, SetPrice] = useState("");
    const [description, SetDescription] = useState("");
    const [previewUrl, SetPreviewUrl] = useState(""); // Nuevo estado para la previsualización
    const navigate = useNavigate(); // Para redirigir después de agregar el producto

    // Función para manejar el cambio de la imagen
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        SetFile(selectedFile);

        // Crear una URL para la imagen seleccionada y mostrarla como previsualización
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            SetPreviewUrl(objectUrl);
        }
    };

    async function addProduct() {
        if (!name || !file || !price || !description) {
            alert("Todos los campos son obligatorios");
            return;
        }
        console.warn(name, file, price, description);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('price', price);
        formData.append('name', name);
        formData.append('description', description);

        let result = await fetch("http://localhost:8000/api/addproduct", {
            method: 'POST',
            body: formData
        });

        // Verificamos si el producto se añadió correctamente
        if (result.ok) {
            alert("El producto se añadió correctamente");
            navigate("/"); // Redirige a la vista de listado de productos
        } else {
            alert("Error al añadir el producto");
        }
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
                        <Card.Header>Administrar Productos</Card.Header>
                        <Card.Body>
                            <Card.Title>Añadir un producto</Card.Title>
                            <Card.Text>
                                <br />
                                <label><strong>Nombre del producto</strong></label>
                                <input type="text"
                                    className="form-control"
                                    onChange={(e) => SetName(e.target.value)}
                                    placeholder="Ingresar nombre..." 
                                    required/><br />
                                <br />
                                <label><strong>Foto del producto</strong></label>
                                <input type="file"
                                    className="form-control"
                                    onChange={handleFileChange} // Usamos la nueva función
                                    placeholder="Ingresar foto..." 
                                    required/><br />
                                
                                {/* Previsualización de la imagen seleccionada */}
                                {previewUrl && (
                                    <div>
                                        <strong>Vista previa de la imagen: </strong>
                                        <Image src={previewUrl} alt="Vista previa" thumbnail style={{ width: 100 }} />
                                    </div>
                                )}

                                <br />
                                <br />
                                <label><strong>Precio del producto</strong></label>
                                <input type="text"
                                    className="form-control"
                                    onChange={(e) => SetPrice(e.target.value)}
                                    placeholder="Ingresar precio..." 
                                    required/><br />
                                <br />
                                <label><strong>Descripción del producto</strong></label>
                                <input type="text"
                                    className="form-control"
                                    onChange={(e) => SetDescription(e.target.value)}
                                    placeholder="Ingresar descripción..." 
                                    required/><br />
                            </Card.Text>
                            <button onClick={addProduct} className='btn btn-primary'><IoIosAddCircle /> Añadir producto</button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
