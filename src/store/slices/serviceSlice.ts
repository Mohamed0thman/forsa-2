import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../agent/api";

interface InitialState {
  services: any[];
  error: SerializedError | undefined;
  isLoading: boolean;
}

const initialState: InitialState = {
  services: [],
  error: undefined,
  isLoading: false,
};

export const getServices = createAsyncThunk(
  "service/getServices",
  async (data, thunkAPI) => {
    try {
      const serviceds = await agent.main.getMyService();
      return serviceds.results;
    } catch (error) {}
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServices.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getServices.fulfilled, (state, action: any) => {
      state.services = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getServices.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});
export default serviceSlice;
