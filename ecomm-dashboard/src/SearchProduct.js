import Header from './Header';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaUser } from "react-icons/fa";
import { LuUserRoundSearch } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import Image from 'react-bootstrap/Image';
import styles from './home.module.css';
import { IoIosAddCircle } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";


function SearchProduct() {
    const [data, setData] = useState([]);

    async function search(key) {
        console.warn(key);

        if (!key.trim()) { 
            setData([]); // Vacía la lista si el input está vacío
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
            console.error("Error al buscar producto:", error);
            setData([]); // Vaciar la lista en caso de error
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
                              <li className="nav-item">
                                                    <a href="/searchuser" className="nav-link text-white"> <LuUserRoundSearch className={styles.iconSpacing}/> Buscador de Usuarios</a>
                                                </li>
                             <li className="nav-item">
                                 <a href="/search" className="nav-link text-white"> <FaSearch className={styles.iconSpacing}/> Buscador de Productos
                                 </a>
                             </li>
                         </ul>
                     </div>

            {/* Content */}
            <div className={styles.Content}>
               

                <div className="d-flex justify-content-between mt-3">
                    <h2>Buscador de Productos</h2>
                    
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

export default SearchProduct;
