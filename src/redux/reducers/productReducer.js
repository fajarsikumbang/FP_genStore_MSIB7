import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL);
    return response.data.map(product => ({ ...product, stock: 20 })); // Tambahkan stok default 20
});

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        reduceStock(state, action) {
            action.payload.forEach(cartItem => {
                const product = state.items.find(item => item.id === cartItem.id);
                if (product) {
                    product.stock -= cartItem.quantity; // Kurangi stok sesuai jumlah di keranjang
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { reduceStock } = productSlice.actions;
export default productSlice.reducer;
