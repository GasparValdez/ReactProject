import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Header from './Header';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { LuUserRoundSearch } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import Image from 'react-bootstrap/Image';
import styles from './home.module.css';
import { IoIosAddCircle } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";




function ProductList() {
    const [data, setData] = useState([]);

    useEffect( () => {
        getData();
    }, []);
async function deleteOperation(id)
{ if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    let result = await fetch(`http://localhost:8000/api/delete/${id}`, {
        method: 'DELETE'
    });
    result = await result.json();
    console.warn(result);
    getData();
}
}

async function search(key) {
    console.warn(key);

    if (!key.trim()) { 
        getData(); // Volver a cargar todos los usuarios
        return;
    }

    try {
        let result = await fetch("http://localhost:8000/api/search/" + encodeURIComponent(key));
        
        if (!result.ok) {
            throw new Error(`Error en la solicitud: ${result.status}`);
        }

        let data = await result.json();
        console.warn(data);
        setData(data);
    } catch (error) {
        console.error("Error al buscar producto", error);
        setData([]); // Vaciar la lista en caso de error
    }
}
async function getData()
{
    let result = await fetch('http://localhost:8000/api/list');
    result = await result.json();
    setData(result);
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
               

                <div className="d-flex justify-content-between mt-3">
                    <h2>Listado de Productos</h2>
                    <Button variant="btn btn-success" href='/add'> <IoIosAddCircle className={styles.iconSpacing}/>

                     Añadir un producto</Button>
                    
                </div>
                <br/>
                <input 
                    type="text" 
                    onChange={(e) => search(e.target.value)} 
                    className="form-control" 
                    placeholder="Buscar producto por nombre..." 
                    required
                />
                <br/>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th>Foto</th>                           
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id}>
                                   <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td>
                                    <Image style={{ width: 100 }} src={`http://localhost:8000/${item.file_path}`} alt="Producto" rounded/>
                                    </td>
                                    <td>
                                        <Link to={"update/"+item.id}>
                                        <Button variant="warning" className="mx-2"><RiPencilFill className={styles.iconSpacing}/>Editar</Button>
                                        </Link>
                                        <Button onClick={()=>deleteOperation(item.id)} className="mx-2" variant="danger"><TiDelete  className={styles.iconSpacing}/>Borrar</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No hay productos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
        </div>
    );
}

export default ProductList;
