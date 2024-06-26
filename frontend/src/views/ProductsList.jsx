import axiosClient from "../axios/axios-client.js";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
function ProductsList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        getAllProducts()
    }, []);

    const getAllProducts = () => {
        axiosClient.get('/products')
            .then(({data}) => {
                setProducts(data.products)
                setLoading(false)
            })
            .catch(({data}) => {
                console.log(data)
            })
    }

    const deleteProduct = (ev, id) => {
        ev.preventDefault();

        if (!window.confirm('Are you sure to delete this record?')) {
            return
        }

        axiosClient.delete(`/products/${id}`)
            .then(({data}) => {
                setMessage(data.message);
                getAllProducts();
            })
            .catch(({data}) => {
                console.log(data)
            })
    }

    return (
        <>
            <h1 className='mb-3'>Products</h1>

            {message && (
                <div className='alert alert-success'>
                    <p>{message}</p>
                </div>
            )}

            <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan={4} align={'center'}>Loading...</td>
                        </tr>
                    )}

                    {!loading && !products.length && (
                        <tr>
                            <td colSpan={4} align={'center'}>Empty</td>
                        </tr>
                    )}

                    {products.map((product) => (
                        <tr key={product['id']}>
                            <td>{product['id']}</td>
                            <td>{product['name']}</td>
                            <td>{product['description']}</td>
                            <td>
                                <Link to={`/product/${product['id']}`} className='btn btn-info'>Edit</Link>
                                &nbsp;&nbsp;
                                <a href="#" className='btn btn-danger' onClick={(ev) => deleteProduct(ev, product['id'])}>Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ProductsList
