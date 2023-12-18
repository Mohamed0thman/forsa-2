import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../agent/api";

interface InitialState {
  brands: any[];
  next: boolean;
  page: number;
  error: SerializedError | undefined;
  isLoading: boolean;
  moreLoading: boolean;
}

const initialState: InitialState = {
  brands: [],
  page: 1,
  next: false,
  error: undefined,
  isLoading: false,
  moreLoading: false,
};

export const getBrands = createAsyncThunk<
  any,
  { categoryId: string; page: number }
>("brand/getBrands", async (data, thunkAPI) => {
  try {
    const brand = await agent.main.getBrandsBySelector({
      categoryId: data.categoryId,
      page: data.page,
    });
    return {
      next: brand.next ? true : false,
      data: brand.results,
      page: brand.next ? data.page + 1 : data.page,
    };
  } catch (error) {}
});

export const getMoreBrands = createAsyncThunk<
  any,
  { categoryId: string; page: number }
>("brand/getMoreBrands", async (data, thunkAPI) => {
  try {
    const brand = await agent.main.getBrandsBySelector({
      categoryId: data.categoryId,
      page: data.page,
    });
    return {
      next: brand.next ? true : false,
      data: brand.results,
      page: brand.next ? data.page + 1 : data.page,
    };
  } catch (error) {}
});

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBrands.fulfilled, (state, action: any) => {
      state.brands = action.payload.data;
      state.next = action.payload.next;
      state.page = action.payload.page;
      state.isLoading = false;
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    builder.addCase(getMoreBrands.pending, (state) => {
      state.moreLoading = true;
    });
    builder.addCase(getMoreBrands.fulfilled, (state, action: any) => {
      state.brands = state.brands.concat(action.payload.data);
      state.next = action.payload.next;
      state.page = action.payload.page;
      state.moreLoading = false;
    });
    builder.addCase(getMoreBrands.rejected, (state, action) => {
      state.error = action.error;
      state.moreLoading = false;
    });
  },
});
export default brandSlice;
