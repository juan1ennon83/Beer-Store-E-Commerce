import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../tools/axiosInstance";


export const getBrands = createAsyncThunk(
  "brands/getBrands",
  async (brand) => {
    try {
      const resp = await axios.get(`/api/brands?filters[name][$containsi]=${brand}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      //console.log(resp.data);
      return resp.data;      
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
/////////////////////////////////////////////////////////////////////////////////////////////////////

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  brands: [],      // Almacena los datos de las marcas
  loading: false,  // Indica si se está cargando la información
  error: null,     // Almacena cualquier error que ocurra
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      })
  },
});
export default brandsSlice.reducer;