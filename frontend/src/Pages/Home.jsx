import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../toastMessage';
import { toast, ToastContainer } from 'react-toastify';

const Home = () => {

  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"))
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/login")
    }, 1000);
    handleSuccess("User Logged out")
  }

  const fetchProducts = async () => {
    const url = "http://localhost:5001/products"
    const response = await fetch(url, {
      headers: {
        "Authorization": localStorage.getItem("token"),
      }
    });

    const result = await response.json();
    setProducts(result);
  }
  console.log("Products:" , products)


  useEffect(() => {
    fetchProducts();
  }, [])


  return (
    <>
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <div>
        {products && products.map((product, index) => (
          <div key={index}>
            <p>{product.name} : {product.price}</p>
          </div>
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
    <ToastContainer />
    </>
  )
}

export default Home