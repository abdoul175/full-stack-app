import axiosClient from "../axios/axios-client.js";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
function ProductUpdateForm() {
    const {id} = useParams();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [product, setProduct] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        getProduct(id)
    }, []);

    const getProduct = (id) => {
        axiosClient.get(`/products/${id}`)
            .then(({data}) => {
                setProduct(data.product)
            })
            .catch(({data}) => {
                console.log(data)
            })
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        axiosClient.put(`/products/${id}`, product)
            .then(({data}) => {
                const message = data.message;
                setMessage(message);
            })
            .catch(({response}) => {
                setError(response.data.errors.name);
            })
    }

    return (
        <>
            <div className="card">
                <div className="card-title">
                    <h1 className="text-center">Update Product #{id}</h1>
                    {error && (
                        <div className='alert alert-danger p-3 m-3'>
                            <p className="text-center">{error}</p>
                        </div>
                    )}
                    {message && (
                        <div className='alert alert-success p-3 m-3'>
                            <p className="text-center">{message}</p>
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
                            <textarea name="description" value={product.description ? product.description : ''} className="form-control"
                                      onChange={(ev) => setProduct({...product, description: ev.target.value})}
                                      id="description" cols="30" rows="10">{product.description}</textarea>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Update Product"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProductUpdateForm
