import { useNavigate, useParams } from "react-router-dom";
import axiosURL from "../../tools/axiosInstance";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import UploadWidget from "../pages/UploadWidget";

export default function BeersEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  //const params = useParams();
  //console.log(params);
  const [beers, setBeers] = useState({
    name: "",
    description: "",
    price: "",
    img: "",
    type: ""
  });

  const [newBeers, setNewBeers] = useState({
    name: "",
    description: "",
    price: "",
    img: "",
    type: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axiosURL.get(`/api/beers/${id}`);
        const responseData = resp.data.data || {};
        setBeers(responseData);
        setNewBeers(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBeers((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSetImageUrl = (url) => {
    setNewBeers((prevState) => ({
      ...prevState,
      img: url,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const obj = {
      data: {
        name: newBeers.name,
        description: newBeers.description,
        price: newBeers.price,
        img: newBeers.img,
        type: newBeers.type
      },
    };

    try {
      const response = await axiosURL.put(`/api/beers/${id}`, obj);

      setNewBeers({
        name: "",
        description: "",
        price: "",
        img: "",
        type: ""
      });

      navigate("/admin/beers");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      console.log("Detalles del error:", error.response);
    }
  };

    return (
        <div>
            <Sidebar />
            <div className='flex justify-center'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <label htmlFor="img" className='mb-5'>
                        <span>Imagen:</span>
                        <input type="text" name="img" id="img" key="img" value={newBeers.img} onChange={handleChange} />
                        <UploadWidget setImageUrlCallback={handleSetImageUrl} />
                        {newBeers.img && <img src={newBeers.img} className="w-14 h-14" alt="Beer" />}
                    </label>
                    <label htmlFor="name" className='mb-5'>
                        <span>Nombre:</span>
                        <input type="text" placeholder="Ingresa el nombre del producto" name="name" id="name" value={newBeers.name} onChange={handleChange} required />
                    </label>
                    <label htmlFor="description" className='mb-5'>
                        <span>Descripción:</span>
                        <input type="text" placeholder='Ingresa la descripcion del producto' name="description" id="description" key="description" value={newBeers.description} onChange={handleChange} required />
                    </label>
                    <label htmlFor="price" className='mb-5'>
                        <span>Precio:</span>
                        <input type="text" placeholder='Ingresa el precio del producto' name="price" id="price" key="price" value={newBeers.price} onChange={handleChange} required />
                    </label>
                    <label htmlFor="type" className='mb-5'>
                        <span>Tipo:</span>
                        <select name="type" id="type" value={newBeers.type} onChange={handleChange}>
                            <option value="" disabled>Selecciona una opción</option>
                            <option value="Pilsen">Pilsen</option>
                            <option value="Lager">Lager</option>
                            <option value="Stout">Stout</option>
                        </select>
                    </label>
                    <button type='submit' className="px-1 py-1 mr-2 text-gray-100 bg-primary hover:bg-secondary">Actualizar</button>
                </form>
            </div>
        </div>
    )
}
