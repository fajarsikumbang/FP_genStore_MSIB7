import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/reducers/productReducer";
import ProductList from "../components/ProductList";

function Home() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return <h2 className="text-center">Loading...</h2>;
    }

    if (error) {
        return <h2 className="text-center text-danger">Error: {error}</h2>;
    }

    return (
        <div>
            <h2 className="text-center">Product List</h2>
            <ProductList products={items} />
        </div>
    );
}

export default Home;