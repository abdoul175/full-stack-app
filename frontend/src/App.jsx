import {Routes, Route} from "react-router-dom";
import ProductsList from "./views/ProductsList.jsx";
import ProductAddForm from "./views/ProductAddForm.jsx";
import ProductUpdateForm from "./views/ProductUpdateForm.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {

  return (
    <>
      <Navbar/>
      <div className="container mt-3">
        <Routes>
          <Route path={'/'} element={<ProductsList/>} />
          <Route path={'/product/create'} element={<ProductAddForm/>} />
          <Route path={'/product/:id'} element={<ProductUpdateForm/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
