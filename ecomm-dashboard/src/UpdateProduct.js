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
import { IoIosAddCircle } from "react-icons/io";

function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [data, setData] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const validateFields = () => {
        if (!name || !price|| !description|| !file) {
            alert("Todos los campos son obligatorios.");
            return false;
        }
        return true;
    };

    useEffect(() => {
        async function fetchProduct() {
            let result = await fetch(`http://localhost:8000/api/product/${id}`);
            result = await result.json();
            setData(result);
            setName(result.name);
            setPrice(result.price);
            setDescription(result.description);
        }
        fetchProduct();
    }, [id]);

    async function updateProduct() {
        if (!validateFields()) return;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        if (file) {
            formData.append("file", file);
        }

        let result = await fetch(`http://localhost:8000/api/update/${id}`, {
            method: "POST",
            body: formData,
        });

        result = await result.json();
        console.warn(result);
        
        alert("Producto actualizado correctamente");

        // Redirigir al usuario a la lista de productos
        navigate("/"); 
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
                        <Card.Title>Actualizar un producto</Card.Title>
                        <Card.Text>
                            <br />
                            <label><strong>Nombre del producto</strong></label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control"  placeholder="Ingresar nombre..." required/> <br /><br />
                            <label><strong>Foto del producto</strong></label>
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control" placeholder="Ingresar foto..." required/> <br />
                            <label><strong>Imagen actual:</strong></label>
                            <Image style={{ width: 100 }} src={"http://localhost:8000/" + data.file_path} alt="Producto" thumbnail /> <br /><br />
                            <label><strong>Precio del producto</strong></label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control"  placeholder="Ingresar precio..." required/> <br /><br />
                            <label><strong>Descripción del producto</strong></label>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Ingresar descripción..." required/> <br /><br />
                        </Card.Text>
                        <button onClick={updateProduct} className='btn btn-primary'> <IoIosAddCircle /> Actualizar producto</button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    </div>
    );
}

export default UpdateProduct;
