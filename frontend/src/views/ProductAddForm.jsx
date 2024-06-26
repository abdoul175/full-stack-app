import axiosClient from "../axios/axios-client.js";
import {useState, useEffect} from "react";
function ProductAddForm() {
    const [product, setProduct] = useState({
        name: '',
        description: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();
        axiosClient.post('/products', product)
            .then(({data}) => {
                setMessage(data.message)
                setProduct({
                    name: '',
                    description: ''
                })
            })
            .catch(({response}) => {
                setError(response.data.errors.name);
            })
    }

    return (
        <>
            <div className="card">
                <div className="card-title">
                    <h1 className="text-center">Add New Product</h1>
                    {message && (
                        <div className='alert alert-success p-3 m-3'>
                            <p className="text-center">{message}</p>
                        </div>
                    )}
                    {error && (
                        <div className='alert alert-danger p-3 m-3'>
                            <p className="text-center">{error}</p>
                        </div>
                    )}
                </div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" className="form-control" value={product.name}
                                   onChange={(ev) => setProduct({...product, name: ev.target.value})}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" value={product.description} className="form-control"
                                      onChange={(ev) => setProduct({...product, description: ev.target.value})}
                                      id="description" cols="30" rows="10"></textarea>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Add Product"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProductAddForm
