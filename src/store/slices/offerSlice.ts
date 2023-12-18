import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../agent/api";

interface InitialState {
  offers: any[];
  error: SerializedError | undefined;
  isLoading: boolean;
}

const initialState: InitialState = {
  offers: [],
  error: undefined,
  isLoading: false,
};

export const getOffers = createAsyncThunk(
  "offer/getOffers",
  async (data, thunkAPI) => {
    try {
      const offers = await agent.main.getOffers();
      return offers.results;
    } catch (error) {}
  }
);

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOffers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOffers.fulfilled, (state, action: any) => {
      state.offers = action.payload;
    });
    builder.addCase(getOffers.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});
export default offerSlice;
